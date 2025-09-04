// src/components/Contact.jsx
import React, { useState } from 'react'
import { Phone, Mail, Clock, MapPin, Send, MessageCircle, Award, Heart, Sparkles } from 'lucide-react'
import { contactInfo } from '../utils/constants'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'
import limorImage from '../assets/images/limor.jpg'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Scroll animations
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation()
  const { ref: cardsRef, childrenInView: cardsInView } = useStaggerAnimation({ 
    staggerDelay: 100,
    initialDelay: 200
  })
  const { ref: formRef, isInView: formInView } = useScrollAnimation({ delay: 400 })
  const { ref: designerRef, isInView: designerInView } = useScrollAnimation({ delay: 600 })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission with animation
    setTimeout(() => {
      alert('תודה על פנייתך! נחזור אליך בהקדם.')
      setFormData({ name: '', phone: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactCards = [
    { icon: Phone, title: 'טלפון', info: contactInfo.phone, link: `tel:${contactInfo.phone}` },
    { icon: Mail, title: 'אימייל', info: contactInfo.email, link: `mailto:${contactInfo.email}` },
    { icon: Clock, title: 'שעות', info: contactInfo.hours },
    { icon: MapPin, title: 'מיקום', info: 'תל אביב' }
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
        
        {/* Contact cards with stagger animation */}
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
                className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 text-center group animate-scale-in ${
                  isCardInView ? 'in-view' : ''
                }`}
              >
                <div className={`transition-all duration-500 ${
                  isCardInView ? 'animate-bounce-in' : ''
                }`}>
                  <Icon className="w-8 h-8 text-gold mb-3 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                </div>
                <h3 className={`font-bold text-brown mb-2 transition-all duration-300 ${
                  isCardInView ? 'opacity-100' : 'opacity-0'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-brown/80 text-sm transition-all duration-500 ${
                  isCardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  {item.info}
                </p>
              </a>
            )
          })}
        </div>

        {/* Main content area with form and designer profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns on large screens */}
          <div 
            ref={formRef}
            className={`lg:col-span-2 bg-white p-6 md:p-8 rounded-lg shadow-lg relative animate-fade-up ${
              formInView ? 'in-view' : ''
            }`}
          >
            {/* Animated sticky note */}
            <div 
              className={`absolute -top-4 right-4 md:right-8 bg-light-gold px-3 py-2 transform shadow-md transition-all duration-700 ${
                formInView ? '-rotate-3 scale-100' : 'rotate-45 scale-0'
              }`}
              style={{ 
                fontFamily: 'Caveat, cursive', 
                fontSize: '1.1rem', 
                color: '#7d5a50',
                transitionDelay: '500ms'
              }}
            >
              בואו נעצב יחד!
            </div>
            
            <h3 className="text-xl font-bold text-brown mb-6">שלחו הודעה</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`transition-all duration-500 ${
                  formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`} style={{ transitionDelay: formInView ? '600ms' : '0ms' }}>
                  <label className="block text-brown font-medium mb-2 text-sm">שם מלא</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-light-cream rounded-lg focus:border-gold focus:outline-none transition-all focus:scale-105 text-sm"
                    placeholder="הכנס את שמך"
                    required
                  />
                </div>
                
                <div className={`transition-all duration-500 ${
                  formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`} style={{ transitionDelay: formInView ? '700ms' : '0ms' }}>
                  <label className="block text-brown font-medium mb-2 text-sm">טלפון</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-light-cream rounded-lg focus:border-gold focus:outline-none transition-all focus:scale-105 text-sm"
                    placeholder="050-0000000"
                    required
                  />
                </div>
              </div>
              
              <div className={`transition-all duration-500 ${
                formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`} style={{ transitionDelay: formInView ? '800ms' : '0ms' }}>
                <label className="block text-brown font-medium mb-2 text-sm">אימייל</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-light-cream rounded-lg focus:border-gold focus:outline-none transition-all focus:scale-105 text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className={`transition-all duration-500 ${
                formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`} style={{ transitionDelay: formInView ? '900ms' : '0ms' }}>
                <label className="block text-brown font-medium mb-2 text-sm">הודעה</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-light-cream rounded-lg focus:border-gold focus:outline-none transition-all focus:scale-105 min-h-[120px] resize-y text-sm"
                  placeholder="ספרו לנו על הפרויקט שלכם..."
                  required
                />
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-500 ${
                  formInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } ${isSubmitting ? 'animate-pulse' : 'hover:scale-105'}`}
                style={{ transitionDelay: formInView ? '1000ms' : '0ms' }}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>שולח...</span>
                  </div>
                ) : (
                  <>
                    <Send size={18} className="hover:rotate-45 transition-transform duration-300" />
                    שלח הודעה
                  </>
                )}
              </button>
            </form>
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
              
              <p className="text-sm text-brown/80 leading-relaxed text-center">
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

              {/* Handwritten note */}
              <div 
                className="text-center pt-4"
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