interface SettingsFooterProps {
  supportEmail: string
  version: string
  lastUpdated: string
}

export function SettingsFooter({
  supportEmail,
  version,
  lastUpdated,
}: SettingsFooterProps) {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-200 p-8 text-center">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
        If you need assistance with system settings or have questions about
        configuration, please contact our support team at{' '}
        <a
          href={`mailto:${supportEmail}`}
          className="text-must-green font-semibold hover:underline"
        >
          {supportEmail}
        </a>
      </p>
      <div className="pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          CurricFlow {version} • Last updated: {lastUpdated}
        </p>
      </div>
    </div>
  )
}
