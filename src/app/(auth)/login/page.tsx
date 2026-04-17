'use client'

import { useState } from 'react'
import {
  AuthLayout,
  AuthBrandingPanel,
  LoginForm,
} from '@/components/auth'
import { loginBrandingContent } from '@/config/auth'
import { useLogin } from '@/hooks/auth'
import type { LoginFormData } from '@/types/auth'

export default function LoginPage() {
  const { login, isLoading, error, retryLogin } = useLogin()
  const [lastFormData, setLastFormData] = useState<LoginFormData | null>(null)

  const handleLogin = async (data: LoginFormData) => {
    setLastFormData(data)
    await login(data)
  }

  const handleRetry = async () => {
    if (lastFormData) {
      await retryLogin(lastFormData)
    }
  }

  return (
    <AuthLayout
      brandingPanel={
        <AuthBrandingPanel
          title={loginBrandingContent.title}
          description={loginBrandingContent.description}
          features={loginBrandingContent.features}
        />
      }
    >
      <LoginForm 
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={error}
        onRetry={handleRetry}
      />
    </AuthLayout>
  )
}