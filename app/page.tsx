'use client'

import { useEffect, Suspense } from 'react'
import { usePathname } from 'next/navigation'
import Hero from '@/components/Hero'
import AboutUs from '@/components/AboutUs'
import OurExpertise from '@/components/OurExpertise'
import Technologies from '@/components/Technologies'
import HowWeWork from '@/components/HowWeWork'
import PastProjects from '@/components/PastProjects'
import IndustriesWeServe from '@/components/IndustriesWeServe'
import Statistics from '@/components/Statistics'
import ContactUs from '@/components/ContactUs'

function HomeContent() {
  const pathname = usePathname()

  useEffect(() => {
    // Handle hash navigation when coming from other pages
    const hash = window.location.hash
    
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [pathname])

  return (
    <div className="min-h-screen">
      <Hero />
      <Statistics />
      <AboutUs />
      <OurExpertise />
      <Technologies />
      <HowWeWork />
      <PastProjects />
      <IndustriesWeServe />
      <ContactUs />
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
