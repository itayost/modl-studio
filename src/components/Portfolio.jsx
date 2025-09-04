// src/components/Portfolio.jsx
import React, { useState } from 'react'
import { MapPin, Square, X, Sparkles } from 'lucide-react'
import PolaroidCard from './common/PolaroidCard'
import { portfolio } from '../utils/constants'
import { useTiltAngles } from '../hooks/useTiltAngles'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const Portfolio = () => {
  const tiltAngles = useTiltAngles(portfolio.length)
  const [selectedImage, setSelectedImage] = useState(null)

  // Scroll animations
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation()
  const { ref: gridRef, childrenInView } = useStaggerAnimation({ 
    staggerDelay: 100,
    initialDelay: 400,
    threshold: 0.05
  })

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
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className={`section-title animate-fade-up ${titleInView ? 'in-view' : ''}`}
        >
          הפרויקטים שלנו
        </h2>
        
        {/* Portfolio grid with stagger animations */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {portfolio.map((item, index) => {
            const isCardInView = childrenInView.includes(index)
            
            // Varied animation patterns
            const animationPatterns = ['animate-fade-up', 'animate-scale-in', 'animate-flip-in']
            const animationClass = animationPatterns[index % animationPatterns.length]
            
            return (
              <div
                key={item.id}
                className={`${animationClass} ${isCardInView ? 'in-view' : ''}`}
              >
                <PolaroidCard
                  tilt={tiltAngles[index] || 0}
                  hasPin={item.hasPin}
                  hasClip={item.hasClip}
                  hasStamp={item.hasStamp}
                  hasTape={item.hasTape}
                  note={item.note}
                  date={item.date}
                  className={`mx-auto w-full max-w-sm sm:max-w-none cursor-pointer transition-all duration-500 ${
                    isCardInView 
                      ? 'hover:scale-110 hover:rotate-0 hover:z-20 hover:shadow-2xl' 
                      : ''
                  }`}
                >
                  <div 
                    onClick={() => setSelectedImage(item)}
                    className="group"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className={`w-full aspect-square object-cover transition-all duration-700 ${
                          isCardInView 
                            ? 'scale-100 group-hover:scale-110' 
                            : 'scale-95'
                        }`}
                      />
                      {/* Hover overlay with icon */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-brown/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
                        <div className="bg-white/90 p-3 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <Square size={24} className="text-brown" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className={`text-lg md:text-xl font-bold text-brown mb-2 font-typewriter transition-colors duration-300 group-hover:text-gold`}>
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs md:text-sm text-gold mb-2">
                        <MapPin 
                          size={14} 
                          className={`${isCardInView ? 'animate-bounce-in' : ''}`}
                        />
                        <span>{item.location}</span>
                      </div>
                      <span className={`inline-block px-3 py-1 bg-light-cream rounded-full text-xs text-brown transition-all duration-300 ${
                        isCardInView ? 'animate-scale-in in-view' : ''
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                </PolaroidCard>
              </div>
            )
          })}
        </div>

        {/* Lightbox with fade animation */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-3xl w-full animate-zoom-in in-view">
              <button 
                className="absolute -top-10 right-0 text-white hover:scale-110 transition-transform"
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} />
              </button>
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="bg-white p-4 text-center rounded-b-lg">
                <h3 className="font-bold text-brown">{selectedImage.title}</h3>
                <p className="text-brown/60">{selectedImage.location}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Portfolio