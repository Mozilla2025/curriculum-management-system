'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { CurriculumTracking } from '@/types/tracking'

interface School { id: string | number; name: string }
interface Department { id: string | number; name: string }

export interface EditFormData {
  schoolId: string; departmentId: string; academicLevel: string
  proposedDurationSemesters: string; proposedCurriculumName: string
  proposedCurriculumCode: string; curriculumDescription: string
  proposedEffectiveDate: string; proposedExpiryDate: string; notes: string
}

interface Props {
  curriculum: CurriculumTracking
  onClose: () => void
  onUpdate: (id: string | number, data: EditFormData, documents: File[]) => Promise<void>
  schools?: School[]
  departments?: Department[]
}

const inputCls = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10 bg-white transition-colors'
const labelCls = 'block text-xs font-semibold text-gray-700 mb-1.5'
const LEVELS   = ['Certificate', 'Diploma', 'Bachelor', 'Postgraduate Diploma', 'Masters', 'PhD']

export function EditTrackingModal({ curriculum, onClose, onUpdate, schools = [], departments = [] }: Props) {
  const [form, setForm]   = useState<EditFormData>({
    schoolId: String(curriculum.schoolId ?? ''),
    departmentId: String(curriculum.departmentId ?? ''),
    academicLevel: curriculum.academicLevel ?? '',
    proposedDurationSemesters: String(curriculum.proposedDurationSemesters ?? ''),
    proposedCurriculumName: curriculum.proposedCurriculumName ?? curriculum.title ?? '',
    proposedCurriculumCode: curriculum.proposedCurriculumCode ?? curriculum.displayCode ?? '',
    curriculumDescription: curriculum.curriculumDescription ?? '',
    proposedEffectiveDate: curriculum.proposedEffectiveDate ?? '',
    proposedExpiryDate: curriculum.proposedExpiryDate ?? '',
    notes: '',
  })
  const [files, setFiles] = useState<File[]>([])
  const [saving, setSave] = useState(false)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  const set = (k: keyof EditFormData, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.proposedCurriculumName) return
    setSave(true)
    try { await onUpdate(curriculum.id, form, files); onClose() }
    finally { setSave(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="etm-title">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="etm-title" className="flex items-center gap-2 text-base font-bold text-gray-900">
            <i className="fas fa-edit text-must-green" aria-hidden="true" /> Edit Tracking — {curriculum.trackingId}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Close">
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs text-gray-500">Editing: <strong className="text-gray-800">{curriculum.displayTitle ?? curriculum.title}</strong></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>School</label>
              <select value={form.schoolId} onChange={(e) => set('schoolId', e.target.value)} className={inputCls}>
                <option value="">Select a school</option>
                {schools.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Department</label>
              <select value={form.departmentId} onChange={(e) => set('departmentId', e.target.value)} className={inputCls}>
                <option value="">Select a department</option>
                {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Academic Level</label>
              <select value={form.academicLevel} onChange={(e) => set('academicLevel', e.target.value)} className={inputCls}>
                <option value="">Select level</option>
                {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Duration (Semesters)</label>
              <input type="number" min={1} max={20} value={form.proposedDurationSemesters} onChange={(e) => set('proposedDurationSemesters', e.target.value)} placeholder="e.g. 8" className={inputCls} />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Curriculum Name <span className="text-red-500">*</span></label>
              <input type="text" value={form.proposedCurriculumName} onChange={(e) => set('proposedCurriculumName', e.target.value)} required placeholder="e.g. Bachelor of Computer Science" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Curriculum Code</label>
              <input type="text" value={form.proposedCurriculumCode} onChange={(e) => set('proposedCurriculumCode', e.target.value.toUpperCase())} placeholder="e.g. BCS-2024-V1" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Proposed Effective Date</label>
              <input type="date" value={form.proposedEffectiveDate} onChange={(e) => set('proposedEffectiveDate', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Proposed Expiry Date</label>
              <input type="date" value={form.proposedExpiryDate} onChange={(e) => set('proposedExpiryDate', e.target.value)} className={inputCls} />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Description</label>
              <textarea rows={3} value={form.curriculumDescription} onChange={(e) => set('curriculumDescription', e.target.value)} placeholder="Provide a detailed description..." className={cn(inputCls, 'resize-none')} />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Update Notes</label>
              <textarea rows={3} value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Add or update notes about this curriculum..." className={cn(inputCls, 'resize-none')} />
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Attach Updated Documents</label>
              <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png" onChange={(e) => e.target.files && setFiles(Array.from(e.target.files))}
                className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-must-green/10 file:text-must-green hover:file:bg-must-green/20 cursor-pointer" />
              {files.length > 0 && <p className="mt-1 text-xs text-must-green-darker">{files.length} file{files.length !== 1 ? 's' : ''} selected</p>}
            </div>
          </div>
        </form>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button type="button" onClick={onClose} disabled={saving}
            className="flex-1 py-2.5 text-sm font-semibold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:-translate-y-px hover:shadow-soft transition-all disabled:opacity-60">Cancel</button>
          <button type="submit" onClick={handleSubmit} disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-must-green to-must-green-dark rounded-xl hover:-translate-y-px hover:shadow-green transition-all disabled:opacity-60 disabled:transform-none">
            {saving ? <><i className="fas fa-spinner animate-spin" aria-hidden="true" /> Saving...</> : <><i className="fas fa-save" aria-hidden="true" /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  )
}
