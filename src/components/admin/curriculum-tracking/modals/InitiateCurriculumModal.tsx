'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface School { id: string | number; name: string }
interface Department { id: string | number; name: string }

interface Props {
  onClose: () => void
  onInitiate: (formData: unknown, documents: File[]) => Promise<void>
  schools?: School[]
  departments?: Department[]
}

interface Form {
  schoolId: string; departmentId: string; academicLevel: string
  proposedDurationSemesters: string; proposedCurriculumName: string
  proposedCurriculumCode: string; curriculumDescription: string
  proposedEffectiveDate: string; proposedExpiryDate: string; initialNotes: string
}

const EMPTY: Form = {
  schoolId: '', departmentId: '', academicLevel: '',
  proposedDurationSemesters: '', proposedCurriculumName: '',
  proposedCurriculumCode: '', curriculumDescription: '',
  proposedEffectiveDate: '', proposedExpiryDate: '', initialNotes: '',
}

const LEVELS = ['Certificate', 'Diploma', 'Bachelor', 'Postgraduate Diploma', 'Masters', 'PhD']
const inputCls = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10 bg-white transition-colors'
const labelCls = 'block text-xs font-semibold text-gray-700 mb-1.5'

export function InitiateCurriculumModal({ onClose, onInitiate, schools = [], departments = [] }: Props) {
  const [form, setForm]   = useState<Form>(EMPTY)
  const [files, setFiles] = useState<File[]>([])
  const [saving, setSave] = useState(false)
  const [errors, setErr]  = useState<Partial<Form>>({})

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  const set = (k: keyof Form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErr((p) => ({ ...p, [k]: undefined }))
  }

  const validate = () => {
    const e: Partial<Form> = {}
    if (!form.schoolId)                  e.schoolId = 'Required'
    if (!form.proposedCurriculumName)    e.proposedCurriculumName = 'Required'
    if (!form.academicLevel)             e.academicLevel = 'Required'
    if (!form.proposedEffectiveDate)     e.proposedEffectiveDate = 'Required'
    setErr(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSave(true)
    try { await onInitiate(form, files); onClose() }
    finally { setSave(false) }
  }

  const Required = () => <span className="text-red-500 ml-0.5">*</span>

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="icm-title">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="icm-title" className="flex items-center gap-2 text-base font-bold text-gray-900">
            <i className="fas fa-plus-circle text-must-green" aria-hidden="true" /> Initiate New Curriculum Tracking
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Close">
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Institution */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 pb-2 border-b-2 border-gray-100">
              <i className="fas fa-university text-must-green" aria-hidden="true" /> Institution Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>School <Required /></label>
                <select value={form.schoolId} onChange={(e) => set('schoolId', e.target.value)} className={cn(inputCls, errors.schoolId && 'border-red-400')}>
                  <option value="">Select a school</option>
                  {schools.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                {errors.schoolId && <p className="mt-1 text-xs text-red-500">{errors.schoolId}</p>}
              </div>
              <div>
                <label className={labelCls}>Department</label>
                <select value={form.departmentId} onChange={(e) => set('departmentId', e.target.value)} className={inputCls}>
                  <option value="">Select a department</option>
                  {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Academic Level <Required /></label>
                <select value={form.academicLevel} onChange={(e) => set('academicLevel', e.target.value)} className={cn(inputCls, errors.academicLevel && 'border-red-400')}>
                  <option value="">Select level</option>
                  {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                {errors.academicLevel && <p className="mt-1 text-xs text-red-500">{errors.academicLevel}</p>}
              </div>
              <div>
                <label className={labelCls}>Duration (Semesters)</label>
                <input type="number" min={1} max={20} value={form.proposedDurationSemesters} onChange={(e) => set('proposedDurationSemesters', e.target.value)} placeholder="e.g. 8" className={inputCls} />
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 pb-2 border-b-2 border-gray-100">
              <i className="fas fa-book text-must-green" aria-hidden="true" /> Curriculum Information
            </h3>
            <div className="space-y-3">
              <div>
                <label className={labelCls}>Curriculum Name <Required /></label>
                <input type="text" value={form.proposedCurriculumName} onChange={(e) => set('proposedCurriculumName', e.target.value)} placeholder="e.g. Bachelor of Computer Science" className={cn(inputCls, errors.proposedCurriculumName && 'border-red-400')} />
                {errors.proposedCurriculumName && <p className="mt-1 text-xs text-red-500">{errors.proposedCurriculumName}</p>}
              </div>
              <div>
                <label className={labelCls}>Curriculum Code</label>
                <input type="text" value={form.proposedCurriculumCode} onChange={(e) => set('proposedCurriculumCode', e.target.value.toUpperCase())} placeholder="e.g. BCS-2024-V1" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Description</label>
                <textarea rows={3} value={form.curriculumDescription} onChange={(e) => set('curriculumDescription', e.target.value)} placeholder="Provide a detailed description of the proposed curriculum..." className={cn(inputCls, 'resize-none')} />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 pb-2 border-b-2 border-gray-100">
              <i className="fas fa-calendar text-must-green" aria-hidden="true" /> Important Dates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Proposed Effective Date <Required /></label>
                <input type="date" value={form.proposedEffectiveDate} onChange={(e) => set('proposedEffectiveDate', e.target.value)} className={cn(inputCls, errors.proposedEffectiveDate && 'border-red-400')} />
                {errors.proposedEffectiveDate && <p className="mt-1 text-xs text-red-500">{errors.proposedEffectiveDate}</p>}
              </div>
              <div>
                <label className={labelCls}>Proposed Expiry Date</label>
                <input type="date" value={form.proposedExpiryDate} onChange={(e) => set('proposedExpiryDate', e.target.value)} className={inputCls} />
              </div>
            </div>
          </div>

          {/* Notes & Docs */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 pb-2 border-b-2 border-gray-100">
              <i className="fas fa-file-alt text-must-green" aria-hidden="true" /> Notes & Documents
            </h3>
            <div className="space-y-3">
              <div>
                <label className={labelCls}>Initial Notes</label>
                <textarea rows={3} value={form.initialNotes} onChange={(e) => set('initialNotes', e.target.value)} placeholder="Add any initial notes or comments..." className={cn(inputCls, 'resize-none')} />
              </div>
              <div>
                <label className={labelCls}>Attach Documents</label>
                <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png" onChange={(e) => e.target.files && setFiles(Array.from(e.target.files))}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-must-green/10 file:text-must-green hover:file:bg-must-green/20 cursor-pointer" />
                {files.length > 0 && <p className="mt-1 text-xs text-must-green-darker">{files.length} file{files.length !== 1 ? 's' : ''} selected</p>}
              </div>
            </div>
          </div>
        </form>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button type="button" onClick={onClose} disabled={saving}
            className="flex-1 py-2.5 text-sm font-semibold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:-translate-y-px hover:shadow-soft transition-all disabled:opacity-60">Cancel</button>
          <button type="submit" onClick={handleSubmit} disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-must-green to-must-green-dark rounded-xl hover:-translate-y-px hover:shadow-green transition-all disabled:opacity-60 disabled:transform-none">
            {saving ? <><i className="fas fa-spinner animate-spin" aria-hidden="true" /> Initiating...</> : <><i className="fas fa-play-circle" aria-hidden="true" /> Initiate Tracking</>}
          </button>
        </div>
      </div>
    </div>
  )
}
