// components/common/PolaroidCard.jsx
import React from 'react'
import { 
  PaperClip, 
  PushPin, 
  WashiTape, 
  Stamp, 
  HandwrittenNote, 
  DateStamp 
} from '../decorations'

const PolaroidCard = ({ 
  children, 
  className = "", 
  tilt = 0,
  hasClip = false,
  hasPin = false,
  hasTape = false,
  hasStamp = false,
  stampType = 'default',
  note = '',
  date = '',
  noBackground = false, // New prop to disable background for flip containers
  noTransform = false,  // New prop to disable transform for flip containers
  onClick
}) => {
  const baseClasses = noBackground 
    ? "p-1 md:p-2 shadow-lg transition-all duration-300 relative" 
    : "polaroid"
    
  const style = noTransform 
    ? {} 
    : { transform: `rotate(${tilt}deg)` }
  
  return (
    <div 
      className={`${baseClasses} ${className}`} 
      style={style}
      onClick={onClick}
    >
      {hasClip && <PaperClip />}
      {hasPin && <PushPin />}
      {hasTape && <WashiTape />}
      {hasStamp && <Stamp type={stampType} />}
      {note && <HandwrittenNote text={note} />}
      {date && <DateStamp date={date} />}
      {children}
    </div>
  )
}

export default PolaroidCard