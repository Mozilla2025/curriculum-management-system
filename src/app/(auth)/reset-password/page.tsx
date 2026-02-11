
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  AuthLayout,
  AuthBrandingPanel,
  ResetPasswordForm,
  ResetSuccessMessage,
  InvalidTokenMessage,
} from '@/components/auth'
import {
  resetPasswordBrandingContent,
  resetSuccessBrandingContent,
} from '@/config/auth'
import type { ResetPasswordView } from '@/types/auth'


function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const email = searchParams.get('email') ?? ''

  const [view, setView] = useState<ResetPasswordView>('form')

  // Validate token presence on mount
  useEffect(() => {
    if (!token) setView('invalid-token')
  }, [token])

 
  const handleSubmit = async (token: string, newPassword: string) => {
    await new Promise((res) => setTimeout(res, 1000))
    
  }

  const brandingProps =
    view === 'success'
      ? { title: resetSuccessBrandingContent.title, description: resetSuccessBrandingContent.description }
      : { title: resetPasswordBrandingContent.title, description: resetPasswordBrandingContent.description }

  return (
    <AuthLayout brandingPanel={<AuthBrandingPanel {...brandingProps} />}>
      {view === 'invalid-token' && <InvalidTokenMessage />}

      {view === 'form' && (
        <ResetPasswordForm
          token={token}
          email={email}
          onSuccess={() => setView('success')}
          onSubmit={handleSubmit}
        />
      )}

      {view === 'success' && <ResetSuccessMessage />}
    </AuthLayout>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500 text-sm">Loading...</div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  )
}