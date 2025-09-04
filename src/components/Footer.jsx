import React from 'react'
import { Camera, Heart, Palette } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    { icon: Camera, href: '#', label: 'Instagram' },
    { icon: Heart, href: '#', label: 'Facebook' },
    { icon: Palette, href: '#', label: 'Pinterest' }
  ]

  return (
    <footer className="bg-brown text-cream py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <div className="text-3xl font-bold text-gold mb-2">MOD&L STUDIO</div>
            <div className="text-sm text-cream/70 text-center">עיצוב פנים | לימור יער-און</div>
          </div>

          <div className="flex gap-4 mb-8">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gold rounded-full flex items-center justify-center hover:bg-light-gold transition-all hover:-translate-y-1"
                >
                  <Icon size={20} className="text-brown" />
                </a>
              )
            })}
          </div>

          <div className="text-center text-sm">
            <p className="mb-2">© 2024 MOD&L STUDIO - כל הזכויות שמורות</p>
            <div className="flex items-center justify-center gap-1 text-cream/60">
              <span>עוצב ופותח עם</span>
              <Heart size={14} className="inline fill-current" />
              <span>לפרטים יצירתיים</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer