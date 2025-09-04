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
  date = ''
}) => {
  return (
    <div 
      className={`polaroid ${className}`} 
      style={{ transform: `rotate(${tilt}deg)` }}
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