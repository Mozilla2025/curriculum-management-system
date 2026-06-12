'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Lock, AlertCircle } from 'lucide-react'
import { useGetCurriculumById } from '@/hooks/api/curricula'
import {
  CurriculumDetailView,
  CurriculumDetailSkeleton,
} from '@/components/user/curricula/CurriculumDetailView'

function CurriculumDetailContent() {
  const { id } = useParams<{ id: string }>()
  const numericId = Number(id)

  const { data, isPending, error } = useGetCurriculumById(numericId)

  if (isPending && !data) return <CurriculumDetailSkeleton />

  if (error) {
    const status = (error as { response?: { status?: number } })?.response?.status
    const is401  = status === 401 || status === 403

    return (
      <div className="max-w-3xl space-y-6">
        <Link
          href="/user/curricula"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Curriculums
        </Link>

        {is401 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-amber-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Sign in to view details</h2>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              Full curriculum details are available to registered users. Please log in to continue.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-must-green text-white rounded-lg hover:bg-must-green-dark transition-colors"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7 text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Could not load curriculum</h2>
            <p className="text-sm text-gray-500 mb-6">
              Something went wrong. Please try again or go back to the list.
            </p>
            <Link
              href="/user/curricula"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-must-green text-white rounded-lg hover:bg-must-green-dark transition-colors"
            >
              Back to List
            </Link>
          </div>
        )}
      </div>
    )
  }

  if (!data) return null

  return <CurriculumDetailView curriculum={data} />
}

export default function CurriculumDetailPage() {
  return (
    <Suspense>
      <CurriculumDetailContent />
    </Suspense>
  )
}
