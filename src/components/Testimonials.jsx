// src/components/Testimonials.jsx
import React from 'react'
import { Star, Quote } from 'lucide-react'
import PolaroidCard from './common/PolaroidCard'
import { testimonials } from '../utils/constants'
import { useTiltAngles } from '../hooks/useTiltAngles'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const Testimonials = () => {
  const tiltAngles = useTiltAngles(testimonials.length)
  
  // Scroll animations
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation()
  const { ref: cardsRef, childrenInView } = useStaggerAnimation({ 
    staggerDelay: 150,
    initialDelay: 300,
    threshold: 0.1
  })

  return (
    <section id="testimonials" className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Decorative quote marks */}
      <div 
        className={`absolute top-10 right-10 opacity-10 transition-all duration-1000 ${
          titleInView ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
        }`}
      >
        <Quote size={120} className="text-gold" />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className={`section-title animate-fade-up ${titleInView ? 'in-view' : ''}`}
        >
          מה הלקוחות אומרים
        </h2>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => {
            const isCardInView = childrenInView.includes(index)
            
            // Different animation styles for variety
            const animationStyles = [
              'animate-fade-up',
              'animate-scale-in',
              'animate-fade-right',
              'animate-fade-left',
              'animate-flip-in',
              'animate-zoom-in'
            ]
            const animationClass = animationStyles[index % animationStyles.length]
            
            return (
              <div
                key={testimonial.id}
                className={`${animationClass} ${isCardInView ? 'in-view' : ''}`}
              >
                <PolaroidCard
                  tilt={tiltAngles[index] || 0}
                  note={testimonial.note}
                  className={`bg-light-cream transition-all duration-500 ${
                    isCardInView 
                      ? 'hover:scale-105 hover:rotate-0 hover:shadow-2xl' 
                      : ''
                  }`}
                >
                  <div className="p-6 relative">
                    {/* Decorative quote mark */}
                    <Quote 
                      size={24} 
                      className={`text-gold/20 absolute top-2 right-2 transition-all duration-500 ${
                        isCardInView ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'
                      }`}
                    />
                    
                    <p className={`text-brown/80 italic mb-4 leading-relaxed transition-all duration-700 ${
                      isCardInView ? 'opacity-100' : 'opacity-0'
                    }`}>
                      "{testimonial.text}"
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className={`font-bold text-gold transition-all duration-500 ${
                        isCardInView 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 -translate-x-4'
                      }`}>
                        {testimonial.name}
                      </span>
                      
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={`fill-gold text-gold transition-all duration-300 ${
                              isCardInView 
                                ? 'scale-100 opacity-100' 
                                : 'scale-0 opacity-0'
                            }`}
                            style={{
                              transitionDelay: isCardInView ? `${i * 100}ms` : '0ms'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </PolaroidCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Testimonials