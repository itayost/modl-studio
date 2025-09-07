// components/ServicesSection.jsx
import React, { useState, useEffect, useRef } from 'react'
import { 
  Star, Heart, Sparkles, Award, Clock, Coins, Camera,
  Sofa, Home, CheckCircle
} from 'lucide-react'
import Carousel from './common/Carousel'
import ServiceItem from './common/ServiceItem'
import { useTiltAngles } from '../hooks/useTiltAngles'
import { WashiTape } from './decorations'
import { services } from '../utils/constants'

// Icon mapping for services - maps string names to Lucide components
const iconComponents = {
  Sofa: Sofa,
  Home: Home,
  CheckCircle: CheckCircle
}

// Service testimonials mapped by service ID
const serviceTestimonials = {
  1: "השירות הזה שינה לנו את הבית! ממליצה בחום - רחל כהן",
  2: "לימור הפכה את החלום שלנו למציאות - משפחת לוי",
  3: "ליווי מקצועי שחסך לנו כסף וכאבי ראש - יוסי מזרחי"
}

// Service pricing mapped by service ID
const servicePricing = {
  1: { price: "₪2,500+", duration: "3-6 שבועות" },
  2: { price: "₪150/מ״ר", duration: "2-6 חודשים" },
  3: { price: "לפי פרויקט", duration: "משתנה" }
}

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedService, setSelectedService] = useState(0)
  const sectionRef = useRef(null)
  
  // Use tilt angles hook for random tilts
  const tiltAngles = useTiltAngles(services.length)

  // Intersection Observer for animations
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

  // Render function for carousel items (mobile)
  const renderCarouselItem = (service, index, isActive) => {
    const IconComponent = iconComponents[service.icon]
    const pricing = servicePricing[service.id]
    const testimonial = serviceTestimonials[service.id]
    
    return (
      <ServiceItem
        key={service.id}
        service={service}
        IconComponent={IconComponent}
        tilt={tiltAngles[index] || -2}
        pricing={pricing}
        testimonial={testimonial}
        isActive={isActive}
        onClick={() => setSelectedService(index)}
        showFlipButton={true}
        className="mx-auto"
      />
    )
  }

  // Get current service details
  const currentService = services[selectedService]
  const CurrentIcon = iconComponents[currentService?.icon]
  const currentPricing = servicePricing[currentService?.id]
  const currentTestimonial = serviceTestimonials[currentService?.id]

  return (
    <section 
      ref={sectionRef}
      className="py-16 px-4 bg-gradient-to-b from-light-cream via-cream to-light-cream relative overflow-hidden"
      id="services"
    >
      {/* Scrapbook Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(204, 164, 127, 0.1) 35px, rgba(204, 164, 127, 0.1) 70px)`,
        }}></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Title */}
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

        {/* Mobile View - Carousel */}
        <div className="block md:hidden">
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <Carousel
              items={services}
              renderItem={renderCarouselItem}
              autoPlay={false}
              showArrows={true}
              showDots={true}
              onItemChange={setSelectedService}
              className="max-w-sm mx-auto"
            />
          </div>
        </div>

        {/* Desktop View - Grid of 3 Cards */}
        <div className="hidden md:block">
          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {services.map((service, index) => {
              const IconComponent = iconComponents[service.icon]
              const pricing = servicePricing[service.id]
              const testimonial = serviceTestimonials[service.id]
              const isActive = index === selectedService
              
              return (
                <div
                  key={service.id}
                  className={`transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <ServiceItem
                    service={service}
                    IconComponent={IconComponent}
                    tilt={tiltAngles[index] || -2}
                    pricing={pricing}
                    testimonial={testimonial}
                    isActive={isActive}
                    onClick={() => setSelectedService(index)}
                    showFlipButton={true}
                  />
                </div>
              )
            })}
          </div>

          {/* Selected Service Details Panel - Desktop Only */}
          <div className={`mt-8 p-6 bg-white rounded-lg shadow-xl transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Service Details */}
              <div>
                <h3 className="text-2xl font-bold text-brown mb-4 flex items-center gap-2">
                  {CurrentIcon && <CurrentIcon size={28} className="text-gold" />}
                  {currentService?.title}
                </h3>
                
                <div className="space-y-2">
                  {currentService?.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Camera size={16} className="text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-brown/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial & Pricing */}
              <div className="space-y-4">
                {/* Testimonial Card */}
                {currentTestimonial && (
                  <div className="p-4 bg-light-cream rounded-lg border-2 border-light-gold">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="text-gold" size={20} />
                      <span className="font-bold text-brown">המלצה</span>
                    </div>
                    <p className="text-sm italic text-brown/70">"{currentTestimonial}"</p>
                  </div>
                )}

                {/* Pricing Grid */}
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

                {/* CTA Button */}
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

        {/* Bottom Decoration - Awards/Stats */}
        <div className={`text-center mt-12 transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} style={{ transitionDelay: '1000ms' }}>
          <div className="inline-block relative">
            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg">
              <Award className="text-gold" size={20} />
              <span className="text-brown font-medium">10+ שנות ניסיון | 150+ פרויקטים מוצלחים</span>
              <Award className="text-gold" size={20} />
            </div>
            
            {/* Decorative washi tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32">
              <WashiTape />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}