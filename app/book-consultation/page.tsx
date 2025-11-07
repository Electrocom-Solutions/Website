'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SectionParticles from '@/components/SectionParticles'
import { useAuth } from '@/contexts/AuthContext'

// Custom Dropdown Component
interface CustomDropdownProps {
  id: string
  name: string
  value: string
  options: string[]
  placeholder: string
  onChange: (value: string) => void
  filterFn?: (option: string) => boolean
  required?: boolean
}

function CustomDropdown({ id, name, value, options, placeholder, onChange, filterFn, required }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  const filteredOptions = filterFn ? options.filter(filterFn) : options

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (option: string) => {
    onChange(option)
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (isOpen && highlightedIndex >= 0) {
        handleSelect(filteredOptions[highlightedIndex])
      } else {
        setIsOpen(!isOpen)
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setHighlightedIndex(-1)
      buttonRef.current?.focus()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else {
        setHighlightedIndex(prev => {
          const newIndex = prev < filteredOptions.length - 1 ? prev + 1 : prev
          // Scroll into view
          setTimeout(() => {
            itemRefs.current[newIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
          }, 0)
          return newIndex
        })
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (isOpen) {
        setHighlightedIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : -1
          // Scroll into view
          if (newIndex >= 0) {
            setTimeout(() => {
              itemRefs.current[newIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
            }, 0)
          }
          return newIndex
        })
      }
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        ref={buttonRef}
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-left flex items-center justify-between"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-required={required}
      >
        <span className={value ? '' : 'text-gray-500 dark:text-gray-400'}>
          {value || placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl max-h-60 overflow-auto">
          <ul
            ref={listRef}
            role="listbox"
            className="py-2"
            aria-label={placeholder}
          >
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                No options available
              </li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option}
                  ref={(el) => { itemRefs.current[index] = el }}
                  role="option"
                  aria-selected={value === option}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    value === option
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : highlightedIndex === index
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {value === option && (
                      <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleTimeChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    // Show success message and redirect
    router.push('/?consultation=success')
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

      <div className="relative max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
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

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
              <p className="text-sm md:text-base text-red-600 dark:text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Time Selection Section */}
            <div className="space-y-8 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary-50/50 to-purple-50/50 dark:from-gray-900/50 dark:to-gray-800/50 border-2 border-primary-200/50 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 shadow-sm">
                  <svg className="w-7 h-7 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Select Your Preferred Time
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    Choose a date and time slot that works best for you
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="space-y-3">
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-900 dark:text-white">
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
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-base"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Available from today onwards
                  </p>
                </div>

                <div className="space-y-3">
                  <label htmlFor="startTime" className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input type="hidden" name="startTime" value={formData.startTime} required />
                  <CustomDropdown
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    options={timeSlots}
                    placeholder="Choose start time"
                    onChange={(value) => handleTimeChange('startTime', value)}
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Business hours: 9:00 AM - 6:00 PM
                  </p>
                </div>

                <div className="space-y-3">
                  <label htmlFor="endTime" className="block text-sm font-semibold text-gray-900 dark:text-white">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input type="hidden" name="endTime" value={formData.endTime} required />
                  <CustomDropdown
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    options={timeSlots}
                    placeholder="Choose end time"
                    onChange={(value) => handleTimeChange('endTime', value)}
                    filterFn={(time) => !formData.startTime || time > formData.startTime}
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Must be after start time
                  </p>
                </div>
              </div>
            </div>

            {/* Information Section */}
            <div className="space-y-8 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50/50 dark:from-gray-900/50 dark:to-gray-800/50 border-2 border-gray-200/50 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 shadow-sm">
                  <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Your Information
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    Please provide your details for the consultation
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-base"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-base"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="organization" className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Organization / Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  required
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-base"
                  placeholder="ABC Corporation"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="consultationTopic" className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Consultation Topic <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="consultationTopic"
                  name="consultationTopic"
                  required
                  value={formData.consultationTopic}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-base"
                  placeholder="e.g., Software Development, Network Setup, etc."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">Briefly describe what you'd like to discuss</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="detailedDescription" className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="detailedDescription"
                  name="detailedDescription"
                  required
                  rows={6}
                  value={formData.detailedDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none resize-none text-base"
                  placeholder="Please provide details about what you'd like to discuss during the consultation..."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">Provide as much detail as possible to help us prepare for your consultation</p>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Booking Consultation...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Book Consultation</span>
                  </>
                )}
              </button>
            </div>
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

