interface SettingsSectionProps {
  title: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  children: React.ReactNode
}

export function SettingsSection({
  title,
  icon: SectionIcon,
  gradient,
  children,
}: SettingsSectionProps) {
  return (
    <div
      className="bg-white rounded-2xl shadow-soft border border-gray-200 p-6
        hover:shadow-medium transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div
          className={`w-10 h-10 bg-gradient-to-br ${gradient} 
          rounded-xl flex items-center justify-center`}
        >
          <SectionIcon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>

      <div className="space-y-6">{children}</div>
    </div>
  )
}
