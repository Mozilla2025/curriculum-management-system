import { AlertCircle } from 'lucide-react'

interface SettingItemProps {
  title: string
  description: string
  isWarning?: boolean
  icon?: React.ComponentType<{ className?: string }>
  isToggle: boolean
  isEnabled: boolean
  onToggle: () => void
}

export function SettingItem({
  title,
  description,
  isWarning = false,
  icon: Icon,
  isToggle,
  isEnabled,
  onToggle,
}: SettingItemProps) {
  return (
    <div
      className={`flex items-start justify-between gap-6 p-4 rounded-xl
        transition-colors ${
          isWarning ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'
        }`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          {Icon && (
            <Icon
              className={`w-4 h-4 ${
                isWarning ? 'text-red-600' : 'text-must-green'
              }`}
            />
          )}
          {isWarning && <AlertCircle className="w-4 h-4 text-red-600" />}
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>

      {isToggle && (
        <button
          onClick={onToggle}
          className={`relative w-14 h-7 rounded-full transition-colors flex-shrink-0 ${
            isEnabled ? 'bg-must-green' : 'bg-gray-300'
          }`}
          role="switch"
          aria-checked={isEnabled}
        >
          <div
            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full 
              shadow-md transition-transform ${
              isEnabled ? 'translate-x-7' : 'translate-x-0'
            }`}
          />
        </button>
      )}
    </div>
  )
}
