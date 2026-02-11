
import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `Sign In | ${siteConfig.name}`,
  },
  description: `Access the ${siteConfig.name} Curriculum Management System`,
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {

  return <>{children}</>
}