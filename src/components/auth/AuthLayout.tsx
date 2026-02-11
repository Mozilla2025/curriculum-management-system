
interface AuthLayoutProps {
  brandingPanel: React.ReactNode
  children: React.ReactNode
}

export function AuthLayout({ brandingPanel, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-gray-100">
      <div className="flex w-full max-w-6xl min-h-[600px] shadow-xl rounded-xl overflow-hidden bg-white">
        {/* Left — branding */}
        {brandingPanel}

        {/* Right — form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}