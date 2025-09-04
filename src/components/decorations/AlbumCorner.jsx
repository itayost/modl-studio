import React from 'react'

const AlbumCorner = ({ position = 'top-left' }) => {
  return <div className={`album-corner ${position}`} />
}

export default AlbumCorner