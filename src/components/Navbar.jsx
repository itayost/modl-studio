// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../assets/images/logo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', label: 'בית' },
    { href: '#about', label: 'אודות' },
    { href: '#services', label: 'שירותים' },
    { href: '#portfolio', label: 'פרויקטים' },
    { href: '#contact', label: 'צור קשר' }
  ]

  return (
    <nav className={`fixed top-0 w-full bg-cream/95 backdrop-blur-md z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-lg py-2' : 'shadow-md py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
          >
            <img 
              src={logo} 
              alt="MOD&L STUDIO Logo" 
              className={`transition-all duration-300 ${
                isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-14'
              } w-auto`}
            />
            <span className="text-xl md:text-2xl font-bold text-gold hidden sm:inline-block group-hover:text-brown transition-colors">
              MOD&L STUDIO
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            {navLinks.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                className="text-brown hover:text-gold transition-colors duration-300 font-medium relative group"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-brown hover:text-gold transition-colors p-2"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
              }`}>
                <Menu size={24} />
              </span>
              <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'
              }`}>
                <X size={24} />
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 space-y-3">
            {navLinks.map((link, index) => (
              <a 
                key={link.href} 
                href={link.href} 
                className={`block text-brown hover:text-gold hover:bg-light-cream px-4 py-2 rounded-lg transition-all duration-300 transform ${
                  isMenuOpen 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar