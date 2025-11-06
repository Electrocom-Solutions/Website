'use client'

import { useEffect, useRef, useState } from 'react'

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
    { name: 'Next.js', icon: '⚡', color: 'from-gray-800 to-gray-900', description: 'React framework for production' },
    { name: 'React.js', icon: '⚛️', color: 'from-blue-500 to-cyan-500', description: 'JavaScript library for UI' },
    { name: 'Flask', icon: '🌶️', color: 'from-red-500 to-orange-500', description: 'Lightweight Python web framework' },
    { name: 'Flutter', icon: '📱', color: 'from-blue-400 to-blue-600', description: 'Cross-platform mobile framework' },
    { name: 'Django', icon: '🎸', color: 'from-green-600 to-green-800', description: 'High-level Python web framework' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-emerald-600', description: 'JavaScript runtime environment' },
  ]

  const databases = [
    { name: 'MySQL', icon: '🗄️', color: 'from-blue-600 to-blue-800', description: 'Relational database management' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-500 to-indigo-600', description: 'Advanced open-source database' },
    { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-green-700', description: 'NoSQL document database' },
    { name: 'Oracle SQL', icon: '🔷', color: 'from-red-600 to-red-800', description: 'Enterprise database solution' },
    { name: 'SQLite', icon: '💾', color: 'from-gray-600 to-gray-800', description: 'Lightweight embedded database' },
  ]

  return (
    <section 
      ref={sectionRef}
      id="technologies" 
      className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 text-center overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
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
            {databases.map((db, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 text-center overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${db.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
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

