'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'

interface StatItem {
  label: string
  value: number
  suffix?: string
  icon: string
  gradient: string
}

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({ clients: 0, projects: 0, services: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const stats: StatItem[] = [
      { label: 'Happy Clients', value: 150, icon: '😊', gradient: 'from-blue-500 to-cyan-500' },
      { label: 'Total Projects', value: 200, icon: '🚀', gradient: 'from-purple-500 to-pink-500' },
      { label: 'Services Offered', value: 10, icon: '⚡', gradient: 'from-orange-500 to-red-500' }
    ]

    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    stats.forEach((stat, index) => {
      let currentStep = 0
      const increment = stat.value / steps

      const timer = setInterval(() => {
        currentStep++
        const currentValue = Math.min(Math.floor(increment * currentStep), stat.value)

        setCounts(prev => {
          const newCounts = { ...prev }
          if (index === 0) newCounts.clients = currentValue
          if (index === 1) newCounts.projects = currentValue
          if (index === 2) newCounts.services = currentValue
          return newCounts
        })

        if (currentStep >= steps) {
          clearInterval(timer)
          // Ensure final value is exact
          setCounts(prev => {
            const newCounts = { ...prev }
            if (index === 0) newCounts.clients = stat.value
            if (index === 1) newCounts.projects = stat.value
            if (index === 2) newCounts.services = stat.value
            return newCounts
          })
        }
      }, stepDuration)
    })
  }, [isVisible])

  const stats: StatItem[] = [
    { label: 'Happy Clients', value: counts.clients, icon: '😊', gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Total Projects', value: counts.projects, icon: '🚀', gradient: 'from-purple-500 to-pink-500' },
    { label: 'Services Offered', value: counts.services, icon: '⚡', gradient: 'from-orange-500 to-red-500' }
  ]

  return (
    <section 
      ref={sectionRef}
      id="statistics" 
      className="py-20 relative overflow-hidden"
    >
      <SectionParticles particleCount={150} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid md:grid-cols-3 gap-8 lg:gap-12 ${isVisible ? 'animate-fade-in' : ''}`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 rounded-3xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-3xl dark:hover:shadow-gray-900 transition-all duration-700 transform hover:-translate-y-4 border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 text-center overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Animated gradient orb */}
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-opacity duration-700 transform group-hover:scale-125`}></div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {stat.icon}
                </div>
                <div className="mb-4">
                  <div className={`text-6xl md:text-7xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                    {stat.value}{stat.suffix || '+'}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {stat.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

