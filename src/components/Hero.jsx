// src/components/Hero.jsx
import React, { useEffect, useState } from 'react'
import { ArrowRight, Sparkles, Home, Stars, Palette, Ruler, Award } from 'lucide-react'
import { AlbumCorner } from './decorations'

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Rotate through portfolio images
  const portfolioImages = [
    {
      url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600",
      caption: "עיצוב סלון מודרני",
      location: "תל אביב"
    },
    {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600",
      caption: "חלל מגורים חם",
      location: "הרצליה"
    },
    {
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600",
      caption: "מטבח מעוצב",
      location: "רמת גן"
    }
  ]

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % portfolioImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const trustBadges = [
    { icon: <Home size={20} />, text: "150+ פרויקטים", delay: "delay-500" },
    { icon: <Award size={20} />, text: "10 שנות ניסיון", delay: "delay-600" },
    { icon: <Palette size={20} />, text: "עיצוב ייחודי", delay: "delay-700" }
  ]

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 px-4 relative overflow-hidden">

      {/* Animated Decorative Doodles */}
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

      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-right z-10">
            <h1 className={`text-4xl md:text-6xl font-bold mb-4 leading-tight text-brown transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              צרי חלל 
              <span className={`block text-3xl md:text-5xl mt-2 text-gold transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
                ייחודי משלך
              </span>
            </h1>
            
            <p className={`text-lg md:text-xl mb-6 text-brown/80 transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              עיצוב פנים שמספר את הסיפור שלך • MOD&L STUDIO
            </p>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <a 
                href="#contact"
                className="btn-primary flex items-center justify-center gap-2 hover:shadow-2xl transform hover:-translate-y-1 transition-all"
              >
                <ArrowRight className="w-5 h-5" />
                קבעו פגישת ייעוץ
              </a>
              <a 
                href="#portfolio"
                className="btn-secondary hover:shadow-2xl transform hover:-translate-y-1 transition-all"
              >
                גלו את העבודות שלנו
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full bg-light-cream transition-all duration-700 ${badge.delay} ${
                    isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  } hover:scale-110 hover:shadow-lg`}
                >
                  <div className="text-gold">{badge.icon}</div>
                  <span className="text-sm font-medium text-brown">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Showcase - Polaroid Style */}
          <div className="flex-1 relative">
            <div className={`relative mx-auto w-full max-w-md transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'
            }`}>
              {/* Main Polaroid Frame */}
              <div className="relative bg-white p-4 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* Push Pin */}
                <div className="push-pin"></div>
                
                {/* Image Container with Fade Transition */}
                <div className="relative overflow-hidden aspect-square">
                  {portfolioImages.map((image, index) => (
                    <img 
                      key={index}
                      src={image.url}
                      alt={image.caption}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                        index === currentImageIndex 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-110'
                      }`}
                    />
                  ))}
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {portfolioImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-white w-6' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Polaroid Caption */}
                <div className="pt-4 text-center">
                  <p className="font-handwritten text-xl text-brown/70">
                    {portfolioImages[currentImageIndex].caption}
                  </p>
                  <p className="text-sm text-brown/50 font-typewriter">
                    {portfolioImages[currentImageIndex].location}
                  </p>
                </div>

                {/* Handwritten note */}
                <div className="handwritten-note">הפרויקטים שלנו</div>
              </div>

              {/* Decorative elements around photo */}
              <div className={`absolute -top-4 -right-4 transition-all duration-700 delay-800 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}>
                <Palette className="w-8 h-8 text-red-accent animate-pulse-slow" />
              </div>
              
              <div className={`absolute -bottom-4 -left-4 transition-all duration-700 delay-900 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}>
                <Ruler className="w-8 h-8 text-gold animate-pulse-slow" />
              </div>

              {/* Additional scattered polaroids behind main */}
              <div className="absolute -z-10 top-8 -left-8 bg-white p-2 shadow-lg transform -rotate-12 opacity-50">
                <div className="w-48 h-48 bg-light-cream"></div>
              </div>
              
              <div className="absolute -z-10 -top-8 right-8 bg-white p-2 shadow-lg transform rotate-6 opacity-50">
                <div className="w-48 h-48 bg-light-gold"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero