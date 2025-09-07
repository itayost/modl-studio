// src/components/Testimonials.jsx
import React, { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import PolaroidCard from './common/PolaroidCard'
import { testimonials } from '../utils/constants'
import { useTiltAngles } from '../hooks/useTiltAngles'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Testimonials = () => {
  const tiltAngles = useTiltAngles(3) // For 3 visible cards at a time
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Scroll animation
  const { ref: sectionRef, isInView: sectionVisible } = useScrollAnimation({ threshold: 0.2 })

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      setIsAnimating(false)
    }, 300)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 300)
  }

  const goToTestimonial = (index) => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <section 
      id="testimonials" 
      className="py-16 md:py-20 px-4 bg-white relative overflow-hidden" 
      ref={sectionRef}
    >
      {/* Decorative quote marks */}
      <div 
        className={`absolute top-10 right-10 opacity-10 transition-all duration-1000 ${
          sectionVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
        }`}
      >
        <Quote size={120} className="text-gold" />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className={`section-title animate-fade-up ${sectionVisible ? 'in-view' : ''}`}>
          מה הלקוחות אומרים
        </h2>
        
        {/* Mobile View - Single Polaroid */}
        {isMobile ? (
          <div className="max-w-sm mx-auto">
            {/* Single Polaroid Card */}
            <div className={`transition-all duration-700 delay-200 ${
              sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <PolaroidCard
                tilt={isAnimating ? 0 : tiltAngles[0] || -2}
                hasPin={true}
                className={`mx-auto transition-all duration-300 ${
                  isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
                }`}
              >
                <div className={`transition-all duration-300 ${
                  isAnimating ? 'opacity-0' : 'opacity-100'
                }`}>
                  {/* Quote Icon */}
                  <Quote className="absolute top-4 right-4 w-6 h-6 text-gold/30" />
                  
                  {/* Content */}
                  <div className="p-6 bg-light-cream">
                    {/* Stars */}
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className="fill-gold text-gold"
                          style={{ 
                            animation: !isAnimating && sectionVisible ? `star-pop 0.5s ease-out ${i * 100}ms` : 'none'
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Text */}
                    <p className="text-brown/80 italic text-center mb-4 leading-relaxed text-sm">
                      "{testimonials[currentIndex].text}"
                    </p>
                    
                    {/* Name */}
                    <div className="text-center border-t border-brown/10 pt-3">
                      <p className="font-bold text-gold">
                        {testimonials[currentIndex].name}
                      </p>
                      {testimonials[currentIndex].note && (
                        <p className="text-xs text-brown/60 mt-1 font-handwritten">
                          {testimonials[currentIndex].note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </PolaroidCard>
            </div>
            
            {/* Navigation */}
            <div className={`flex justify-center items-center gap-4 mt-8 transition-all duration-700 delay-400 ${
              sectionVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-light-cream hover:bg-light-gold hover:scale-110 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronRight size={20} className="text-brown" />
              </button>
              
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-gold w-6 h-2' 
                        : 'bg-brown/20 w-2 h-2 hover:bg-brown/40'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-light-cream hover:bg-light-gold hover:scale-110 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronLeft size={20} className="text-brown" />
              </button>
            </div>
          </div>
        ) : (
          /* Desktop View - Three Polaroids */
          <div className="relative">
            {/* Three Polaroid Cards Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[0, 1, 2].map((offset) => {
                const index = (currentIndex + offset) % testimonials.length
                const testimonial = testimonials[index]
                const isCenter = offset === 1
                
                return (
                  <div
                    key={offset}
                    className={`transition-all duration-700 ${
                      sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${200 + offset * 100}ms` }}
                  >
                    <PolaroidCard
                      tilt={isAnimating ? 0 : tiltAngles[offset] || (offset - 1) * 3}
                      hasPin={isCenter}
                      hasTape={!isCenter}
                      className={`transition-all duration-500 ${
                        isAnimating 
                          ? 'scale-95 opacity-60' 
                          : isCenter 
                            ? 'scale-105 shadow-2xl opacity-100' 
                            : 'scale-100 opacity-90 hover:scale-105'
                      }`}
                    >
                      <div className={`transition-all duration-300 ${
                        isAnimating ? 'opacity-0' : 'opacity-100'
                      }`}>
                        {/* Quote Icon */}
                        <Quote className="absolute top-4 right-4 w-6 h-6 text-gold/30" />
                        
                        {/* Content */}
                        <div className="p-6 bg-light-cream">
                          {/* Stars */}
                          <div className="flex justify-center mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className="fill-gold text-gold"
                              />
                            ))}
                          </div>
                          
                          {/* Text */}
                          <p className="text-brown/80 italic text-center mb-4 leading-relaxed text-sm min-h-[100px]">
                            "{testimonial.text}"
                          </p>
                          
                          {/* Name */}
                          <div className="text-center border-t border-brown/10 pt-3">
                            <p className="font-bold text-gold">
                              {testimonial.name}
                            </p>
                            {testimonial.note && (
                              <p className="text-xs text-brown/60 mt-1 font-handwritten">
                                {testimonial.note}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </PolaroidCard>
                  </div>
                )
              })}
            </div>
            
            {/* Navigation */}
            <div className={`flex justify-center items-center gap-4 mt-8 transition-all duration-700 delay-600 ${
              sectionVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <button 
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-light-cream hover:bg-light-gold hover:scale-110 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronRight size={24} className="text-brown" />
              </button>
              
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-gold w-8 h-2' 
                        : 'bg-brown/20 w-2 h-2 hover:bg-brown/40'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-light-cream hover:bg-light-gold hover:scale-110 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronLeft size={24} className="text-brown" />
              </button>
            </div>
          </div>
        )}
        
        {/* Trust Indicators */}
        <div className={`flex flex-wrap justify-center gap-8 mt-12 transition-all duration-700 delay-800 ${
          sectionVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {[
            { value: testimonials.length + "+", label: "לקוחות מרוצים" },
            { value: "5.0", label: "דירוג ממוצע" },
            { value: "100%", label: "ממליצים" }
          ].map((stat, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-500 hover:scale-110 ${
                sectionVisible ? 'translate-y-0' : 'translate-y-10'
              }`}
              style={{ transitionDelay: `${900 + index * 100}ms` }}
            >
              <div className="text-3xl font-bold text-gold">{stat.value}</div>
              <div className="text-sm text-brown">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials