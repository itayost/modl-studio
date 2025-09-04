// src/hooks/useScrollAnimation.js
import { useEffect, useRef, useState } from 'react'

export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px', // Trigger slightly before fully in view
    triggerOnce = true, // Only animate once
    delay = 0,
  } = options

  const elementRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Don't re-observe if already animated and triggerOnce is true
    if (hasAnimated && triggerOnce) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        
        if (inView && !hasAnimated) {
          // Add delay if specified
          if (delay > 0) {
            setTimeout(() => {
              setIsInView(true)
              if (triggerOnce) setHasAnimated(true)
            }, delay)
          } else {
            setIsInView(true)
            if (triggerOnce) setHasAnimated(true)
          }
        } else if (!triggerOnce && !inView) {
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated])

  return { ref: elementRef, isInView }
}

// Hook for staggered animations on children
export const useStaggerAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    staggerDelay = 100, // Delay between each child
    initialDelay = 0,
  } = options

  const containerRef = useRef(null)
  const [childrenInView, setChildrenInView] = useState([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = container.children
          
          for (let i = 0; i < children.length; i++) {
            setTimeout(() => {
              setChildrenInView(prev => [...prev, i])
            }, initialDelay + (i * staggerDelay))
          }

          if (triggerOnce) {
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setChildrenInView([])
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(container)

    return () => {
      if (container) {
        observer.unobserve(container)
      }
    }
  }, [threshold, rootMargin, triggerOnce, staggerDelay, initialDelay])

  return { ref: containerRef, childrenInView }
}