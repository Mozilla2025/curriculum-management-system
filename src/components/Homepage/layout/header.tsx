'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, Gauge, Info, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { siteConfig } from '@/config/site'
import { useScroll, useMobile } from '@/hooks'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const { isScrolled, scrollY } = useScroll(100)
  const isMobile = useMobile()
  const router = useRouter()
  const pathname = usePathname()

  // Determine if header should have white section styling
  const isOnWhiteSection = scrollY > 500

  const handleDashboardClick = async () => {
    setIsNavigating(true)
    setIsMobileMenuOpen(false)
    await new Promise(r => setTimeout(r, 800))
    router.push(siteConfig.links.dashboard)
    setIsNavigating(false)
  }

  const handleAboutClick = () => {
    if (pathname === '/about') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setIsMobileMenuOpen(false)
    router.push(siteConfig.links.about)
  }

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isOnWhiteSection 
          ? 'bg-must-green border-b border-must-green-dark' 
          : 'bg-white border-b border-gray-200',
        isScrolled ? 'shadow-medium' : 'shadow-soft'
      )}
    >
      <div className="max-w-[1820px] mx-auto px-4 md:px-8 py-1 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo.jpg"
            alt="MUST Logo"
            width={70}
            height={70}
            className={cn(
              'rounded-full object-cover',
              isOnWhiteSection && 'bg-transparent'
            )}
          />
          <div>
            <h1 className={cn(
              'text-xl md:text-2xl font-extrabold transition-colors',
              isOnWhiteSection ? 'text-white' : 'text-must-green'
            )}>
              Curriculum Tracking System
            </h1>
            <p className={cn(
              'text-sm font-semibold transition-colors',
              isOnWhiteSection ? 'text-white/90' : 'text-gray-600'
            )}>
              {siteConfig.institution}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={handleAboutClick}
            className={cn(
              'px-4 py-2 rounded-lg font-bold text-sm transition-all',
              isOnWhiteSection 
                ? 'text-white hover:bg-white/20' 
                : 'text-gray-900 hover:bg-must-green-lighter hover:text-must-green-darker'
            )}
          >
            About
          </button>
          
          <Button 
            onClick={handleDashboardClick}
            isLoading={isNavigating}
            leftIcon={<Gauge className="w-5 h-5" />}
            className="bg-gradient-green text-white hover:shadow-green"
          >
            Access Dashboard
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            'md:hidden p-2 rounded-lg transition-colors',
            isOnWhiteSection ? 'text-white' : 'text-gray-900'
          )}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 md:hidden animate-slide-in-right">
            <div className="flex flex-col p-6 pt-20 gap-4">
              <button
                onClick={handleAboutClick}
                className="flex items-center gap-3 p-4 rounded-xl text-gray-900 font-semibold hover:bg-must-green-lighter transition-colors"
              >
                <Info size={20} />
                About
              </button>
              
              <button
                onClick={handleDashboardClick}
                disabled={isNavigating}
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-green text-white font-bold shadow-soft"
              >
                {isNavigating ? <Loader2 className="animate-spin" /> : <Gauge size={20} />}
                Access Dashboard
              </button>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}