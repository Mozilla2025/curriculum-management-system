interface SettingsHeaderProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export function SettingsHeader({ title, description, icon: Icon }: SettingsHeaderProps) {
  return (
    <div className="text-center bg-white rounded-2xl shadow-soft border border-gray-200 p-8">
      <div className="w-16 h-16 bg-gradient-to-br from-must-green to-must-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
