'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { easeOutCubic } from '@/lib/utils'

/**
 * Hook for intersection observer animations
 */
export function useIntersection(options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsIntersecting(true)
          setHasAnimated(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [hasAnimated, options])

  return { ref, isIntersecting, hasAnimated }
}

/**
 * Hook for animated counter
 */
export function useCounterAnimation(target: number, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!shouldStart || hasStarted.current) return
    hasStarted.current = true

    const startTime = performance.now()
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      
      setCount(Math.floor(target * easedProgress))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }
    
    requestAnimationFrame(animate)
  }, [target, duration, shouldStart])

  return count
}

/**
 * Hook to detect mobile viewport
 */
export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint)
    checkMobile()
    
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  return isMobile
}

/**
 * Hook for scroll position tracking
 */
export function useScroll(threshold = 100) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrollY(y)
      setIsScrolled(y > threshold)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return { isScrolled, scrollY }
}

/**
 * Hook for carousel auto-play
 */
export function useCarousel(itemCount: number, interval = 4000) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()
  const progressRef = useRef<NodeJS.Timeout>()

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setProgress(0)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % itemCount)
    setProgress(0)
  }, [itemCount])

  const pause = useCallback(() => setIsPaused(true), [])
  const resume = useCallback(() => setIsPaused(false), [])

  useEffect(() => {
    if (isPaused) {
      clearTimeout(timerRef.current)
      clearInterval(progressRef.current)
      return
    }

    timerRef.current = setTimeout(nextSlide, interval)
    
    const increment = 100 / (interval / 50)
    progressRef.current = setInterval(() => {
      setProgress(prev => Math.min(prev + increment, 100))
    }, 50)

    return () => {
      clearTimeout(timerRef.current)
      clearInterval(progressRef.current)
    }
  }, [currentIndex, isPaused, interval, nextSlide])

  return { currentIndex, progress, goToSlide, pause, resume, isPaused }
}