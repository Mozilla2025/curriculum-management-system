'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AuthMobileHeader } from './AuthMobileHeader'
import { AuthErrorMessage } from './AuthErrorMessage'
import { PasswordInput } from './PasswordInput'
import { AuthSubmitButton } from './AuthSubmitButton'
import { authBranding } from '@/config/auth'
import type { LoginFormData } from '@/types/auth'

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all required fields')
      return
    }
    setIsLoading(true)
    setError('')
    try {
      await onSubmit(formData)
    } catch (err: any) {
      const msg = err?.message ?? ''
      if (msg.includes('credentials')) setError('Invalid username or password. Please try again.')
      else if (msg.includes('network') || msg.includes('fetch')) setError('Network error. Please check your connection.')
      else if (msg.includes('server')) setError('Server error. Please try again later.')
      else setError(msg || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AuthMobileHeader />

      <h2 className="text-4xl font-bold text-must-blue font-display mb-8 text-center md:text-left">
        Sign In
      </h2>

      <AuthErrorMessage message={error} />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {/* Username */}
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-base font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            disabled={isLoading}
            autoComplete="username"
            className={cn(
              'w-full py-3.5 px-5 border-2 rounded-md text-base',
              'bg-white placeholder-gray-400 transition-all duration-150',
              'focus:outline-none focus:ring-[3px] focus:ring-must-green/15 focus:border-must-green',
              'disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60',
              error && !formData.username.trim()
                ? 'border-red-400 bg-red-50'
                : 'border-gray-300'
            )}
          />
        </div>

        {/* Password */}
        <PasswordInput
          id="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          disabled={isLoading}
          autoComplete="current-password"
          hasError={!!(error && !formData.password.trim())}
        />

        {/* Options row */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={isLoading}
              className="w-4 h-4 accent-must-green"
            />
            <span className="text-base text-gray-700">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-base font-medium text-must-teal hover:text-must-teal-dark hover:underline transition-colors"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Submit */}
        <div className="mt-3">
          <AuthSubmitButton
            isLoading={isLoading}
            loadingText="Signing In..."
            icon={<LogIn className="w-5 h-5" />}
          >
            Sign In
          </AuthSubmitButton>
        </div>
      </form>

      {/* Help section */}
      <div className="mt-8">
        <div className="relative text-center mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <span className="relative bg-white px-4 text-base text-gray-500">Need Help?</span>
        </div>
        <p className="text-center text-base text-gray-600">
          Contact ICT support at{' '}
          <a href={`mailto:${authBranding.supportEmail}`} className="text-must-teal font-medium hover:underline">
            {authBranding.supportEmail}
          </a>{' '}
          or call{' '}
          <span className="text-must-teal font-medium">{authBranding.supportPhone}</span>
        </p>
      </div>

      {/* Info card */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-md px-5 py-4">
        <div className="flex items-center gap-2 text-base text-gray-600">
          <svg className="w-5 h-5 text-must-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>{authBranding.systemInfo}</span>
        </div>
      </div>
    </>
  )
}