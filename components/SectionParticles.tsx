'use client'

import { useEffect, useState } from 'react'
import Particles from './Particles'
import { useTheme } from '@/contexts/ThemeContext'

interface SectionParticlesProps {
  particleCount?: number
  className?: string
}

export default function SectionParticles({ particleCount = 150, className = '' }: SectionParticlesProps) {
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
    <div className={`absolute inset-0 w-full h-full -z-0 pointer-events-none overflow-hidden ${className}`}>
      <Particles
        particleColors={particleColors}
        particleCount={particleCount}
        particleSpread={8}
        speed={0.06}
        particleBaseSize={60}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
        className="opacity-20 dark:opacity-15"
      />
    </div>
  )
}

