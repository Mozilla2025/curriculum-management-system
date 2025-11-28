import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="bg-must-green text-white py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Image
            src="/images/logo.jpg"
            alt="MUST Logo"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div className="text-left">
            <h3 className="text-xl font-extrabold text-white">
              {siteConfig.name}
            </h3>
            <p className="text-sm font-semibold text-white/90">
              Curriculum Management System
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/95 max-w-xl mx-auto mb-8 leading-relaxed">
          Empowering academic excellence through innovative curriculum management 
          solutions at {siteConfig.institution}.
        </p>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6 mb-8">
          {siteConfig.footer.links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="relative px-4 py-2 text-white font-semibold text-sm rounded-lg
                hover:bg-white/10 hover:text-must-gold transition-all duration-300
                after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                after:w-0 after:h-0.5 after:bg-must-gold after:transition-all
                hover:after:w-4/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-white/80 text-sm">
            {siteConfig.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}