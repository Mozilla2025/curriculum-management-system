
'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, ArrowLeft, AlertCircle, Mail } from 'lucide-react'
import { AuthMobileHeader } from './AuthMobileHeader'
import { AuthSubmitButton } from './AuthSubmitButton'

interface EmailSentSuccessProps {
  email: string
  onBack: () => void
  onResend: (email: string) => Promise<void>
}

export function EmailSentSuccess({ email, onBack, onResend }: EmailSentSuccessProps) {
  const [canResend, setCanResend] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const [resendError, setResendError] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); setCanResend(true); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleResend = async () => {
    if (!canResend) return
    setResendError('')
    setIsResending(true)
    try {
      await onResend(email)
      setCanResend(false)
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) { clearInterval(timer); setCanResend(true); return 0 }
          return prev - 1
        })
      }, 1000)
    } catch (err: any) {
      setResendError(err?.message || 'Failed to resend email. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <>
      <AuthMobileHeader />

      <div className="text-center">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-emerald-500 drop-shadow-sm" />
        </div>

        <h2 className="text-3xl font-bold text-must-blue font-display mb-4">
          Check Your Email
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          We&apos;ve sent a password reset link to{' '}
          <strong className="text-gray-800">{email}</strong>. Please check your inbox
          and follow the instructions to reset your password.
        </p>

        {/* Instructions card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 text-left">
          <h4 className="font-semibold text-gray-700 text-sm mb-3">Didn&apos;t receive the email?</h4>
          <ul className="list-disc pl-4 space-y-1.5 text-sm text-gray-600">
            <li>Check your spam or junk folder</li>
            <li>Make sure you entered the correct email address</li>
            <li>Wait a few minutes for the email to arrive</li>
            <li>Ensure the email account exists in our system</li>
          </ul>
        </div>

        {/* Resend error */}
        {resendError && (
          <div role="alert" className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 text-sm text-left">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{resendError}</span>
          </div>
        )}

        {/* Resend section */}
        <div className="mb-6">
          {countdown > 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-500">
              You can request another email in{' '}
              <span className="font-semibold text-gray-700">{countdown}</span> seconds
            </div>
          ) : (
            <AuthSubmitButton
              type="button"
              onClick={handleResend}
              isLoading={isResending}
              loadingText="Sending..."
              icon={<Mail className="w-4 h-4" />}
              className="bg-white !text-gray-700 border border-gray-300 hover:bg-gray-50 hover:!bg-gray-50 shadow-none"
            >
              Resend Email
            </AuthSubmitButton>
          )}
        </div>

        {/* Back link */}
        <div className="mt-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors px-2 py-1 rounded"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to forgot password
          </button>
        </div>
      </div>
    </>
  )
}