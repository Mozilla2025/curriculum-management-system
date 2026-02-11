'use client'

import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import { AuthSubmitButton } from './AuthSubmitButton'

export function InvalidTokenMessage() {
  const router = useRouter()

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg max-w-sm mx-auto text-center">
      {/* Icon */}
      <div className="w-16 h-16 bg-red-50 border-2 border-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 font-display mb-3">
        Invalid or Expired Link
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        The password reset link is invalid or has expired. Please request a new password reset link.
      </p>

      <AuthSubmitButton
        type="button"
        onClick={() => router.push('/forgot-password')}
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        Request New Link
      </AuthSubmitButton>
    </div>
  )
}