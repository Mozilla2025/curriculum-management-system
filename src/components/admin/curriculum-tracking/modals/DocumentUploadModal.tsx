'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { CurriculumTracking } from '@/types/tracking'
import { formatFileSize } from '@/lib/tracking/utils'

interface Props {
  curriculum: CurriculumTracking
  onClose: () => void
  onUpload: (files: File[]) => Promise<void>
}

export function DocumentUploadModal({ curriculum, onClose, onUpload }: Props) {
  const [files, setFiles]     = useState<File[]>([])
  const [dragging, setDrag]   = useState(false)
  const [uploading, setUp]    = useState(false)
  const [errors, setErrors]   = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const accept = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/jpeg','image/png']
  const maxMB  = 10

  const validate = (newFiles: File[]) => {
    const errs: string[] = []
    newFiles.forEach((f) => {
      if (!accept.some((t) => f.type === t)) errs.push(`${f.name}: unsupported file type`)
      if (f.size > maxMB * 1024 * 1024) errs.push(`${f.name}: exceeds ${maxMB}MB limit`)
    })
    return errs
  }

  const add = (newFiles: File[]) => {
    const errs = validate(newFiles)
    setErrors(errs)
    if (errs.length === 0) setFiles((p) => [...p, ...newFiles.filter((n) => !p.some((e) => e.name === n.name))])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false)
    add(Array.from(e.dataTransfer.files))
  }

  const handleSubmit = async () => {
    if (!files.length) return
    setUp(true)
    try { await onUpload(files); onClose() }
    catch { setErrors(['Upload failed. Please try again.']) }
    finally { setUp(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="dum-title">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 id="dum-title" className="flex items-center gap-2 text-base font-bold text-gray-900">
            <i className="fas fa-upload text-must-green" aria-hidden="true" /> Upload Documents
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Close">
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Curriculum info */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-must-green/8 to-must-blue/5 border border-must-green/20 rounded-xl">
            <i className="fas fa-route text-must-green text-xl flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{curriculum.displayTitle ?? curriculum.title}</p>
              <p className="text-xs text-gray-500">{curriculum.trackingId} • {curriculum.school}</p>
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="flex gap-2 p-3 bg-red-50 border-l-4 border-red-500 rounded-xl text-red-700">
              <i className="fas fa-exclamation-circle flex-shrink-0 mt-0.5" aria-hidden="true" />
              <ul className="text-sm space-y-0.5">
                {errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          )}

          {/* Dropzone */}
          <div onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)}
            onClick={() => inputRef.current?.click()}
            className={cn('border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300',
              dragging ? 'border-must-green bg-must-green/8 scale-[1.02]' : 'border-gray-200 bg-gray-50 hover:border-must-green hover:bg-must-green/5 hover:-translate-y-0.5')}>
            <i className={cn('fas fa-cloud-upload-alt text-5xl mb-3 block transition-colors', dragging ? 'text-must-green' : 'text-gray-300')} aria-hidden="true" />
            <p className="text-base font-bold text-gray-700 mb-1">{dragging ? 'Drop files here' : 'Drag & drop files'}</p>
            <p className="text-sm text-gray-500 mb-3">or click to browse from your device</p>
            <p className="text-xs text-gray-400">PDF, Word, JPG, PNG • Max {maxMB}MB per file</p>
            <input ref={inputRef} type="file" multiple accept={accept.join(',')} className="hidden"
              onChange={(e) => e.target.files && add(Array.from(e.target.files))} />
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-paperclip text-must-green" aria-hidden="true" /> Selected ({files.length})
              </h4>
              <div className="space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border-2 border-gray-100 rounded-xl hover:border-must-green/30 transition-all">
                    <i className="fas fa-file-alt text-must-green flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{f.name}</p>
                      <p className="text-xs text-gray-400">{formatFileSize(f.size)}</p>
                    </div>
                    <button onClick={() => setFiles((p) => p.filter((_, j) => j !== i))}
                      className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" aria-label="Remove file">
                      <i className="fas fa-times text-xs" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 bg-must-green/5 border border-must-green/20 rounded-xl px-3 py-2">
                <i className="fas fa-check-circle text-must-green" aria-hidden="true" />
                {files.length} file{files.length !== 1 ? 's' : ''} ready — {formatFileSize(files.reduce((s, f) => s + f.size, 0))} total
              </div>
            </div>
          )}

          {/* Requirements */}
          <div className="p-3 bg-must-green/5 border-l-4 border-must-green rounded-xl">
            <h5 className="flex items-center gap-1.5 text-xs font-semibold text-must-green-darker mb-1.5">
              <i className="fas fa-info-circle" aria-hidden="true" /> Document Requirements
            </h5>
            <ul className="text-xs text-gray-600 space-y-0.5 list-disc list-inside">
              <li>All documents must be clear and legible</li>
              <li>Official documents require institutional stamp/signature</li>
              <li>Use descriptive filenames for easy identification</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button onClick={onClose} disabled={uploading}
            className="flex-1 py-2.5 text-sm font-semibold bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:-translate-y-px hover:shadow-soft transition-all disabled:opacity-60">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={uploading || files.length === 0}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-must-green to-must-green-dark rounded-xl hover:-translate-y-px hover:shadow-green transition-all disabled:opacity-60 disabled:transform-none">
            {uploading ? <><i className="fas fa-spinner animate-spin" aria-hidden="true" /> Uploading...</> : <><i className="fas fa-upload" aria-hidden="true" /> Upload {files.length > 0 ? `${files.length} File${files.length !== 1 ? 's' : ''}` : 'Files'}</>}
          </button>
        </div>
      </div>
    </div>
  )
}
