// src/components/About.jsx
import React, { useRef, useEffect, useState } from 'react'
import { Award, Heart, Sparkles, Star, Quote, Palette, Home } from 'lucide-react'
import PolaroidCard from './common/PolaroidCard'
import { useTiltAngles } from '../hooks/useTiltAngles'
import limorImage from '../assets/images/limor.jpg'

const About = () => {
  const tiltAngles = useTiltAngles(1)
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  
  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger when section is 40% visible
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          setIsVisible(true)
          // Once visible, stop observing
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: [0.4] // Trigger when 40% of section is visible
      }
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

  const achievements = [
    { icon: Award, text: 'בוגרת שנקר בהצטיינות', color: 'text-gold' },
    { icon: Heart, text: '10+ שנות ניסיון', color: 'text-red-accent' },
    { icon: Home, text: '150+ פרויקטים מוצלחים', color: 'text-brown' },
    { icon: Sparkles, text: 'עיצוב ייחודי ואישי', color: 'text-gold' }
  ]

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-16 md:py-20 px-4 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div 
        className={`absolute top-20 right-10 opacity-20 transition-all duration-1000 ${
          isVisible ? 'animate-float' : 'opacity-0 translate-y-10'
        }`}
      >
        <Palette size={80} className="text-gold" />
      </div>
      
      <div 
        className={`absolute bottom-20 left-10 opacity-15 transition-all duration-1000 delay-500 ${
          isVisible ? 'animate-float' : 'opacity-0 translate-y-10'
        }`}
      >
        <Star size={60} className="text-brown" />
      </div>

      <div className="container mx-auto max-w-5xl">
        {/* Title */}
        <h2 className={`section-title transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          אודות המעצבת
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Designer Photo - Polaroid Style */}
          <div className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative max-w-md mx-auto">
              {/* Main Polaroid */}
              <PolaroidCard
                tilt={tiltAngles[0] || -3}
                hasPin={true}
                className="transform transition-all duration-500 hover:rotate-0 hover:scale-105"
              >
                <img 
                  src={limorImage}
                  alt="לימור יער-און - מעצבת ראשית MOD&L STUDIO"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4 text-center bg-white">
                  <h3 className="font-handwritten text-2xl text-brown/70">
                    לימור יער-און
                  </h3>
                  <p className="text-sm text-gold font-medium mt-1">
                    מעצבת ראשית ומייסדת
                  </p>
                </div>
              </PolaroidCard>

              {/* Decorative elements */}
              <div 
                className={`absolute -top-4 -right-4 transition-all duration-700 ${
                  isVisible ? 'opacity-100 scale-100 delay-700' : 'opacity-0 scale-0'
                }`}
              >
                <div className="bg-gold text-white p-2 rounded-full">
                  <Award size={24} />
                </div>
              </div>

              <div 
                className={`absolute -bottom-4 -left-4 transition-all duration-700 ${
                  isVisible ? 'opacity-100 scale-100 delay-1000' : 'opacity-0 scale-0'
                }`}
              >
                <div className="bg-red-accent text-white p-2 rounded-full">
                  <Heart size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Designer Info */}
          <div className={`transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {/* Quote */}
            <div className="relative mb-6">
              <Quote size={30} className="text-gold/20 absolute -top-2 right-0" />
              <p className="text-lg md:text-xl text-brown/80 italic leading-relaxed pr-10">
                "אני מאמינה שכל בית צריך לספר את הסיפור של האנשים שגרים בו. 
                העיצוב הוא לא רק אסתטיקה - הוא דרך חיים, הוא הרגשה, הוא הבית שתמיד חלמתם עליו."
              </p>
            </div>

            {/* Story */}
            <div className="mb-6">
              <p className="text-brown/70 leading-relaxed mb-4">
                עם ניסיון של למעלה מ-10 שנים בעיצוב פנים, אני מביאה לכל פרויקט 
                שילוב ייחודי של יצירתיות, מקצועיות ותשומת לב לפרטים הקטנים ביותר.
              </p>
              <p className="text-brown/70 leading-relaxed">
                החזון שלי הוא ליצור חללים שלא רק יפים לעין, אלא גם פונקציונליים, 
                נוחים ומשקפים את האישיות הייחודית של כל לקוח.
              </p>
            </div>

            {/* Achievements */}
            <div className="space-y-3">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    }`}
                    style={{ transitionDelay: `${800 + index * 100}ms` }}
                  >
                    <Icon size={20} className={`${achievement.color} flex-shrink-0`} />
                    <span className="text-sm md:text-base text-brown/70">{achievement.text}</span>
                  </div>
                )
              })}
            </div>

            {/* Signature */}
            <div 
              className={`mt-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 delay-1200' : 'opacity-0'
              }`}
            >
              <p 
                className="text-2xl text-gold/70"
                style={{ 
                  fontFamily: 'Caveat, cursive', 
                }}
              >
                ~ לימור
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div 
          className={`text-center mt-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0 delay-1400' : 'opacity-0 translate-y-4'
          }`}
        >
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-full font-medium hover:bg-brown hover:scale-105 transition-all duration-300"
          >
            <Sparkles size={20} />
            בואו נעצב יחד
          </a>
        </div>
      </div>
    </section>
  )
}

export default About