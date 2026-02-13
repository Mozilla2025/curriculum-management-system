
'use client'

import { useRouter } from 'next/navigation'
import {
  AuthLayout,
  AuthBrandingPanel,
  LoginForm,
} from '@/components/auth'
import { loginBrandingContent } from '@/config/auth'
import { siteConfig } from '@/config/site'
import { setAuthToken, setUserRole, setUserData, USER_ROLES } from '@/lib/auth'
import type { LoginFormData } from '@/types/auth'

export default function LoginPage() {
  const router = useRouter()

  
  const handleLogin = async (data: LoginFormData) => {
    // Simulate authentication
    await new Promise((res) => setTimeout(res, 1000))
    
    // Mock user data 
    const mockToken = 'mock_auth_token_' + Date.now()
    
    // Store auth data
    setAuthToken(mockToken)
    setUserRole(USER_ROLES.ADMIN)
    setUserData({
      id: '1',
      username: data.username,
      email: data.username + '@must.ac.ke',
      firstName: 'User',
      lastName: 'Account',
      role: USER_ROLES.ADMIN,
    })
    
    // Redirect to admin dashboard
    router.push(siteConfig.links.adminDashboard)
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