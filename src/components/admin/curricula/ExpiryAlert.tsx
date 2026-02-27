'use client'

interface ExpiryAlertProps {
  count: number
  onView: () => void
  onDismiss: () => void
}

export function ExpiryAlert({ count, onView, onDismiss }: ExpiryAlertProps) {
  return (
    <div
      role="alert"
      className="flex items-center justify-between gap-4 rounded-lg border border-amber-300 bg-amber-50/80 px-4 py-3 mb-4"
    >
      <div className="flex items-center gap-3">
        <i className="fas fa-clock text-amber-600 text-xl" aria-hidden="true" />
        <div>
          <strong className="text-amber-900 text-sm font-semibold">
            {count} Curricula Expiring Soon
          </strong>
          <p className="text-amber-700 text-xs mt-0.5">
            Some curricula are approaching their expiry dates and may need attention.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onView}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-amber-200/60 border border-amber-400 text-amber-900 hover:bg-amber-200 transition-colors"
        >
          <i className="fas fa-eye" aria-hidden="true" />
          View Details
        </button>
        <button
          onClick={onDismiss}
          className="p-1.5 text-amber-600 hover:text-amber-800 transition-colors"
          aria-label="Dismiss alert"
        >
          <i className="fas fa-times" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}