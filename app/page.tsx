'use client'

import { useEffect, useState, Suspense } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Hero from '@/components/Hero'
import AboutUs from '@/components/AboutUs'
import OurExpertise from '@/components/OurExpertise'
import Technologies from '@/components/Technologies'
import HowWeWork from '@/components/HowWeWork'
import PastProjects from '@/components/PastProjects'
import IndustriesWeServe from '@/components/IndustriesWeServe'
import Statistics from '@/components/Statistics'
import ClientSlider from '@/components/ClientSlider'
import ContactUs from '@/components/ContactUs'

function HomeContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)

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

  useEffect(() => {
    // Check for consultation success parameter
    const consultation = searchParams.get('consultation')
    if (consultation === 'success') {
      setShowSuccess(true)
      // Remove query parameter from URL
      router.replace('/', { scroll: false })
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 duration-300">
          <div className="backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 p-6 rounded-2xl shadow-2xl border-2 border-green-200 dark:border-green-800 max-w-md">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Consultation Booked Successfully!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We've received your consultation request. Our team will contact you soon to confirm the details.
                </p>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Close notification"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <Hero />
      <Statistics />
      <ClientSlider />
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
