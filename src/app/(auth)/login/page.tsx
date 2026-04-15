
'use client'

import {
  AuthLayout,
  AuthBrandingPanel,
  LoginForm,
} from '@/components/auth'
import { loginBrandingContent } from '@/config/auth'
import { useLogin } from '@/hooks/useLogin'
import type { LoginFormData } from '@/types/auth'

export default function LoginPage() {
  const { login, isLoading, error } = useLogin()

  const handleLogin = async (data: LoginFormData) => {
    await login(data)
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
      />
    </AuthLayout>
  )
}