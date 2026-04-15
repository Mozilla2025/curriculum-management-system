
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
import { authService } from '@/services/auth.service'
import type { ResetPasswordView } from '@/types/auth'


function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const email = searchParams.get('email') ?? ''

  const [view, setView] = useState<ResetPasswordView>('form')
  const [isValidating, setIsValidating] = useState(true)

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setView('invalid-token')
        setIsValidating(false)
        return
      }

      try {
        await authService.validatePasswordToken(token)
        setView('form')
      } catch (err) {
        setView('invalid-token')
      } finally {
        setIsValidating(false)
      }
    }

    validateToken()
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
      {isValidating && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-gray-500">Validating reset link...</div>
        </div>
      )}

      {!isValidating && view === 'invalid-token' && <InvalidTokenMessage />}

      {!isValidating && view === 'form' && (
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