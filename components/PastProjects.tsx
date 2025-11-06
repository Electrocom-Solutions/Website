'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'

export default function PastProjects() {
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

  const projects = [
    {
      name: "Wedesignz",
      description: "Creative design and branding platform",
      category: "Web Application"
    },
    {
      name: "Electrocom ERP",
      description: "Internal ERP system for managing operations and manpower",
      category: "Enterprise Software"
    },
    {
      name: "Shree Bada Paliwal Samaj Website",
      description: "Community management portal with event & member modules",
      category: "Web Application"
    },
    {
      name: "Vimson Derma Website",
      description: "Professional website for a dermatology clinic",
      category: "Website"
    },
    {
      name: "SolvifyHub",
      description: "SaaS platform offering technical solutions to small businesses",
      category: "SaaS Platform"
    },
    {
      name: "ClickFix",
      description: "On-demand service management platform",
      category: "Web Application"
    },
    {
      name: "LearnHill",
      description: "Online learning and course management system",
      category: "E-Learning Platform"
    },
    {
      name: "Tile Placement Software",
      description: "Intelligent bin-packing algorithm for optimizing tile placement on slabs",
      category: "Desktop Application"
    },
    {
      name: "Board Result Printing Software",
      description: "Automated board exam result printing system",
      category: "Desktop Application"
    },
    {
      name: "Madhuchaitanya (API)",
      description: "API solution for educational institute automation",
      category: "API Development"
    }
  ]

  const categoryColors: { [key: string]: string } = {
    "Web Application": "from-blue-500 to-cyan-500",
    "Enterprise Software": "from-purple-500 to-pink-500",
    "Website": "from-green-500 to-emerald-500",
    "SaaS Platform": "from-orange-500 to-red-500",
    "E-Learning Platform": "from-indigo-500 to-blue-500",
    "Desktop Application": "from-teal-500 to-cyan-500",
    "API Development": "from-pink-500 to-rose-500"
  }

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-20 relative overflow-hidden"
    >
      <SectionParticles particleCount={170} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🧩 Our Past Projects</h2>
          <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Below are some of our successfully delivered projects that reflect our versatility and commitment.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isVisible ? 'animate-fade-in' : ''}`}>
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150 transform hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[project.category] || 'from-gray-500 to-gray-700'} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative">
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${categoryColors[project.category] || 'from-gray-500 to-gray-700'} text-white shadow-lg`}>
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
