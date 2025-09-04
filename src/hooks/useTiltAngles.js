import { useEffect, useState } from 'react'

export const useTiltAngles = (count = 20) => {
  const [tiltAngles, setTiltAngles] = useState({})

  useEffect(() => {
    const angles = {}
    for (let i = 0; i < count; i++) {
      angles[i] = Math.random() * 8 - 4 // -4 to 4 degrees
    }
    setTiltAngles(angles)
  }, [count])

  return tiltAngles
}