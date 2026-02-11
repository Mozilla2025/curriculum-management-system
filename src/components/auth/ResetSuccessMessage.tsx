'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, LogIn } from 'lucide-react'
import { AuthMobileHeader } from './AuthMobileHeader'
import { AuthSubmitButton } from './AuthSubmitButton'

export function ResetSuccessMessage() {
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/login')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [router])

  const goToLogin = () => router.push('/login')

  return (
    <>
      <AuthMobileHeader />

      <div className="text-center">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-emerald-500 drop-shadow-sm" />
        </div>

        <h2 className="text-3xl font-bold text-must-blue font-display mb-4">
          Password Reset Successful
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Your password has been successfully reset. You can now login with your new password.
        </p>

        {/* Redirect countdown */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6">
          <p className="text-sm font-medium text-blue-700">
            You will be redirected to the login page in{' '}
            <span className="font-bold">{countdown}</span> seconds...
          </p>
        </div>

        <AuthSubmitButton
          type="button"
          onClick={goToLogin}
          icon={<LogIn className="w-4 h-4" />}
        >
          Go to Login
        </AuthSubmitButton>
      </div>
    </>
  )
}