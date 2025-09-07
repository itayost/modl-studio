// src/components/Portfolio.jsx
import React, { useState, useEffect } from 'react'
import { MapPin, Square, X, Sparkles, Camera } from 'lucide-react'
import PolaroidCard from './common/PolaroidCard'
import { portfolio } from '../utils/constants'
import { useTiltAngles } from '../hooks/useTiltAngles'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const Portfolio = () => {
  const tiltAngles = useTiltAngles(portfolio.length)
  const [selectedImage, setSelectedImage] = useState(null)
  const [visibleItems, setVisibleItems] = useState(new Set())

  // Scroll animations
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation()
  const { ref: gridRef, childrenInView } = useStaggerAnimation({ 
    staggerDelay: 80,
    initialDelay: 200,
    threshold: 0.1
  })

  // Track which items have been viewed for animation
  useEffect(() => {
    childrenInView.forEach(index => {
      setVisibleItems(prev => new Set([...prev, index]))
    })
  }, [childrenInView])

  return (
    <section id="portfolio" className="py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Animated background decorations */}
      <div 
        className={`absolute top-10 left-10 opacity-20 transition-all duration-1000 ${
          titleInView ? 'animate-float' : 'opacity-0'
        }`}
      >
        <Sparkles size={60} className="text-gold" />
      </div>
      
      <div 
        className={`absolute top-20 right-10 opacity-15 transition-all duration-1000 delay-300 ${
          titleInView ? 'animate-float' : 'opacity-0'
        }`}
        style={{ animationDelay: '1s' }}
      >
        <Camera size={50} className="text-brown" />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className={`section-title animate-fade-up ${titleInView ? 'in-view' : ''}`}
        >
          הפרויקטים שלנו
        </h2>

        {/* Project count indicator */}
        <div 
          className={`text-center mb-6 transition-all duration-700 delay-300 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-light-cream rounded-full text-sm text-brown/70">
            {portfolio.length} פרויקטים מובחרים
          </span>
        </div>
        
        {/* Mobile-First Grid: 2 columns on mobile, 3 on tablet, 3-4 on desktop */}
        <div 
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {portfolio.map((item, index) => {
            const isInView = visibleItems.has(index)
            
            // Different animation patterns for variety
            const animationPatterns = [
              { // Fade up
                initial: 'opacity-0 translate-y-8',
                animate: 'opacity-100 translate-y-0',
                delay: index * 50
              },
              { // Scale in
                initial: 'opacity-0 scale-75',
                animate: 'opacity-100 scale-100',
                delay: index * 50
              },
              { // Rotate in
                initial: 'opacity-0 rotate-12',
                animate: 'opacity-100 rotate-0',
                delay: index * 50
              },
              { // Slide from left
                initial: 'opacity-0 -translate-x-8',
                animate: 'opacity-100 translate-x-0',
                delay: index * 50
              },
              { // Slide from right
                initial: 'opacity-0 translate-x-8',
                animate: 'opacity-100 translate-x-0',
                delay: index * 50
              },
              { // Flip in
                initial: 'opacity-0 scale-y-0',
                animate: 'opacity-100 scale-y-100',
                delay: index * 50
              }
            ]
            
            const animation = animationPatterns[index % animationPatterns.length]
            
            return (
              <div
                key={item.id}
                className={`transition-all duration-700 ease-out ${
                  isInView ? animation.animate : animation.initial
                }`}
                style={{ 
                  transitionDelay: `${animation.delay}ms`,
                  transformOrigin: 'center center'
                }}
              >
                <PolaroidCard
                  tilt={isInView ? tiltAngles[index] || ((index % 3) - 1) * 3 : 0}
                  hasPin={item.hasPin && index < 2} // Only first few have pins on mobile
                  hasClip={item.hasClip && index === 3}
                  hasStamp={item.hasStamp && index === 5}
                  hasTape={item.hasTape && index % 4 === 0}
                  note={item.note && index < 3 ? item.note : null} // Limit notes on mobile
                  date={item.date && index === 0 ? item.date : null}
                  className={`cursor-pointer transition-all duration-500 h-full ${
                    isInView 
                      ? 'hover:scale-110 hover:rotate-0 hover:z-20 hover:shadow-2xl' 
                      : ''
                  }`}
                >
                  <div 
                    onClick={() => setSelectedImage(item)}
                    className="group h-full flex flex-col"
                  >
                    {/* Image with overlay */}
                    <div className="relative overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className={`w-full aspect-square object-cover transition-all duration-700 ${
                          isInView 
                            ? 'scale-100 group-hover:scale-110 group-hover:brightness-110' 
                            : 'scale-95'
                        }`}
                      />
                      
                      {/* Hover overlay with icon */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brown/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <div className={`bg-white/90 p-2 sm:p-3 rounded-full transform transition-all duration-300 ${
                          isInView ? 'scale-0 group-hover:scale-100' : ''
                        }`}>
                          <Square size={20} className="text-brown" />
                        </div>
                      </div>

                      {/* Corner accent for variety */}
                      {index % 3 === 0 && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full opacity-70"></div>
                      )}
                    </div>
                    
                    {/* Content - Responsive text sizes */}
                    <div className="p-2 sm:p-3 md:p-4 flex-grow flex flex-col">
                      <h3 className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold text-brown mb-1 font-typewriter line-clamp-2 transition-colors duration-300 group-hover:text-gold ${
                        isInView ? 'animate-fade-in' : ''
                      }`}>
                        {item.title}
                      </h3>
                      
                      <div className={`flex items-center gap-1 text-xs sm:text-sm text-gold mb-1 sm:mb-2 ${
                        isInView ? 'animate-slide-up' : 'opacity-0'
                      }`}
                        style={{ animationDelay: `${animation.delay + 200}ms` }}
                      >
                        <MapPin size={10} className="sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0" />
                        <span className="line-clamp-1">{item.location}</span>
                      </div>
                      
                      {/* Type badge - Hidden on very small screens if needed */}
                      <span className={`inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-light-cream rounded-full text-xs text-brown mt-auto self-start transition-all duration-500 ${
                        isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                        style={{ transitionDelay: `${animation.delay + 300}ms` }}
                      >
                        {item.type}
                      </span>
                    </div>
                  </div>
                </PolaroidCard>

                {/* Animated decoration dots */}
                {index % 5 === 2 && (
                  <div className={`flex justify-center gap-1 mt-2 transition-all duration-1000 ${
                    isInView ? 'opacity-100' : 'opacity-0'
                  }`}
                    style={{ transitionDelay: `${animation.delay + 400}ms` }}
                  >
                    <div className="w-1 h-1 bg-gold/50 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-gold/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 bg-gold/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Load more indicator (if you have more projects) */}
        <div className={`text-center mt-8 transition-all duration-700 ${
          childrenInView.length > 0 ? 'opacity-100' : 'opacity-0'
        }`}
          style={{ transitionDelay: '1s' }}
        >
          <div className="inline-flex items-center gap-2 text-sm text-brown/50">
            <div className="w-8 h-px bg-brown/20"></div>
            <span>כל הפרויקטים</span>
            <div className="w-8 h-px bg-brown/20"></div>
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-3xl w-full animate-zoom-in" style={{ animation: 'zoom-in 0.3s ease-out' }}>
              <button 
                className="absolute -top-10 right-0 text-white hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                }}
                aria-label="Close"
              >
                <X size={32} />
              </button>
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="bg-white p-4 text-center rounded-b-lg">
                <h3 className="font-bold text-brown text-lg">{selectedImage.title}</h3>
                <p className="text-brown/60">{selectedImage.location}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-light-cream rounded-full text-xs text-brown">
                  {selectedImage.type}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes zoom-in {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}

export default Portfolio