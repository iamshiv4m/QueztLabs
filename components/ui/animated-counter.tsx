"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: string
  className?: string
}

/**
 * Animated counter that counts up when in view
 * Handles both numeric values and strings with non-numeric characters
 */
export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!isInView) return

    // Extract numeric part and suffix
    const numericMatch = value.match(/^([\d.]+)(.*)$/)
    if (!numericMatch) {
      setDisplayValue(value)
      return
    }

    const targetNum = Number.parseFloat(numericMatch[1])
    const suffix = numericMatch[2]
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(targetNum * eased)

      setDisplayValue(`${current}${suffix}`)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    animate()
  }, [isInView, value])

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  )
}
