import React, { useState, useEffect, useRef } from 'react'
import { 
  Sofa, Home, CheckCircle, Camera, Pin, Heart, 
  Star, Sparkles, ArrowLeft, ArrowRight, Info,
  Clock, Coins, Users, Award, Palette, Eye
} from 'lucide-react'
import PolaroidCard from './common/PolaroidCard'
import { useTiltAngles } from '../hooks/useTiltAngles'
import { services } from '../utils/constants'
import { 
  PushPin, 
  PaperClip, 
  WashiTape, 
  HandwrittenNote, 
  Stamp, 
  DateStamp 
} from './decorations'

// Icon mapping for services
const iconComponents = {
  Sofa: Sofa,
  Home: Home,
  CheckCircle: CheckCircle
}

// Add testimonials for each service
const serviceTestimonials = {
  1: "השירות הזה שינה לנו את הבית! ממליצה בחום - רחל כהן",
  2: "לימור הפכה את החלום שלנו למציאות - משפחת לוי",
  3: "ליווי מקצועי שחסך לנו כסף וכאבי ראש - יוסי מזרחי"
}

// Add pricing info for each service
const servicePricing = {
  1: { price: "₪2,500+", duration: "3-6 שבועות" },
  2: { price: "₪150/מ״ר", duration: "2-6 חודשים" },
  3: { price: "לפי פרויקט", duration: "משתנה" }
}

export default function ScrapbookServices() {
  const [activeService, setActiveService] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSticker, setHoveredSticker] = useState(null)
  const sectionRef = useRef(null)
  
  // Use your existing hook for tilt angles
  const tiltAngles = useTiltAngles(services.length)

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Auto-rotate on desktop
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth >= 768 && !isFlipped) {
        setActiveService((prev) => (prev + 1) % services.length)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isFlipped])

  const handlePrevious = () => {
    setActiveService((prev) => (prev - 1 + services.length) % services.length)
    setIsFlipped(false)
  }

  const handleNext = () => {
    setActiveService((prev) => (prev + 1) % services.length)
    setIsFlipped(false)
  }

  const currentService = services[activeService]
  const CurrentIcon = iconComponents[currentService.icon]
  const currentPricing = servicePricing[currentService.id]
  const currentTestimonial = serviceTestimonials[currentService.id]

  return (
    <section 
      ref={sectionRef}
      className="py-16 px-4 bg-gradient-to-b from-light-cream via-cream to-light-cream relative overflow-hidden"
    >
      {/* Scrapbook Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(204, 164, 127, 0.1) 35px, rgba(204, 164, 127, 0.1) 70px)`,
        }}></div>
      </div>

      {/* Decorative Stickers */}
      <div className={`absolute top-10 left-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 rotate-12' : 'opacity-0 rotate-0'
      }`}>
        <div 
          className="bg-light-gold rounded-full p-3 shadow-lg cursor-pointer hover:scale-110 transition-transform"
          onMouseEnter={() => setHoveredSticker('quality')}
          onMouseLeave={() => setHoveredSticker(null)}
        >
          <Star className="text-gold" size={30} />
        </div>
        {hoveredSticker === 'quality' && (
          <div className="absolute -bottom-8 left-0 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap text-brown">
            איכות מובטחת
          </div>
        )}
      </div>

      <div className={`absolute top-20 right-10 transition-all duration-1000 delay-200 ${
        isVisible ? 'opacity-100 -rotate-6' : 'opacity-0 rotate-0'
      }`}>
        <div 
          className="bg-red-accent/20 rounded-full p-3 shadow-lg cursor-pointer hover:scale-110 transition-transform"
          onMouseEnter={() => setHoveredSticker('love')}
          onMouseLeave={() => setHoveredSticker(null)}
        >
          <Heart className="text-red-accent" size={30} />
        </div>
        {hoveredSticker === 'love' && (
          <div className="absolute -bottom-8 right-0 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap text-brown">
            עשוי באהבה
          </div>
        )}
      </div>

      <div className={`absolute bottom-20 left-20 transition-all duration-1000 delay-400 ${
        isVisible ? 'opacity-100 rotate-6' : 'opacity-0 rotate-0'
      }`}>
        <div 
          className="bg-gold/30 rounded-full p-3 shadow-lg cursor-pointer hover:scale-110 transition-transform"
          onMouseEnter={() => setHoveredSticker('eco')}
          onMouseLeave={() => setHoveredSticker(null)}
        >
          <Sparkles className="text-gold" size={30} />
        </div>
        {hoveredSticker === 'eco' && (
          <div className="absolute -top-8 left-0 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap text-brown">
            ידידותי לסביבה
          </div>
        )}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Title - Like a Scrapbook Title */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-block relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brown font-handwritten">
              השירותים שלנו
            </h2>
            <div className="absolute -top-2 -right-4 text-4xl text-gold animate-pulse">✨</div>
            <div className="absolute -bottom-2 -left-4 text-4xl text-red-accent animate-pulse" style={{animationDelay: '0.5s'}}>💝</div>
          </div>
          <p className="text-brown/70 mt-4 font-handwritten text-xl">
            בחרו את השירות המושלם עבורכם
          </p>
        </div>

        {/* Mobile View - Single Polaroid */}
        <div className="md:hidden">
          <div className={`max-w-sm mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            {/* Polaroid Card */}
            <PolaroidCard
              tilt={tiltAngles[activeService] || -2}
              hasPin={currentService.hasPin}
              hasClip={currentService.hasClip}
              hasTape={currentService.hasTape}
              hasStamp={currentService.hasStamp}
              stampType={currentService.stampType}
              note={currentService.note}
              className="mx-auto"
            >
              {/* Front Side */}
              <div className={`${isFlipped ? 'hidden' : 'block'}`}>
                <img 
                  src={currentService.image} 
                  alt={currentService.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-brown">{currentService.title}</h3>
                    {CurrentIcon && <CurrentIcon className="text-gold" size={24} />}
                  </div>
                  
                  {currentPricing && (
                    <div className="flex items-center gap-4 text-sm text-brown/70">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gold" />
                        <span>{currentPricing.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Coins size={14} className="text-gold" />
                        <span>{currentPricing.price}</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setIsFlipped(true)}
                    className="w-full py-2 bg-gold text-white rounded-full font-medium hover:bg-brown transition-colors flex items-center justify-center gap-2"
                  >
                    <Info size={16} />
                    <span>ראה פרטים</span>
                  </button>
                </div>
              </div>

              {/* Back Side */}
              <div className={`${isFlipped ? 'block' : 'hidden'} p-4`}>
                <h3 className="text-xl font-bold text-brown mb-3">{currentService.title}</h3>
                
                <div className="space-y-2 mb-4">
                  {currentService.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Pin size={12} className="text-gold mt-1 flex-shrink-0" />
                      <span className="text-brown/80">{item}</span>
                    </div>
                  ))}
                </div>

                {currentTestimonial && (
                  <div className="p-3 bg-light-cream rounded-lg mb-4">
                    <p className="text-sm italic text-brown/70">"{currentTestimonial}"</p>
                  </div>
                )}

                <button
                  onClick={() => setIsFlipped(false)}
                  className="w-full py-2 bg-brown/70 text-white rounded-full font-medium hover:bg-brown transition-colors"
                >
                  חזור
                </button>
              </div>
            </PolaroidCard>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePrevious}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <ArrowRight size={20} className="text-brown" />
              </button>

              <div className="flex gap-2">
                {services.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveService(idx)
                      setIsFlipped(false)
                    }}
                    className={`transition-all duration-300 ${
                      idx === activeService 
                        ? 'w-8 h-2 bg-gold rounded-full' 
                        : 'w-2 h-2 bg-brown/30 rounded-full hover:bg-brown/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <ArrowLeft size={20} className="text-brown" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop View - Film Strip Style */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Film strip background */}
            <div className="absolute inset-x-0 top-0 bottom-0 bg-brown/5 rounded-lg"></div>
            
            {/* Film perforations */}
            <div className="absolute inset-x-0 top-0 h-4 bg-repeat-x opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='16' viewBox='0 0 20 16' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='2' width='6' height='12' fill='%237d5a50'/%3E%3Crect x='12' y='2' width='6' height='12' fill='%237d5a50'/%3E%3C/svg%3E")`,
              backgroundSize: '20px 16px'
            }}></div>
            <div className="absolute inset-x-0 bottom-0 h-4 bg-repeat-x opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='16' viewBox='0 0 20 16' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='2' width='6' height='12' fill='%237d5a50'/%3E%3Crect x='12' y='2' width='6' height='12' fill='%237d5a50'/%3E%3C/svg%3E")`,
              backgroundSize: '20px 16px'
            }}></div>

            {/* Services Grid */}
            <div className="grid grid-cols-3 gap-8 p-8">
              {services.map((service, index) => {
                const Icon = iconComponents[service.icon]
                const isActive = index === activeService
                const pricing = servicePricing[service.id]
                
                return (
                  <div
                    key={service.id}
                    className={`relative transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <PolaroidCard
                      tilt={isActive ? 0 : tiltAngles[index] || -2}
                      hasPin={service.hasPin}
                      hasClip={service.hasClip}
                      hasTape={service.hasTape}
                      hasStamp={service.hasStamp}
                      stampType={service.stampType}
                      note={service.note}
                      date="2024"
                      className={`cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-0 ${
                        isActive ? 'scale-105 shadow-2xl z-10' : ''
                      }`}
                      onClick={() => setActiveService(index)}
                    >
                      <div className="relative overflow-hidden group">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brown/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div className="text-white">
                            {pricing && (
                              <>
                                <p className="text-sm font-medium mb-1">{pricing.duration}</p>
                                <p className="text-lg font-bold">{pricing.price}</p>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Camera Flash Effect */}
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-100 pointer-events-none"></div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-brown">{service.title}</h3>
                          {Icon && <Icon className="text-gold" size={20} />}
                        </div>

                        {/* Quick items preview */}
                        <div className="text-xs text-brown/60 space-y-1">
                          {service.items.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-gold rounded-full"></div>
                              <span className="line-clamp-1">{item}</span>
                            </div>
                          ))}
                          <div className="text-gold font-medium">
                            +{service.items.length - 2} נוספים...
                          </div>
                        </div>
                      </div>
                    </PolaroidCard>
                  </div>
                )
              })}
            </div>

            {/* Selected Service Details */}
            <div className={`mt-8 p-6 bg-white rounded-lg shadow-xl transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-brown mb-4 flex items-center gap-2">
                    {CurrentIcon && <CurrentIcon size={28} className="text-gold" />}
                    {currentService.title}
                  </h3>
                  
                  <div className="space-y-2">
                    {currentService.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Camera size={16} className="text-gold mt-0.5 flex-shrink-0" />
                        <span className="text-brown/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {currentTestimonial && (
                    <div className="p-4 bg-light-cream rounded-lg border-2 border-light-gold">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="text-gold" size={20} />
                        <span className="font-bold text-brown">המלצה</span>
                      </div>
                      <p className="text-sm italic text-brown/70">"{currentTestimonial}"</p>
                    </div>
                  )}

                  {currentPricing && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-cream rounded-lg">
                        <Clock className="mx-auto text-brown/60 mb-1" size={20} />
                        <p className="text-xs text-brown/60">משך זמן</p>
                        <p className="font-bold text-brown">{currentPricing.duration}</p>
                      </div>
                      <div className="text-center p-3 bg-cream rounded-lg">
                        <Coins className="mx-auto text-brown/60 mb-1" size={20} />
                        <p className="text-xs text-brown/60">מחיר</p>
                        <p className="font-bold text-brown">{currentPricing.price}</p>
                      </div>
                    </div>
                  )}

                  <a 
                    href="#contact"
                    className="block w-full py-3 bg-red-accent text-white rounded-full font-bold text-center hover:bg-brown hover:shadow-lg transition-all hover:scale-105"
                  >
                    קבלו הצעת מחיר
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className={`text-center mt-12 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} style={{ transitionDelay: '1000ms' }}>
          <div className="inline-block relative">
            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg">
              <Award className="text-gold" size={20} />
              <span className="text-brown font-medium">10+ שנות ניסיון | 150+ פרויקטים מוצלחים</span>
              <Award className="text-gold" size={20} />
            </div>
            
            {/* Decorative tape - using WashiTape component */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32">
              <WashiTape />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .font-handwritten {
          font-family: 'Caveat', cursive;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}