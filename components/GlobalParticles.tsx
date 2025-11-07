'use client'

import { useEffect, useState } from 'react'
import Particles from './Particles'

export default function GlobalParticles() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Detect mobile device
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768
      setIsMobile(isMobileDevice)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (!mounted) return null

  const particleColors = ['#ffffff', '#93c5fd', '#60a5fa', '#3b82f6']

  return (
    <div 
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        width: '100vw',
        height: '100vh',
        minWidth: '100%',
        minHeight: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <Particles
        particleColors={particleColors}
        particleCount={isMobile ? 400 : 800}
        particleSpread={15}
        speed={0.12}
        particleBaseSize={isMobile ? 60 : 80}
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

