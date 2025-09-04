// src/components/About.jsx
import React from 'react'
import { Lightbulb, Target, Sparkles, Palette, Layers, Heart } from 'lucide-react'
import PolaroidCard from './common/PolaroidCard'
import { useTiltAngles } from '../hooks/useTiltAngles'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const About = () => {
  const tiltAngles = useTiltAngles(7)
  
  // Scroll animations for different elements
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation()
  const { ref: contentRef, isInView: contentInView } = useScrollAnimation({ delay: 200 })
  const { ref: processRef, isInView: processInView } = useScrollAnimation({ delay: 400 })
  const { ref: valuesRef, childrenInView } = useStaggerAnimation({ 
    staggerDelay: 150,
    initialDelay: 600 
  })

  const values = [
    { icon: Lightbulb, title: 'חדשנות', desc: 'רעיונות יצירתיים' },
    { icon: Target, title: 'דיוק', desc: 'תכנון מושלם' },
    { icon: Sparkles, title: 'ייחודיות', desc: 'עיצוב אישי' }
  ]

  const designProcess = [
    { icon: Heart, title: 'הקשבה', desc: 'מבינים את החלום שלכם' },
    { icon: Palette, title: 'תכנון', desc: 'יוצרים קונספט מותאם' },
    { icon: Layers, title: 'ביצוע', desc: 'מגשימים את החזון' }
  ]

  return (
    <section id="about" className="py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 
          ref={titleRef}
          className={`section-title animate-fade-up ${titleInView ? 'in-view' : ''}`}
        >
          אודות הסטודיו
        </h2>
        
        {/* Philosophy and Studio Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div
            ref={contentRef}
            className={`animate-fade-right ${contentInView ? 'in-view' : ''}`}
          >
            <PolaroidCard 
              tilt={tiltAngles[0] || 0}
              hasTape={true}
              className={`mx-auto w-full max-w-md lg:max-w-none transition-all duration-500 ${
                contentInView ? 'hover:scale-105' : ''
              }`}
            >
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-brown mb-4 font-typewriter">
                  הפילוסופיה שלנו
                </h3>
                <p className="text-brown/80 leading-relaxed text-sm md:text-base mb-4">
                  ב-MOD&L STUDIO אנו מאמינים שכל חלל מספר סיפור ייחודי. 
                  אנו משלבים בין עיצוב מודרני לפונקציונליות מושלמת, 
                  תוך הקשבה קפדנית לצרכים ולחלומות של הלקוחות שלנו.
                </p>
                <p className="text-brown/70 text-sm leading-relaxed">
                  עם ניסיון של למעלה מ-10 שנים ומאות פרויקטים מוצלחים, 
                  אנו גאים להציע שירותי עיצוב מקצועיים ומותאמים אישית 
                  שהופכים כל בית למקום ייחודי ומיוחד.
                </p>
              </div>
            </PolaroidCard>
          </div>

          {/* Studio/Design Materials Showcase */}
          <div
            ref={processRef}
            className={`animate-fade-left ${processInView ? 'in-view' : ''}`}
          >
            <PolaroidCard 
              tilt={tiltAngles[1] || 0}
              hasPin={true}
              note="החומרים שלנו"
              className={`mx-auto w-full max-w-md lg:max-w-none transition-all duration-500 ${
                processInView ? 'hover:rotate-0' : ''
              }`}
            >
              {/* Design materials/mood board image */}
              <img 
                src="https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=400" 
                alt="חומרי עיצוב וטקסטורות - MOD&L STUDIO" 
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-4">
                <p className="text-center font-typewriter text-brown">איכות ללא פשרות</p>
                <p className="text-center text-sm text-brown/60 mt-1">בחירת חומרים קפדנית</p>
              </div>
            </PolaroidCard>
          </div>
        </div>

        {/* Design Process - Mobile friendly */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-brown text-center mb-8">התהליך שלנו</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {designProcess.map((step, index) => {
              const Icon = step.icon
              const isStepInView = contentInView // Use existing animation state
              
              return (
                <div
                  key={index}
                  className={`animate-scale-in ${isStepInView ? 'in-view' : ''}`}
                  style={{ transitionDelay: `${index * 200 + 600}ms` }}
                >
                  <PolaroidCard 
                    tilt={tiltAngles[index + 4] || 0}
                    className={`mx-auto w-full max-w-xs sm:max-w-none transition-all duration-500 ${
                      isStepInView ? 'hover:scale-110 hover:rotate-0' : ''
                    }`}
                  >
                    <div className="p-6 text-center">
                      <Icon 
                        size={32} 
                        className={`text-gold mx-auto mb-3 transition-all duration-500 ${
                          isStepInView ? 'animate-bounce-in' : ''
                        }`}
                      />
                      <h4 className="font-bold text-brown mb-1">{step.title}</h4>
                      <p className="text-sm text-brown/60">{step.desc}</p>
                    </div>
                  </PolaroidCard>
                </div>
              )
            })}
          </div>
        </div>

        {/* Values cards - responsive grid */}
        <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {values.map((value, index) => {
            const Icon = value.icon
            const isChildInView = childrenInView.includes(index)
            
            return (
              <div
                key={index}
                className={`animate-scale-in ${isChildInView ? 'in-view' : ''}`}
              >
                <PolaroidCard 
                  tilt={tiltAngles[index + 2] || 0}
                  className={`mx-auto w-full max-w-xs sm:max-w-none transition-all duration-500 ${
                    isChildInView ? 'hover:scale-110 hover:rotate-0' : ''
                  }`}
                >
                  <div className="p-6 text-center">
                    <Icon 
                      size={32} 
                      className={`text-gold mx-auto mb-3 transition-all duration-500 ${
                        isChildInView ? 'animate-bounce-in' : ''
                      }`}
                    />
                    <h4 className="font-bold text-brown mb-1">{value.title}</h4>
                    <p className="text-sm text-brown/60">{value.desc}</p>
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

export default About