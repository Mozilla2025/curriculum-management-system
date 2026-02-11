
'use client'

import { useRouter } from 'next/navigation'
import {
  AuthLayout,
  AuthBrandingPanel,
  LoginForm,
} from '@/components/auth'
import { loginBrandingContent } from '@/config/auth'
import { siteConfig } from '@/config/site'
import type { LoginFormData } from '@/types/auth'

export default function LoginPage() {
  const router = useRouter()

  
  const handleLogin = async (data: LoginFormData) => {
   
    await new Promise((res) => setTimeout(res, 1000))
    router.push(siteConfig.links.dashboard)
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
      <LoginForm onSubmit={handleLogin} />
    </AuthLayout>
  )
}