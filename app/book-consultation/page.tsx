'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SectionParticles from '@/components/SectionParticles'
import { useAuth } from '@/contexts/AuthContext'

export default function BookConsultationPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phoneNumber: '',
    organization: '',
    consultationTopic: '',
    detailedDescription: '',
    date: '',
    startTime: '',
    endTime: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    // Pre-fill name if user is logged in
    if (user?.name) {
      setFormData(prev => ({ ...prev, fullName: user.name }))
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Validation
    if (!formData.fullName || !formData.phoneNumber || !formData.organization || 
        !formData.consultationTopic || !formData.detailedDescription || 
        !formData.date || !formData.startTime || !formData.endTime) {
      setError('Please fill in all fields')
      setIsSubmitting(false)
      return
    }

    // Validate time range
    if (formData.startTime >= formData.endTime) {
      setError('End time must be after start time')
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Simulate successful booking
    console.log('Consultation booking:', formData)
    
    setIsSubmitting(false)
    alert('Your consultation has been booked successfully! We will contact you soon to confirm.')
    router.push('/')
  }

  // Generate time slots (9 AM to 6 PM)
  const timeSlots = []
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      timeSlots.push(timeString)
    }
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      <SectionParticles particleCount={200} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">
                Electrocom
              </span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
              Book Free Consultation
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              Schedule your free consultation with our experts
            </p>
          </div>

          {/* Free Consultation Note */}
          <div className="mb-8 p-6 rounded-xl bg-primary-50 dark:bg-primary-900/30 border-2 border-primary-200 dark:border-primary-800">
            <p className="text-sm md:text-base text-primary-800 dark:text-primary-200 text-center">
              <span className="font-semibold">Free Consultation:</span> Up to 60 minutes are completely free. For longer sessions, payment will be discussed during the meeting.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
              <p className="text-sm md:text-base text-red-600 dark:text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Time Selection Section */}
            <div className="space-y-6 p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Select Your Preferred Time
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Select Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="startTime" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Select Start Time <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="startTime"
                    name="startTime"
                    required
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                  >
                    <option value="">Choose start time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="endTime" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Select End Time <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="endTime"
                    name="endTime"
                    required
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                  >
                    <option value="">Choose end time</option>
                    {timeSlots
                      .filter((time) => !formData.startTime || time > formData.startTime)
                      .map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Information Section */}
            <div className="space-y-6 p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Information
              </h2>

              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Organization / Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  required
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                  placeholder="ABC Corporation"
                />
              </div>

              <div>
                <label htmlFor="consultationTopic" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Consultation Topic <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="consultationTopic"
                  name="consultationTopic"
                  required
                  value={formData.consultationTopic}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                  placeholder="e.g., Software Development, Network Setup, etc."
                />
              </div>

              <div>
                <label htmlFor="detailedDescription" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="detailedDescription"
                  name="detailedDescription"
                  required
                  rows={5}
                  value={formData.detailedDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none resize-none"
                  placeholder="Please provide details about what you'd like to discuss during the consultation..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Booking Consultation...' : 'Book Consultation'}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-sm md:text-base font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

