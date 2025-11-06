'use client'

import { useEffect, useRef, useState } from 'react'

export default function AboutUs() {
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

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Us</h2>
          <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto"></div>
        </div>

        <div className={`grid md:grid-cols-3 gap-12 ${isVisible ? 'animate-fade-in' : ''}`}>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Who We Are</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Electrocom is a technology-driven company specializing in customized software development, hardware maintenance, network infrastructure, and manpower outsourcing.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              With years of experience delivering end-to-end solutions across industries, we've built a reputation for reliability, transparency, and performance.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl mb-4">👁️</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To simplify technology and workforce operations for organizations by offering integrated, affordable, and scalable solutions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Empowering businesses, hospitals, and government departments with modern technology, reliable systems, and skilled manpower.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
