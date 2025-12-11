"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/**
 * Scroll progress indicator
 * Shows reading progress at the top of the page
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
