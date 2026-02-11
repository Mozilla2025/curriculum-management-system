
import Image from 'next/image'
import { authBranding } from '@/config/auth'

export function AuthMobileHeader() {
  return (
    <div className="flex items-center justify-center mb-8 md:hidden">
      <div className="mr-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden border-2 border-gray-200">
          <Image
            src={authBranding.logoSrc}
            alt={authBranding.logoAlt}
            width={48}
            height={48}
            className="object-cover rounded-full"
          />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold text-must-blue leading-tight font-display">
          {authBranding.universityName}
        </h1>
        <p className="text-sm text-gray-600">{authBranding.universitySubtitle}</p>
      </div>
    </div>
  )
}