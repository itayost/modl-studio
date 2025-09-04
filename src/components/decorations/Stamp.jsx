import React from 'react'

const Stamp = ({ type = 'default', text = 'PREMIUM' }) => {
  const stampClass = type === 'premium' ? 'stamp-premium' : 'stamp-default'
  
  return (
    <div className={`stamp ${stampClass}`}>
      {text}
    </div>
  )
}

export default Stamp