'use client'

import React from 'react'
import type { SchoolWithStats } from '@/types/curricula'

interface SchoolCardProps {
  school: SchoolWithStats
  onClick: (schoolId: string | number) => void
}

export function SchoolCard({ school, onClick }: SchoolCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter((w) => w.length > 2)
      .slice(0, 3)
      .map((w) => w[0].toUpperCase())
      .join('')
  }

  const total = school.stats.total
  const approved = school.stats.statusStats.approved ?? 0
  const pending = school.stats.statusStats.pending ?? 0
  const rejected = school.stats.statusStats.rejected ?? 0
  const approvedPct = total > 0 ? Math.round((approved / total) * 100) : 0

  return (
    <div
      className="group bg-white border border-gray-200 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-[#00BF63] hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
      onClick={() => onClick(school.id)}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00D666] via-[#00BF63] to-[#00a855] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#00BF63]/20 to-[#00BF63]/10 flex items-center justify-center border border-[#00BF63]/30">
          <span className="text-[#00BF63] font-bold text-sm">
            {getInitials(school.name)}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-[#00BF63] transition-colors line-clamp-2">
            {school.name}
          </h3>
          {school.code && (
            <span className="text-xs text-gray-400 font-mono mt-0.5 block">{school.code}</span>
          )}
          <div className="text-sm text-gray-500 mt-1">
            {school.stats.programs} program{school.stats.programs !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="flex-shrink-0 text-right">
          <div className="text-2xl font-extrabold text-gray-900">{total}</div>
          <div className="text-xs text-gray-400">curricula</div>
        </div>
      </div>

      {total > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Approved</span>
            <span className="font-semibold">{approvedPct}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00D666] to-[#00BF63] rounded-full transition-all duration-700"
              style={{ width: `${approvedPct}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap mb-4">
        {approved > 0 && (
          <span className="flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-[#00BF63]/10 text-[#00BF63] border border-[#00BF63]/20">
            <i className="fas fa-check-circle text-[0.6rem]" />
            {approved} approved
          </span>
        )}
        {pending > 0 && (
          <span className="flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-[#f0b41c]/10 text-[#d4940f] border border-[#f0b41c]/20">
            <i className="fas fa-clock text-[0.6rem]" />
            {pending} pending
          </span>
        )}
        {rejected > 0 && (
          <span className="flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-600 border border-red-100">
            <i className="fas fa-times-circle text-[0.6rem]" />
            {rejected} rejected
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">Click to explore programs</span>
        <div className="flex items-center gap-1 text-[#00BF63] text-xs font-semibold">
          View Programs
          <i className="fas fa-chevron-right text-[0.6rem] transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  )
}