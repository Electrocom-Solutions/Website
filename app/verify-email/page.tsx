'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import SectionParticles from '@/components/SectionParticles'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email') || ''
  const token = searchParams.get('token') || ''
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  // Handle verification when token is present (from email link)
  useEffect(() => {
    if (token && !isVerified && !isVerifying) {
      handleVerification(token)
    }
  }, [token])

  const handleVerification = async (verificationToken: string) => {
    setIsVerifying(true)
    setError('')

    // Simulate API call to verify the token
    await new Promise(resolve => setTimeout(resolve, 1500))

    // In a real app, you would verify the token with your backend
    // For now, we'll simulate successful verification
    // In production, you would make an API call like:
    // const response = await fetch(`/api/verify-email?token=${verificationToken}`)
    // if (response.ok) { setIsVerified(true) } else { setError('Invalid or expired token') }

    // Simulate verification (accept any token for demo purposes)
    if (verificationToken) {
      setIsVerified(true)
      // In a real app, you would update the user's verification status here
      console.log('Email verified for token:', verificationToken)
    } else {
      setError('Invalid or expired verification link. Please request a new one.')
    }

    setIsVerifying(false)
  }

  const handleResend = async () => {
    if (resendCooldown > 0) return
    
    setResendCooldown(60)
    setError('')
    // Simulate resend
    console.log('Resending verification email to:', email)
    // In a real app, you would call your API to resend the verification email
  }

  // Show verification success state
  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
        <SectionParticles particleCount={200} />
        
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                Email Verified!
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8">
                Your email has been successfully verified. You can now sign in to your account.
              </p>
            </div>

            <Link
              href="/login"
              className="inline-block w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Continue to Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Show verifying state (when token is present and being verified)
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
        <SectionParticles particleCount={200} />
        
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 text-center">
            <div className="mb-6">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400 mb-4"></div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                Verifying Email...
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                Please wait while we verify your email address.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show "check your email" message (default state after registration)
  return (
    <div className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      <SectionParticles particleCount={200} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 text-center">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">
                Electrocom
              </span>
            </Link>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-4">
              <svg className="w-10 h-10 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
              Check Your Email
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-2">
              We've sent a verification link to
            </p>
            <p className="text-base md:text-lg font-semibold text-primary-600 dark:text-primary-400 mb-6">
              {email || 'your email address'}
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-8">
              Please check your inbox and click on the verification link to verify your email address. If you don't see the email, check your spam folder.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
              <p className="text-sm md:text-base text-red-600 dark:text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Resend Email */}
          <div className="space-y-4">
            <div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2">
                Didn't receive the email?
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="text-sm md:text-base font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Verification Email'}
              </button>
            </div>

            {/* Back to Sign Up */}
            <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
              <Link
                href="/signup"
                className="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                ← Back to Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
