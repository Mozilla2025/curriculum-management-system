
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AuthMobileHeader } from './AuthMobileHeader'
import { AuthSubmitButton } from './AuthSubmitButton'
import { validateEmail } from '@/lib/auth/validation'

interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void
  onSubmit: (email: string) => Promise<void>
}

export function ForgotPasswordForm({ onSuccess, onSubmit }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) { setError('Please enter your email address'); return }
    if (!validateEmail(email)) { setError('Please enter a valid email address'); return }

    setIsLoading(true)
    try {
      await onSubmit(email.trim())
      onSuccess(email.trim())
    } catch (err: any) {
      setError(err?.message || 'Failed to send reset email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AuthMobileHeader />

      <h2 className="text-3xl font-bold text-must-blue font-display mb-3 text-center md:text-left">
        Reset Your Password
      </h2>
      <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>

      {error && (
        <div role="alert" className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
              placeholder="Enter your email address"
              required
              disabled={isLoading}
              autoComplete="email"
              className={cn(
                'w-full py-3 pl-10 pr-4 border-2 rounded-md text-base',
                'bg-white placeholder-gray-400 transition-all duration-150',
                'focus:outline-none focus:ring-[3px] focus:ring-must-green/15 focus:border-must-green',
                'disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60',
                error && !email.trim() ? 'border-red-400 bg-red-50' : 'border-gray-300'
              )}
            />
          </div>
        </div>

        <div className="mt-2">
          <AuthSubmitButton
            isLoading={isLoading}
            loadingText="Sending Reset Link..."
            icon={<Mail className="w-4 h-4" />}
          >
            Send Reset Link
          </AuthSubmitButton>
        </div>
      </form>

      <div className="mt-8 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
    </>
  )
}