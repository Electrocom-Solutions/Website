'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'

export default function ClientSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const scrollSpeed = useRef(2)

  const clients = [
    'Government of Rajasthan',
    'Chittorgarh District Hospital',
    'Rajasthan State Education Board',
    'Municipal Corporation Chittorgarh',
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Tata Consultancy Services',
    'Infosys Technologies',
    'Wipro Limited',
    'Tech Mahindra',
    'Larsen & Toubro',
    'Reliance Industries',
    'Adani Group',
    'Bharti Airtel',
    'Vodafone Idea',
    'Jio Platforms',
    'Amazon India',
    'Flipkart',
    'Zomato',
    'Swiggy',
    'Ola Cabs',
    'Uber India',
    'Paytm',
    'PhonePe',
    'Google India',
    'Microsoft India',
    'IBM India',
    'Oracle India'
  ]

  // Duplicate clients for seamless loop
  const duplicatedClients = [...clients, ...clients, ...clients]

  useEffect(() => {
    if (!sliderRef.current || isHovered || isDragging) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const animate = () => {
      if (!sliderRef.current || isHovered || isDragging) return
      
      const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      const currentScroll = sliderRef.current.scrollLeft
      
      // Seamless loop: reset to beginning when reaching 1/3 of the scroll
      if (currentScroll >= maxScroll / 3) {
        sliderRef.current.scrollLeft = 0
      } else {
        sliderRef.current.scrollLeft += scrollSpeed.current
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isHovered, isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <section 
      id="clients" 
      className="py-20 relative overflow-hidden"
    >
      <SectionParticles particleCount={120} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4 animate-fade-in">
            Our Clients
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            Trusted By Industry Leaders
          </h2>
          <div className="w-40 h-2 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-8 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow"></span>
          </div>
        </div>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            handleMouseLeave()
          }}
        >
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`
              flex gap-8 overflow-x-hidden scrollbar-hide
              ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
              ${isHovered ? '' : 'smooth-scroll'}
            `}
            style={{
              scrollBehavior: isHovered ? 'auto' : 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client}-${index}`}
                className="flex-shrink-0 backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 px-8 py-6 rounded-2xl shadow-xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 flex items-center justify-center text-white font-bold text-lg">
                    {client.charAt(0)}
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                    {client}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isHovered ? 'Drag to explore • Hover to pause' : 'Hover to pause and drag'}
          </p>
        </div>
      </div>
    </section>
  )
}

