'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Projects</h1>
          <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our portfolio of successfully delivered projects that showcase our versatility, innovation, and commitment to excellence.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${isVisible ? 'animate-fade-in' : ''}`}>
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 rounded-full">
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

        <div className="mt-16 text-center">
          <Link
            href="/#contact"
            className="inline-block bg-primary-600 dark:bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  )
}

