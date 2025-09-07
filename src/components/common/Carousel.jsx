// components/common/Carousel.jsx
import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function Carousel({
  items = [],
  renderItem = () => null,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  className = '',
  onItemChange = () => {},
  initialIndex = 0,
  loop = true,
  transitionDuration = 500
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const intervalRef = useRef(null)

  // Auto play functionality
  useEffect(() => {
    if (autoPlay && items.length > 1 && !isTransitioning) {
      intervalRef.current = setInterval(() => {
        handleNext()
      }, autoPlayInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [activeIndex, autoPlay, autoPlayInterval, items.length, isTransitioning])

  // Handle navigation with animation lock
  const navigate = (newIndex) => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setActiveIndex(newIndex)
    onItemChange(newIndex)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, transitionDuration)
  }

  const handlePrevious = () => {
    const newIndex = loop 
      ? (activeIndex - 1 + items.length) % items.length
      : Math.max(0, activeIndex - 1)
    navigate(newIndex)
  }

  const handleNext = () => {
    const newIndex = loop
      ? (activeIndex + 1) % items.length
      : Math.min(items.length - 1, activeIndex + 1)
    navigate(newIndex)
  }

  const handleDotClick = (index) => {
    if (index !== activeIndex) {
      navigate(index)
    }
  }

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    // RTL support for Hebrew
    if (isRightSwipe) handlePrevious()
    if (isLeftSwipe) handleNext()
  }

  if (items.length === 0) return null

  return (
    <div 
      className={`carousel-container ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main carousel content */}
      <div className="relative">
        {/* Items container with slide animation */}
        <div className="relative overflow-visible">
          <div 
            className="flex transition-transform ease-in-out"
            style={{
              transform: `translateX(${activeIndex * 100}%)`,
              transitionDuration: `${transitionDuration}ms`
            }}
          >
            {items.map((item, index) => (
              <div 
                key={index} 
                className="w-full flex-shrink-0"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                <div className="flex justify-center items-center">
                  <div className="w-full max-w-sm mx-auto">
                    {renderItem(item, index, index === activeIndex)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side arrows for larger screens */}
        {showArrows && items.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              disabled={isTransitioning}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <ArrowRight size={20} className="text-brown" />
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <ArrowLeft size={20} className="text-brown" />
            </button>
          </>
        )}
      </div>

      {/* Bottom controls */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Mobile arrows */}
          {showArrows && (
            <button
              onClick={handlePrevious}
              disabled={isTransitioning}
              className="md:hidden p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <ArrowRight size={20} className="text-brown" />
            </button>
          )}
          
          {/* Dots indicator with animation */}
          {showDots && (
            <div className="flex gap-2">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  disabled={isTransitioning}
                  className={`transition-all duration-300 ${
                    idx === activeIndex 
                      ? 'w-8 h-2 bg-gold rounded-full scale-110' 
                      : 'w-2 h-2 bg-brown/30 rounded-full hover:bg-brown/50 hover:scale-110'
                  } disabled:cursor-not-allowed`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Mobile arrows */}
          {showArrows && (
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="md:hidden p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <ArrowLeft size={20} className="text-brown" />
            </button>
          )}
        </div>
      )}

      {/* Progress bar for autoplay with animation */}
      {autoPlay && items.length > 1 && (
        <div className="mt-4 h-1 bg-brown/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gold transition-all ease-linear"
            style={{ 
              width: `${((activeIndex + 1) / items.length) * 100}%`,
              transitionDuration: isTransitioning ? `${transitionDuration}ms` : '0ms'
            }}
          />
        </div>
      )}
    </div>
  )
}