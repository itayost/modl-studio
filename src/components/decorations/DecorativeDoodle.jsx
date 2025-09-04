import React from 'react'

const DecorativeDoodle = ({ icon: Icon, style }) => {
  return (
    <div className="decorative-doodle" style={style}>
      {Icon && <Icon size={32} />}
    </div>
  )
}

export default DecorativeDoodle