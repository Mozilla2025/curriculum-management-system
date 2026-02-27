'use client'

import React from 'react'
import type { ProgramWithStats } from '@/types/curricula'

interface ProgramCardProps {
  program: ProgramWithStats
  schoolId: string | number
  onProgramClick: (schoolId: string | number, programId: string) => void
}

export function ProgramCard({ program, schoolId, onProgramClick }: ProgramCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:border-[#00BF63] hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00D666] via-[#00BF63] to-[#00a855] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="flex justify-between items-center mb-2" onClick={() => onProgramClick(schoolId, program.id)}>
        <span className="font-semibold text-gray-900 text-[0.95rem] flex-1 max-w-[70%] overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-[#00BF63] transition-colors">
          {program.name}
        </span>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[0.7rem] text-gray-500 font-medium">Curricula</span>
          <div className="flex items-center gap-2">
            <span className="bg-[#f0b41c] text-white px-3 py-0.5 rounded-xl text-xs font-bold">
              {program.count}
            </span>
            <i className="fas fa-chevron-right text-[#00BF63] text-sm transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-2 cursor-pointer" onClick={() => onProgramClick(schoolId, program.id)}>
        {program.enhancedDepartments?.length ?? 0} departments • {program.count} curricula
        <div className="text-xs text-[#00BF63] mt-0.5 font-medium">
          <i className="fas fa-mouse-pointer mr-1" />
          Click to view curricula
        </div>
      </div>

      <div className="flex gap-1 flex-wrap my-2">
        {program.statusStats.approved > 0 && (
          <span title={`${program.statusStats.approved} approved`} className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[0.6rem] font-bold rounded-xl bg-[#00BF63] text-white">
            {program.statusStats.approved}
          </span>
        )}
        {program.statusStats.pending > 0 && (
          <span title={`${program.statusStats.pending} pending`} className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[0.6rem] font-bold rounded-xl bg-[#f0b41c] text-white">
            {program.statusStats.pending}
          </span>
        )}
        {program.statusStats.draft > 0 && (
          <span title={`${program.statusStats.draft} draft`} className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[0.6rem] font-bold rounded-xl bg-gray-500 text-white">
            {program.statusStats.draft}
          </span>
        )}
        {program.statusStats.rejected > 0 && (
          <span title={`${program.statusStats.rejected} rejected`} className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-[0.6rem] font-bold rounded-xl bg-red-500 text-white">
            {program.statusStats.rejected}
          </span>
        )}
      </div>

      {program.enhancedDepartments && program.enhancedDepartments.length > 0 && (
        <div className="mt-3 p-3 bg-gray-50 rounded-md text-xs overflow-hidden">
          <div className="flex justify-between font-semibold text-gray-800 mb-2">
            <span>Departments</span>
            <span>Curricula</span>
          </div>
          <div className="flex flex-col gap-1">
            {program.enhancedDepartments.map((dept, idx) => (
              <div key={dept.id || idx} className="flex justify-between items-center text-gray-500">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-2">{dept.name}</span>
                <span className="text-xs text-gray-400 font-medium flex-shrink-0">{dept.curriculumCount}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        onClick={() => onProgramClick(schoolId, program.id)}
        className="mt-3 p-3 bg-gradient-to-r from-[#00BF63]/10 to-[#00BF63]/5 rounded-md border border-[#00BF63]/20 cursor-pointer hover:from-[#00BF63]/15 hover:to-[#00BF63]/8 hover:-translate-y-px transition-all"
      >
        <div className="flex items-center justify-center gap-2 text-[#00BF63] font-semibold text-sm">
          <i className="fas fa-table" />
          <span>View Curricula Table</span>
          <i className="fas fa-arrow-right" />
        </div>
      </div>
    </div>
  )
}