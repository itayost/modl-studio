import React from 'react'
import { MessageCircle } from 'lucide-react'
import { contactInfo } from '../utils/constants'

const WhatsAppButton = () => {
  return (
    <a
      href={contactInfo.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 left-8 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-all z-50 animate-pulse-slow group"
      aria-label="WhatsApp"
    >
      <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
    </a>
  )
}

export default WhatsAppButton