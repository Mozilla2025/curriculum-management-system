// src/components/user-dashboard/program-modal.tsx

'use client'

import { useEffect } from 'react'
import { X, FileText, Layers } from 'lucide-react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import type { Program } from '@/types/user-dashboard'

interface ProgramModalProps {
  isOpen: boolean
  onClose: () => void
  schoolName: string
  program: Program
}

const statusStyles = {
  approved: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  review: 'bg-blue-100 text-blue-800',
}

export function ProgramModal({ isOpen, onClose, schoolName, program }: ProgramModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div
          className={cn(
            'bg-white rounded-2xl shadow-strong max-w-3xl w-full',
            'max-h-[85vh] overflow-hidden flex flex-col',
            'animate-slide-up'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {program.name} Programs - {schoolName}
            </h3>
            <button
              onClick={onClose}
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                'bg-white border border-gray-200 text-gray-500',
                'hover:bg-gray-100 hover:text-gray-700 transition-colors'
              )}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {program.departments.map((dept) => (
              <div key={dept.id} className="mb-6 last:mb-0">
                {/* Department Header */}
                <div className="bg-must-green text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    <span className="font-bold">{dept.name}</span>
                  </div>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-bold">
                    {dept.curricula.length}
                  </span>
                </div>

                {/* Curricula List */}
                <div className="bg-gray-50 rounded-b-lg border border-gray-200 border-t-0 divide-y divide-gray-200">
                  {dept.curricula.map((curriculum) => (
                    <div
                      key={curriculum.id}
                      className="p-4 hover:bg-white transition-colors flex items-center gap-3"
                    >
                      <FileText className="w-4 h-4 text-must-gold flex-shrink-0" />
                      <span className="flex-1 text-gray-900 font-medium text-sm">
                        {curriculum.title}
                      </span>
                      <span
                        className={cn(
                          'px-3 py-1 rounded-full text-xs font-bold capitalize',
                          statusStyles[curriculum.status]
                        )}
                      >
                        {curriculum.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )

  return createPortal(modalContent, document.body)
}