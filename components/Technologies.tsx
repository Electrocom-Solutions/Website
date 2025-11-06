'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'

export default function Technologies() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
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

  const frontendBackend = [
    { name: 'Next.js', icon: '⚡', description: 'React framework for production', gradient: 'from-gray-800 to-gray-900' },
    { name: 'React.js', icon: '⚛️', description: 'JavaScript library for UI', gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Flask', icon: '🌶️', description: 'Lightweight Python web framework', gradient: 'from-red-500 to-orange-500' },
    { name: 'Flutter', icon: '📱', description: 'Cross-platform mobile framework', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Django', icon: '🎸', description: 'High-level Python web framework', gradient: 'from-green-600 to-green-800' },
    { name: 'Node.js', icon: '🟢', description: 'JavaScript runtime environment', gradient: 'from-green-500 to-emerald-600' },
  ]

  return (
    <section 
      ref={sectionRef}
      id="technologies" 
      className="py-20 relative overflow-hidden"
    >
      <SectionParticles particleCount={200} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Cutting-Edge Tech Stack</h2>
          <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            From frontend to backend, we cover the full stack with modern, efficient technologies that power your digital success.
          </p>
        </div>

        <div className={`mb-16 ${isVisible ? 'animate-fade-in' : ''}`}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frontend & Backend Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {frontendBackend.map((tech, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150 transform hover:-translate-y-2 text-center overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className="text-5xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    {tech.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {tech.name}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.3s' }}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Databases</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'MySQL', icon: '🗄️', description: 'Relational database management', gradient: 'from-blue-600 to-blue-800' },
              { name: 'PostgreSQL', icon: '🐘', description: 'Advanced open-source database', gradient: 'from-blue-500 to-indigo-600' },
              { name: 'MongoDB', icon: '🍃', description: 'NoSQL document database', gradient: 'from-green-500 to-green-700' },
              { name: 'Oracle SQL', icon: '🔷', description: 'Enterprise database solution', gradient: 'from-red-600 to-red-800' },
              { name: 'SQLite', icon: '💾', description: 'Lightweight embedded database', gradient: 'from-gray-600 to-gray-800' },
            ].map((db, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150 transform hover:-translate-y-2 text-center overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${db.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className="text-5xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    {db.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {db.name}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{db.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
