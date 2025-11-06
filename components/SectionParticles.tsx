'use client'

import { useEffect, useState } from 'react'
import Particles from './Particles'

interface SectionParticlesProps {
  particleCount?: number
  className?: string
}

export default function SectionParticles({ particleCount = 150, className = '' }: SectionParticlesProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const particleColors = ['#ffffff', '#93c5fd', '#60a5fa', '#3b82f6']

  return (
    <div className={`absolute inset-0 w-full h-full -z-0 overflow-hidden ${className}`}>
      <Particles
        particleColors={particleColors}
        particleCount={particleCount * 2}
        particleSpread={10}
        speed={0.08}
        particleBaseSize={70}
        moveParticlesOnHover={true}
        particleHoverFactor={2}
        alphaParticles={true}
        disableRotation={false}
        useWindowEvents={true}
        className="opacity-40"
      />
    </div>
  )
}

