// src/components/Hero.jsx
import React, { useEffect, useState } from 'react'
import { ArrowRight, Sparkles, Home, Stars, Palette, Ruler, Award, Heart } from 'lucide-react'

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const trustBadges = [
    { icon: <Home size={20} />, text: "150+ פרויקטים", delay: "delay-500" },
    { icon: <Award size={20} />, text: "10 שנות ניסיון", delay: "delay-600" },
    { icon: <Palette size={20} />, text: "עיצוב ייחודי", delay: "delay-700" }
  ]

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 px-4 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(204, 164, 127, 0.1) 35px, rgba(204, 164, 127, 0.1) 70px)`,
        }}></div>
      </div>

      {/* Animated Decorative Elements */}
      <div className={`absolute top-20 left-10 opacity-30 transition-all duration-1000 ${
        isLoaded ? 'animate-float' : 'opacity-0 translate-y-10'
      }`}>
        <Sparkles size={40} className="text-gold" />
      </div>
      
      <div className={`absolute top-32 right-12 opacity-40 transition-all duration-1000 delay-200 ${
        isLoaded ? 'animate-pulse-slow' : 'opacity-0'
      }`}>
        <Stars size={36} className="text-light-gold" />
      </div>
      
      <div className={`absolute bottom-20 left-16 opacity-30 transition-all duration-1000 delay-300 ${
        isLoaded ? 'animate-float' : 'opacity-0'
      }`}>
        <Home size={44} className="text-gold" />
      </div>

      <div className={`absolute top-1/2 right-20 opacity-20 transition-all duration-1000 delay-400 ${
        isLoaded ? 'animate-float' : 'opacity-0'
      }`}
        style={{ animationDelay: '2s' }}
      >
        <Palette size={60} className="text-brown" />
      </div>

      <div className={`absolute bottom-32 right-1/4 opacity-25 transition-all duration-1000 delay-500 ${
        isLoaded ? 'animate-pulse-slow' : 'opacity-0'
      }`}>
        <Ruler size={48} className="text-gold" />
      </div>

      <div className={`absolute top-1/3 left-1/4 opacity-20 transition-all duration-1000 delay-600 ${
        isLoaded ? 'animate-float' : 'opacity-0'
      }`}
        style={{ animationDelay: '3s' }}
      >
        <Heart size={32} className="text-red-accent" />
      </div>

      <div className="container mx-auto max-w-4xl">
        {/* Main Content - Centered */}
        <div className="text-center">
          
          {/* Small Pre-heading */}
          <div className={`mb-4 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="inline-block px-4 py-2 bg-light-gold/30 rounded-full text-sm text-brown/70 font-medium">
              ברוכים הבאים ל-MOD&L STUDIO
            </span>
          </div>

          {/* Main Heading */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-brown transition-all duration-700 delay-100 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            צרו חלל 
            <span className={`block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 text-gold transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              ייחודי משלכם
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className={`text-lg md:text-xl lg:text-2xl mb-8 text-brown/80 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            עיצוב פנים שמספר את הסיפור שלך
            <span className="block mt-2 text-base md:text-lg text-brown/60">
              מביאים את החלומות שלכם לחיים עם נגיעה אישית וייחודית
            </span>
          </p>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-10 transition-all duration-700 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <a 
              href="#contact"
              className="btn-primary flex items-center justify-center gap-2 hover:shadow-2xl transform hover:-translate-y-1 transition-all text-lg px-8 py-4"
            >
              <ArrowRight className="w-5 h-5" />
              קבעו פגישת ייעוץ
            </a>
            <a 
              href="#portfolio"
              className="btn-secondary hover:shadow-2xl transform hover:-translate-y-1 transition-all text-lg px-8 py-4"
            >
              גלו את העבודות שלנו
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-700 ${badge.delay} ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                } hover:scale-110 hover:shadow-xl hover:bg-white`}
              >
                <div className="text-gold">{badge.icon}</div>
                <span className="text-sm font-medium text-brown">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Polaroid Cards - Decorative Only */}
        <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
          {/* Floating card 1 */}
          <div className={`absolute top-20 -right-10 md:right-10 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0 rotate-12' : 'opacity-0 translate-y-10 rotate-0'
          }`}>
            <div className="w-32 h-40 bg-white shadow-xl transform rotate-12 hover:rotate-6">
              <div className="w-full h-3/4 bg-gradient-to-br from-light-gold to-light-cream"></div>
              <div className="p-2">
                <div className="h-2 bg-brown/20 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Floating card 2 */}
          <div className={`absolute bottom-40 -left-10 md:left-10 transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0 -rotate-6' : 'opacity-0 translate-y-10 rotate-0'
          }`}>
            <div className="w-28 h-36 bg-white shadow-xl transform -rotate-6 hover:rotate-0">
              <div className="w-full h-3/4 bg-gradient-to-br from-light-cream to-white"></div>
              <div className="p-2">
                <div className="h-2 bg-gold/30 rounded w-2/3 mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Floating card 3 - Hidden on mobile */}
          <div className={`absolute top-1/3 -left-20 hidden lg:block transition-all duration-1000 delay-400 ${
            isLoaded ? 'opacity-100 translate-x-0 rotate-3' : 'opacity-0 -translate-x-10 rotate-0'
          }`}>
            <div className="w-36 h-44 bg-white shadow-xl transform rotate-3">
              <div className="w-full h-3/4 bg-gradient-to-br from-red-accent/10 to-light-gold"></div>
              <div className="p-2">
                <div className="h-2 bg-brown/30 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero