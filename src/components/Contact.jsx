// src/components/Contact.jsx
import React from 'react'
import { Phone, Mail, Clock, MapPin, MessageCircle, Award, Heart, Sparkles, Instagram, Facebook } from 'lucide-react'
import { contactInfo } from '../utils/constants'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'
import limorImage from '../assets/images/limor.jpg'

const Contact = () => {
  // Scroll animations
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation()
  const { ref: cardsRef, childrenInView: cardsInView } = useStaggerAnimation({ 
    staggerDelay: 100,
    initialDelay: 200
  })
  const { ref: designerRef, isInView: designerInView } = useScrollAnimation({ delay: 400 })
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation({ delay: 600 })

  const contactCards = [
    { 
      icon: Phone, 
      title: 'טלפון', 
      info: contactInfo.phone, 
      link: `tel:${contactInfo.phone}`,
      cta: 'התקשרו עכשיו'
    },
    { 
      icon: Mail, 
      title: 'אימייל', 
      info: contactInfo.email, 
      link: `mailto:${contactInfo.email}`,
      cta: 'שלחו מייל'
    },
    { 
      icon: Clock, 
      title: 'שעות פעילות', 
      info: contactInfo.hours,
      cta: 'זמינים עבורכם'
    },
    { 
      icon: MapPin, 
      title: 'מיקום', 
      info: 'תל אביב',
      cta: 'ניתן לתאם פגישה'
    }
  ]

  return (
    <section id="contact" className="py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Animated background element */}
      <div 
        className={`absolute bottom-20 right-20 opacity-10 transition-all duration-1000 ${
          titleInView ? 'rotate-0 scale-100' : 'rotate-45 scale-0'
        }`}
      >
        <MessageCircle size={200} className="text-gold" />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 
          ref={titleRef}
          className={`section-title animate-fade-up ${titleInView ? 'in-view' : ''}`}
        >
          צרו קשר
        </h2>
        
        {/* Contact cards with enhanced design */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {contactCards.map((item, index) => {
            const Icon = item.icon
            const isCardInView = cardsInView.includes(index)
            
            return (
              <a 
                key={index}
                href={item.link || '#'}
                className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 text-center group animate-scale-in relative overflow-hidden ${
                  isCardInView ? 'in-view' : ''
                }`}
              >
                {/* Background decoration on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-light-gold/0 to-light-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className={`relative transition-all duration-500 ${
                  isCardInView ? 'animate-bounce-in' : ''
                }`}>
                  <Icon className="w-10 h-10 text-gold mb-3 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <h3 className={`font-bold text-brown mb-2 transition-all duration-300 ${
                  isCardInView ? 'opacity-100' : 'opacity-0'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-brown/80 text-sm mb-3 transition-all duration-500 ${
                  isCardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  {item.info}
                </p>
                {item.cta && (
                  <span className="text-xs text-gold font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.cta}
                  </span>
                )}
              </a>
            )
          })}
        </div>

        {/* Main content area with CTA and designer profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced CTA Section - Takes 2 columns on large screens */}
          <div 
            ref={ctaRef}
            className={`lg:col-span-2 bg-gradient-to-br from-light-cream to-white p-8 md:p-12 rounded-lg shadow-xl relative animate-fade-up ${
              ctaInView ? 'in-view' : ''
            }`}
          >
            {/* Animated sticky note */}
            <div 
              className={`absolute -top-4 right-4 md:right-8 bg-gold px-4 py-2 transform shadow-md transition-all duration-700 ${
                ctaInView ? '-rotate-3 scale-100' : 'rotate-45 scale-0'
              }`}
              style={{ 
                fontFamily: 'Caveat, cursive', 
                fontSize: '1.2rem', 
                color: 'white',
                transitionDelay: '500ms'
              }}
            >
              בואו נעצב יחד!
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-brown mb-4">
                מוכנים להתחיל את הפרויקט שלכם?
              </h3>
              
              <p className="text-brown/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                אנחנו כאן כדי להפוך את החלום שלכם למציאות. 
                צרו איתנו קשר היום ונתחיל יחד במסע העיצובי שיהפוך את הבית שלכם למקום מושלם.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="btn-primary flex items-center justify-center gap-2 text-lg hover:scale-105 transition-transform"
                >
                  <Phone size={20} />
                  התקשרו עכשיו
                </a>
                <a 
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  className="btn-secondary flex items-center justify-center gap-2 text-lg hover:scale-105 transition-transform"
                >
                  <MessageCircle size={20} />
                  שלחו וואטסאפ
                </a>
              </div>

              {/* Social Media Links */}
              <div className="flex justify-center gap-6 pt-6 border-t border-brown/10">
                <a 
                  href="#" 
                  className="text-brown/60 hover:text-gold transition-colors hover:scale-125 transform duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="#" 
                  className="text-brown/60 hover:text-gold transition-colors hover:scale-125 transform duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-brown/60 hover:text-gold transition-colors hover:scale-125 transform duration-300"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </div>

              {/* Special Offer Banner */}
              <div className="mt-8 p-4 bg-white/70 rounded-lg border-2 border-gold/30">
                <Sparkles className="text-gold mx-auto mb-2" size={24} />
                <p className="text-sm text-brown font-medium">
                  ייעוץ ראשוני חינם למתקשרים השבוע!
                </p>
              </div>
            </div>
          </div>

          {/* Meet Your Designer Card */}
          <div 
            ref={designerRef}
            className={`bg-white p-6 rounded-lg shadow-lg relative transform animate-fade-left ${
              designerInView ? 'in-view hover:scale-105' : ''
            } transition-all duration-500`}
          >
            {/* Polaroid-style photo */}
            <div className="bg-white p-2 shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 mb-6">
              <img 
                src={limorImage}
                alt="לימור יער-און - מעצבת ראשית MOD&L STUDIO"
                className="w-full aspect-square object-cover"
              />
              <p className="text-center font-handwritten text-lg text-brown/70 pt-2">
                לימור יער-און
              </p>
            </div>

            {/* Designer info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brown text-center mb-2">
                המעצבת שלכם
              </h3>
              
              <p className="text-sm text-brown/80 leading-relaxed text-center italic">
                "אני מאמינה שכל בית צריך לספר את הסיפור של האנשים שגרים בו. 
                עם ניסיון של למעלה מ-10 שנים, אני כאן להפוך את החלום שלכם למציאות."
              </p>

              {/* Credentials */}
              <div className="space-y-2 pt-4 border-t border-light-cream">
                <div className="flex items-center gap-2 text-sm text-brown/70">
                  <Award size={16} className="text-gold flex-shrink-0" />
                  <span>בוגרת שנקר בהצטיינות</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-brown/70">
                  <Heart size={16} className="text-gold flex-shrink-0" />
                  <span>10+ שנות ניסיון</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-brown/70">
                  <Sparkles size={16} className="text-gold flex-shrink-0" />
                  <span>150+ פרויקטים מוצלחים</span>
                </div>
              </div>

              {/* Direct Contact Button */}
              <a 
                href={`tel:${contactInfo.phone}`}
                className="w-full btn-primary text-center mt-4 hover:scale-105 transition-transform"
              >
                דברו איתי ישירות
              </a>

              {/* Handwritten note */}
              <div 
                className="text-center pt-2"
                style={{ 
                  fontFamily: 'Caveat, cursive', 
                  fontSize: '1.2rem', 
                  color: '#cca47f'
                }}
              >
                "נשמח להכיר!"
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact