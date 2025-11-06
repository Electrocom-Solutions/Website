'use client'

import { useEffect, useRef, useState } from 'react'

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
      description: "Creative design and branding platform"
    },
    {
      name: "Electrocom ERP",
      description: "Internal ERP system for managing operations and manpower"
    },
    {
      name: "Shree Bada Paliwal Samaj Website",
      description: "Community management portal with event & member modules"
    },
    {
      name: "Vimson Derma Website",
      description: "Professional website for a dermatology clinic"
    },
    {
      name: "SolvifyHub",
      description: "SaaS platform offering technical solutions to small businesses"
    },
    {
      name: "ClickFix",
      description: "On-demand service management platform"
    },
    {
      name: "LearnHill",
      description: "Online learning and course management system"
    },
    {
      name: "Tile Placement Software",
      description: "Intelligent bin-packing algorithm for optimizing tile placement on slabs"
    },
    {
      name: "Board Result Printing Software",
      description: "Automated board exam result printing system"
    },
    {
      name: "Madhuchaitanya (API)",
      description: "API solution for educational institute automation"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🧩 Our Past Projects</h2>
          <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Below are some of our successfully delivered projects that reflect our versatility and commitment.
          </p>
        </div>

        <div className={`hidden md:block overflow-x-auto ${isVisible ? 'animate-fade-in' : ''}`}>
          <table className="w-full border-collapse bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 rounded-lg overflow-hidden">
            <thead className="bg-primary-600 dark:bg-primary-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Project Name</th>
                <th className="px-6 py-4 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-gray-200 dark:border-gray-700 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'
                  }`}
                >
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{project.name}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{project.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`md:hidden grid grid-cols-1 gap-6 ${isVisible ? 'animate-fade-in' : ''}`}>
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {project.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
