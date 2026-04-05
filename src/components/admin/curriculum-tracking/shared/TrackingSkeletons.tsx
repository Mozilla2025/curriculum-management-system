'use client'

export function TrackingHeaderSkeleton() {
  return (
    <div className="mb-6 space-y-4 animate-pulse">
      {/* Header Title Section */}
      <div>
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        <div className="h-10 bg-gray-200 rounded w-32" />
        <div className="h-10 bg-gray-200 rounded w-32" />
        <div className="h-10 bg-gray-200 rounded w-32" />
      </div>
    </div>
  )
}

export function TrackingStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200 shadow-soft p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
          </div>
          <div className="h-8 bg-gray-200 rounded w-16" />
        </div>
      ))}
    </div>
  )
}

export function TrackingFiltersSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft p-5 mb-6 animate-pulse">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="h-10 bg-gray-200 rounded w-48" />
        <div className="h-10 bg-gray-200 rounded w-48" />
        <div className="h-10 bg-gray-200 rounded w-40" />
      </div>
    </div>
  )
}

export function TrackingTableSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden animate-pulse">
      {/* Table Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex gap-4">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-4 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
      </div>

      {/* Table Rows */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="px-6 py-4 border-b border-gray-100 flex gap-4">
          <div className="h-4 bg-gray-100 rounded w-32" />
          <div className="h-4 bg-gray-100 rounded w-48" />
          <div className="h-4 bg-gray-100 rounded w-32" />
          <div className="h-4 bg-gray-100 rounded w-24" />
          <div className="h-4 bg-gray-100 rounded w-20" />
        </div>
      ))}
    </div>
  )
}

export function TrackingWorkflowSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-soft p-6">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((j) => (
              <div key={j} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function TrackingPageSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <TrackingHeaderSkeleton />
      <TrackingStatsSkeleton />
      <TrackingFiltersSkeleton />
      <TrackingTableSkeleton />
    </div>
  )
}
