'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { useGetTrackingById } from '@/hooks/api/tracking'
import { adaptTrackingDetail } from '@/lib/tracking/utils'
import { TrackingDetailClient } from './TrackingDetailClient'

function TrackingDetailSkeleton() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded-lg" />
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 space-y-3">
          <div className="h-7 bg-gray-200 rounded-lg w-3/4" />
          <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
        </div>
        <div className="px-6 py-3 border-b border-gray-100">
          <div className="h-9 bg-gray-100 rounded-lg w-1/3" />
        </div>
        <div className="border-b border-gray-200">
          <div className="flex gap-2 px-6 py-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 w-28 bg-gray-100 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gray-100 rounded-xl w-full" />
        </div>
      </div>
    </div>
  )
}

export function TrackingDetailPageClient() {
  const { id } = useParams<{ id: string }>()
  const numericId = Number(id)

  const { data, isPending, error } = useGetTrackingById(numericId)

  if (isPending && !data) return <TrackingDetailSkeleton />

  if (error || !data) {
    return (
      <div className="p-6 space-y-4">
        <Link
          href="/admin/admin-curriculum-tracking"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Track Progress
        </Link>
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
          <i className="fas fa-exclamation-circle text-4xl text-gray-300 mb-4 block" aria-hidden="true" />
          <p className="text-base font-semibold text-gray-700">Tracking record not found</p>
          <p className="text-sm text-gray-400 mt-1">
            This record may have been removed or does not exist.
          </p>
          <Link
            href="/admin/admin-curriculum-tracking"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm font-semibold text-white bg-must-green rounded-lg hover:bg-must-green-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to list
          </Link>
        </div>
      </div>
    )
  }

  return <TrackingDetailClient curriculum={adaptTrackingDetail(data)} />
}
