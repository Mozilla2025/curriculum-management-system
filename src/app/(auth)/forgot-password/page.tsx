

'use client'

import { useState } from 'react'
import {
  AuthLayout,
  AuthBrandingPanel,
  ForgotPasswordForm,
  EmailSentSuccess,
} from '@/components/auth'
import {
  forgotPasswordBrandingContent,
  emailSentBrandingContent,
} from '@/config/auth'
import type { ForgotPasswordView } from '@/types/auth'

export default function ForgotPasswordPage() {
  const [view, setView] = useState<ForgotPasswordView>('form')
  const [submittedEmail, setSubmittedEmail] = useState('')

  
  const handleSubmit = async (email: string) => {
    await new Promise((res) => setTimeout(res, 1000))
    // API call goes here
  }

  const handleSuccess = (email: string) => {
    setSubmittedEmail(email)
    setView('email-sent')
  }

  const handleResend = async (email: string) => {
    await new Promise((res) => setTimeout(res, 1000))
  }

  const brandingProps =
    view === 'form'
      ? { title: forgotPasswordBrandingContent.title, description: forgotPasswordBrandingContent.description }
      : {
          title: emailSentBrandingContent.title,
          description: emailSentBrandingContent.description,
          nextSteps: emailSentBrandingContent.nextSteps.map((label) => ({ label })),
          nextStepsTitle: 'Next Steps',
        }

  return (
    <AuthLayout brandingPanel={<AuthBrandingPanel {...brandingProps} />}>
      {view === 'form' ? (
        <ForgotPasswordForm onSubmit={handleSubmit} onSuccess={handleSuccess} />
      ) : (
        <EmailSentSuccess
          email={submittedEmail}
          onBack={() => setView('form')}
          onResend={handleResend}
        />
      )}
    </AuthLayout>
  )
}