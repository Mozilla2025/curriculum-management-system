export const siteConfig = {
  name: 'CurricFlow',
  description: 'Curriculum Management System for Meru University of Science & Technology',
  institution: 'Meru University of Science & Technology',
  shortName: 'MUST',
  
  links: {
    dashboard: '/user/dashboard',
    adminDashboard: '/admin/dashboard',
    about: '/about',
    login: '/login',
    adminLogin: '/admin/login',
  },
  
  footer: {
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Support', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Help Center', href: '#' },
    ],
    copyright: `© ${new Date().getFullYear()} Meru University of Science & Technology. All rights reserved.`,
  },
  
  social: {
    twitter: 'https://twitter.com/must',
    facebook: 'https://facebook.com/must',
    linkedin: 'https://linkedin.com/company/must',
  },
} as const

export type SiteConfig = typeof siteConfig