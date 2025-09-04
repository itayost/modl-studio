// src/components/Services.jsx
import React, { useState } from 'react'
import { Sofa, Home, CheckCircle, Pin, ChevronDown, ChevronUp } from 'lucide-react'
import PolaroidCard from './common/PolaroidCard'
import { services } from '../utils/constants'
import { useTiltAngles } from '../hooks/useTiltAngles'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const iconComponents = {
  Sofa: Sofa,
  Home: Home,
  CheckCircle: CheckCircle
}

const Services = () => {
  const tiltAngles = useTiltAngles(services.length)
  const [expandedCard, setExpandedCard] = useState(null)
  
  // Scroll animations
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation()
  const { ref: cardsRef, childrenInView } = useStaggerAnimation({ 
    staggerDelay: 120,
    initialDelay: 200,
    threshold: 0.05
  })

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <section id="services" className="py-16 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          className={`section-title animate-fade-up ${titleInView ? 'in-view' : ''}`}
        >
          השירותים שלנו
        </h2>
        
        {/* Mobile-first responsive grid with stagger animations */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = iconComponents[service.icon]
            const isExpanded = expandedCard === service.id
            const isCardInView = childrenInView.includes(index)
            
            // Different animation patterns based on position
            const animationClass = index % 3 === 0 
              ? 'animate-fade-right' 
              : index % 3 === 1 
              ? 'animate-zoom-in'
              : 'animate-fade-left'
            
            return (
              <div
                key={service.id}
                className={`${animationClass} ${isCardInView ? 'in-view' : ''}`}
              >
                <PolaroidCard
                  tilt={tiltAngles[index] || 0}
                  hasClip={service.hasClip}
                  hasStamp={service.hasStamp}
                  stampType={service.stampType}
                  hasTape={service.hasTape}
                  note={service.note}
                  className={`mx-auto w-full max-w-sm md:max-w-none transition-all duration-500 ${
                    isCardInView ? 'hover:scale-105 hover:rotate-0' : ''
                  }`}
                >
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className={`w-full aspect-square object-cover transition-transform duration-700 ${
                      isCardInView ? 'scale-100' : 'scale-95'
                    }`}
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {IconComponent && (
                          <IconComponent 
                            className={`w-5 h-5 md:w-6 md:h-6 text-gold transition-all duration-500 ${
                              isCardInView ? 'animate-bounce-in' : ''
                            }`}
                          />
                        )}
                        <h3 className="text-lg md:text-xl font-bold text-brown font-typewriter">
                          {service.title}
                        </h3>
                      </div>
                      {/* Mobile expand button with rotation animation */}
                      <button 
                        onClick={() => toggleExpand(service.id)}
                        className={`md:hidden text-gold p-1 transition-all duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                    
                    {/* Service items - collapsible on mobile with animation */}
                    <ul 
                      className={`space-y-2 transition-all duration-500 ${
                        !isExpanded ? 'hidden md:block' : ''
                      } ${isExpanded ? 'animate-fade-down in-view' : ''}`}
                    >
                      {service.items.map((item, i) => (
                        <li 
                          key={i} 
                          className={`text-xs md:text-sm text-brown/80 flex items-start gap-2 transition-all duration-300 ${
                            isCardInView || isExpanded 
                              ? `opacity-100 translate-x-0 animation-delay-${(i + 1) * 100}` 
                              : 'opacity-0 -translate-x-4'
                          }`}
                        >
                          <Pin 
                            size={12} 
                            className={`text-gold mt-1 flex-shrink-0 ${
                              isCardInView ? 'animate-wiggle' : ''
                            }`}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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

export default Services