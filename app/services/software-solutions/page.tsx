'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import SectionParticles from '@/components/SectionParticles'

interface ServiceCard {
  id: string
  title: string
  description: string
  icon: string
}

const services: ServiceCard[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies for optimal performance and user experience.',
    icon: '🌐'
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android devices.',
    icon: '📱'
  },
  {
    id: 'e-commerce-solutions',
    title: 'E-Commerce Solutions',
    description: 'Complete e-commerce platforms with payment integration and inventory management.',
    icon: '🛒'
  },
  {
    id: 'custom-erp-solution',
    title: 'Custom ERP Solution',
    description: 'Enterprise Resource Planning systems tailored to your business needs.',
    icon: '📊'
  },
  {
    id: 'custom-software-development',
    title: 'Custom Software Development',
    description: 'Bespoke software solutions designed to solve your unique business challenges.',
    icon: '💻'
  },
  {
    id: 'cloud-hosting',
    title: 'Cloud Hosting',
    description: 'Scalable cloud infrastructure and hosting solutions for your applications.',
    icon: '☁️'
  },
  {
    id: 'devops',
    title: 'DevOps',
    description: 'CI/CD pipelines, automation, and infrastructure management for seamless deployments.',
    icon: '⚙️'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User-centered design solutions that enhance user experience and engagement.',
    icon: '🎨'
  },
  {
    id: 'crm-development',
    title: 'CRM Development',
    description: 'Customer Relationship Management systems to streamline your sales and support processes.',
    icon: '👥'
  }
]

export default function SoftwareSolutionsPage() {
  const router = useRouter()

  const handleExplore = (serviceId: string) => {
    router.push(`/services/software-solutions/${serviceId}`)
  }

  return (
    <div className="min-h-screen">
      <SectionParticles particleCount={200} />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            Software Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Transform your business with cutting-edge software solutions tailored to your needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#services"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Services
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-4 rounded-xl border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-600 dark:hover:bg-primary-400 hover:text-white transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Software Services
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Comprehensive software solutions to drive your business forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 rounded-2xl shadow-xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {service.description}
                </p>
                <button
                  onClick={() => handleExplore(service.id)}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

