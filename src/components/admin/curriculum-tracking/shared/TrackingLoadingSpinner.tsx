'use client'

export function TrackingLoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4" role="status" aria-live="polite">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-must-green rounded-full animate-spin" />
      <p className="text-sm font-medium text-gray-500">Loading curriculum tracking data...</p>
    </div>
  )
}
