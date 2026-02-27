'use client'

import React, { useState, useEffect } from 'react'
import type { Curriculum, School, Program } from '@/types/curricula'

interface CurriculumModalProps {
  isOpen: boolean
  isEdit: boolean
  curriculum: Curriculum | null
  schools: School[]
  programs: Program[]
  isSaving: boolean
  onSave: (data: Partial<Curriculum>) => void
  onClose: () => void
}

const EMPTY_FORM: Partial<Curriculum> = {
  title: '',
  schoolId: '',
  programId: '',
  department: '',
  code: '',
  status: 'draft',
}

export function CurriculumModal({
  isOpen,
  isEdit,
  curriculum,
  schools,
  programs,
  isSaving,
  onSave,
  onClose,
}: CurriculumModalProps) {
  const [form, setForm] = useState<Partial<Curriculum>>(EMPTY_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      setErrors({})
      if (isEdit && curriculum) {
        setForm({
          title: curriculum.title || '',
          schoolId: curriculum.schoolId || '',
          programId: curriculum.programId || '',
          department: curriculum.department || '',
          code: curriculum.code || '',
          status: curriculum.status || 'draft',
        })
      } else {
        setForm(EMPTY_FORM)
      }
    }
  }, [isOpen, isEdit, curriculum])

  const filteredPrograms = programs

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!form.title?.trim()) newErrors.title = 'Title is required'
    if (!form.schoolId) newErrors.schoolId = 'School is required'
    if (!form.programId) newErrors.programId = 'Program is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) onSave(form)
  }

  const handleChange = (field: keyof Curriculum, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-[fadeIn_0.15s_ease]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col animate-[scaleIn_0.15s_ease] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#00D666]/5 to-transparent">
          <h2 id="modal-title" className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <i className={`fas ${isEdit ? 'fa-edit' : 'fa-plus'} text-[#00BF63]`} />
            {isEdit ? 'Edit Curriculum' : 'Add New Curriculum'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <i className="fas fa-times" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Curriculum Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g. Bachelor of Science in Computer Science"
              className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BF63]/20 focus:border-[#00BF63] transition-colors ${
                errors.title ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
              }`}
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                School <span className="text-red-500">*</span>
              </label>
              <select
                value={form.schoolId || ''}
                onChange={(e) => {
                  handleChange('schoolId', e.target.value)
                  handleChange('programId', '')
                }}
                className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BF63]/20 focus:border-[#00BF63] transition-colors bg-white ${
                  errors.schoolId ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select a school</option>
                {schools.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              {errors.schoolId && <p className="mt-1 text-xs text-red-500">{errors.schoolId}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Program <span className="text-red-500">*</span>
              </label>
              <select
                value={form.programId || ''}
                onChange={(e) => handleChange('programId', e.target.value)}
                disabled={!form.schoolId && programs.length > 0}
                className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BF63]/20 focus:border-[#00BF63] transition-colors bg-white disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.programId ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select a program</option>
                {filteredPrograms.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {errors.programId && <p className="mt-1 text-xs text-red-500">{errors.programId}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Department</label>
              <input
                type="text"
                value={form.department || ''}
                onChange={(e) => handleChange('department', e.target.value)}
                placeholder="e.g. Computer Science"
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BF63]/20 focus:border-[#00BF63] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Curriculum Code</label>
              <input
                type="text"
                value={form.code || ''}
                onChange={(e) => handleChange('code', e.target.value)}
                placeholder="e.g. BSCS-2024"
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BF63]/20 focus:border-[#00BF63] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
            <select
              value={form.status || 'draft'}
              onChange={(e) => handleChange('status', e.target.value as Curriculum['status'])}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BF63]/20 focus:border-[#00BF63] transition-colors bg-white"
            >
              <option value="draft">Draft</option>
              <option value="pending">Pending Review</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </form>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50/80">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 py-2.5 px-4 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:-translate-y-px hover:shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSaving}
            className="flex-1 py-2.5 px-4 text-sm font-semibold text-white bg-gradient-to-r from-[#00D666] via-[#00BF63] to-[#00a855] rounded-xl hover:-translate-y-px hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fas fa-circle-notch animate-spin" />
                {isEdit ? 'Saving...' : 'Creating...'}
              </span>
            ) : (
              isEdit ? 'Save Changes' : 'Create Curriculum'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}