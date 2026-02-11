
import Image from 'next/image'
import { authBranding } from '@/config/auth'

interface AuthBrandingPanelProps {
  title: string
  description: string
  /** Optional feature list rendered with checkmarks */
  features?: string[]
  /** Optional next-steps list (used on email-sent page) */
  nextSteps?: { label: string }[]
  featuresTitle?: string
  nextStepsTitle?: string
}

export function AuthBrandingPanel({
  title,
  description,
  features,
  nextSteps,
  featuresTitle = 'Key Features',
  nextStepsTitle = 'Next Steps',
}: AuthBrandingPanelProps) {
  return (
    <div className="hidden md:flex w-1/2 bg-must-green relative">
      {/* Overlay texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "url('/api/placeholder/800/600')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white w-full">
        {/* University header */}
        <div className="flex items-center mb-8">
          <div className="mr-4 flex-shrink-0">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden border-[3px] border-white/20">
              <Image
                src={authBranding.logoSrc}
                alt={authBranding.logoAlt}
                width={64}
                height={64}
                className="object-cover rounded-full"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold leading-tight font-display">
              {authBranding.universityName}
            </h1>
            <p className="text-base opacity-90">{authBranding.universitySubtitle}</p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-bold leading-tight mb-6 font-display">{title}</h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed font-medium">{description}</p>

          {/* Feature list */}
          {features && features.length > 0 && (
            <div className="bg-must-green-dark border border-white/30 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-extrabold mb-4 text-must-gold font-display">
                {featuresTitle}
              </h3>
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <li key={i} className="relative pl-6 opacity-90 text-sm">
                    <span className="absolute left-0 text-must-gold font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next steps list */}
          {nextSteps && nextSteps.length > 0 && (
            <div className="bg-must-green-dark border border-white/30 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg font-extrabold mb-4 text-must-gold font-display">
                {nextStepsTitle}
              </h3>
              <ul className="space-y-2">
                {nextSteps.map((step, i) => (
                  <li key={i} className="relative pl-6 opacity-90 text-sm">
                    <span className="absolute left-0 text-must-gold font-bold">✓</span>
                    {step.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}