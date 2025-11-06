'use client'

import { useEffect, useState } from 'react'
import Particles from './Particles'

export default function GlobalParticles() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const particleColors = ['#ffffff', '#93c5fd', '#60a5fa', '#3b82f6']

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Particles
        particleColors={particleColors}
        particleCount={800}
        particleSpread={15}
        speed={0.12}
        particleBaseSize={80}
        moveParticlesOnHover={true}
        particleHoverFactor={2.5}
        alphaParticles={true}
        disableRotation={false}
        useWindowEvents={true}
        className="opacity-60"
      />
    </div>
  )
}

