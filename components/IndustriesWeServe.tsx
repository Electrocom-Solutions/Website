'use client'

import { useEffect, useRef, useState } from 'react'

export default function IndustriesWeServe() {
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

  const industries = [
    { name: "Government Departments", icon: "🏛️" },
    { name: "Healthcare & Hospitals", icon: "🏥" },
    { name: "Education", icon: "🎓" },
    { name: "Manufacturing", icon: "🏭" },
    { name: "Construction & Infrastructure", icon: "🏗️" },
    { name: "IT & Service-Based Companies", icon: "💼" }
  ]

  const colors = [
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-blue-500",
    "from-teal-500 to-cyan-500"
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🌱 Industries We Serve</h2>
          <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto"></div>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${isVisible ? 'animate-fade-in' : ''}`}>
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center transform hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${colors[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative">
                <div className="text-4xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {industry.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
