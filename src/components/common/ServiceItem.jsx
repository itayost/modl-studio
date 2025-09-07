// components/common/ServiceItem.jsx
import React, { useState } from 'react'
import { Info, Clock, Coins, Pin, ArrowLeft } from 'lucide-react'
import PolaroidCard from './PolaroidCard'

export default function ServiceItem({ 
  service, 
  tilt = -2,
  pricing = null,
  testimonial = null,
  isActive = false,
  onClick = () => {},
  className = '',
  showFlipButton = true,
  IconComponent = null
}) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = (e) => {
    if (e) e.stopPropagation()
    setIsFlipped(!isFlipped)
  }

  const handleCardClick = () => {
    onClick()
  }

  return (
    <div 
      className={`service-item ${className}`}
      style={{
        perspective: '1000px'
      }}
    >
      <div 
        className="flip-card-wrapper"
        style={{
          position: 'relative',
          width: '100%',
          height: '450px',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s',
          transform: isFlipped ? 'rotateY(180deg)' : `rotateY(0deg) rotate(${isActive ? 0 : tilt}deg)`
        }}
      >
        {/* Front Side */}
        <div 
          className="flip-face flip-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <PolaroidCard
            hasPin={service.hasPin}
            hasClip={service.hasClip}
            hasTape={service.hasTape}
            hasStamp={service.hasStamp}
            stampType={service.stampType}
            note={service.note}
            date={service.date}
            noTransform={true} // Don't apply rotation here, we handle it in the wrapper
            className={`h-full cursor-pointer transition-shadow duration-500 ${
              isActive ? 'shadow-2xl' : 'hover:shadow-xl'
            }`}
            onClick={handleCardClick}
          >
            <div className="flex flex-col h-full">
              <div className="relative overflow-hidden group flex-shrink-0">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Hover Overlay for Desktop */}
                {pricing && (
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <p className="text-sm font-medium mb-1">{pricing.duration}</p>
                      <p className="text-lg font-bold">{pricing.price}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 space-y-3 flex-grow flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-bold text-brown">{service.title}</h3>
                  {IconComponent && <IconComponent className="text-gold" size={24} />}
                </div>
                
                {pricing && (
                  <div className="flex items-center gap-4 text-sm text-brown/70">
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-gold" />
                      <span>{pricing.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins size={14} className="text-gold" />
                      <span>{pricing.price}</span>
                    </div>
                  </div>
                )}

                {/* Quick items preview for desktop */}
                <div className="hidden md:block text-xs text-brown/60 space-y-1 flex-grow">
                  {service.items.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-gold rounded-full"></div>
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                  {service.items.length > 2 && (
                    <div className="text-gold font-medium">
                      +{service.items.length - 2} נוספים...
                    </div>
                  )}
                </div>

                {showFlipButton && (
                  <button
                    onClick={handleFlip}
                    className="w-full py-2 bg-gold text-white rounded-full font-medium hover:bg-brown transition-colors flex items-center justify-center gap-2 mt-auto"
                  >
                    <Info size={16} />
                    <span>ראה פרטים</span>
                  </button>
                )}
              </div>
            </div>
          </PolaroidCard>
        </div>

        {/* Back Side */}
        <div 
          className="flip-face flip-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <PolaroidCard
            noTransform={true} // Don't apply rotation here
            className="h-full cursor-pointer"
            onClick={handleCardClick}
          >
            <div className="p-4 h-full flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-brown mb-3">{service.title}</h3>
              
              <div className="space-y-2 mb-4 flex-grow overflow-y-auto">
                {service.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <Pin size={12} className="text-gold mt-1 flex-shrink-0" />
                    <span className="text-brown/80">{item}</span>
                  </div>
                ))}
              </div>

              {testimonial && (
                <div className="p-3 bg-light-cream rounded-lg mb-4">
                  <p className="text-sm italic text-brown/70">"{testimonial}"</p>
                </div>
              )}

              <button
                onClick={handleFlip}
                className="w-full py-2 bg-brown/70 text-white rounded-full font-medium hover:bg-brown transition-colors flex items-center justify-center gap-2 mt-auto"
              >
                <ArrowLeft size={16} />
                <span>חזור</span>
              </button>
            </div>
          </PolaroidCard>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (min-width: 768px) {
          .flip-card-wrapper {
            height: 500px !important;
          }
        }
        
        .service-item:hover .flip-card-wrapper {
          transform: ${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg) rotate(0deg) scale(1.05)'};
        }
      `}</style>
    </div>
  )
}