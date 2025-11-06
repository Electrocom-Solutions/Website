'use client'

import { useEffect, useState } from 'react'
import Particles from './Particles'
import { useTheme } from '@/contexts/ThemeContext'

export default function GlobalParticles() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const particleColors = theme === 'dark' 
    ? ['#ffffff', '#93c5fd', '#60a5fa', '#3b82f6'] 
    : ['#ffffff', '#e0e7ff', '#c7d2fe', '#a5b4fc']

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Particles
        particleColors={particleColors}
        particleCount={500}
        particleSpread={12}
        speed={0.1}
        particleBaseSize={70}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
        className="opacity-40 dark:opacity-30"
      />
    </div>
  )
}

