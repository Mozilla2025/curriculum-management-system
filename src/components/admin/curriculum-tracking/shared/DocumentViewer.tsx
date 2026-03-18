'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { TrackingDocument } from '@/types/tracking'
import { getFileIcon, getFileIconColor, formatFileSize } from '@/lib/tracking/utils'

type ViewMode = 'list' | 'grid'
type SortBy   = 'uploadedAt' | 'name' | 'size'

interface Props {
  trackingId: string | number
  showUploadButton?: boolean
  onUploadClick?: () => void
  onDocumentAction?: (action: string, doc: TrackingDocument) => void
  className?: string
}

async function fetchDocuments(_id: string | number): Promise<TrackingDocument[]> {
  await new Promise((r) => setTimeout(r, 500))
  return []
}

export function DocumentViewer({ trackingId, showUploadButton = true, onUploadClick, onDocumentAction, className }: Props) {
  const [docs, setDocs]       = useState<TrackingDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [view, setView]       = useState<ViewMode>('list')
  const [sort, setSort]       = useState<SortBy>('uploadedAt')
  const [search, setSearch]   = useState('')
  const [selected, setSelected] = useState<Set<string | number>>(new Set())

  const load = useCallback(async () => {
    setLoading(true); setError(null)
    try { setDocs(await fetchDocuments(trackingId)) }
    catch (e) { setError(e instanceof Error ? e.message : 'Failed to load') }
    finally { setLoading(false) }
  }, [trackingId])

  useEffect(() => { load() }, [load])

  const filtered = docs
    .filter((d) => !search || d.originalFilename?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'name') return (a.originalFilename ?? '').localeCompare(b.originalFilename ?? '')
      if (sort === 'size') return (a.fileSize ?? 0) - (b.fileSize ?? 0)
      return new Date(b.uploadedAt ?? 0).getTime() - new Date(a.uploadedAt ?? 0).getTime()
    })

  if (loading) return (
    <div className="flex items-center justify-center py-12 gap-3 text-gray-500">
      <div className="w-6 h-6 border-2 border-gray-200 border-t-must-green rounded-full animate-spin" />
      <span className="text-sm">Loading documents...</span>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center py-10 gap-3 text-red-600">
      <i className="fas fa-exclamation-triangle text-2xl" />
      <span className="text-sm">{error}</span>
      <button onClick={load} className="px-3 py-1.5 text-xs font-semibold border border-red-300 rounded-lg hover:bg-red-50 transition-colors">Retry</button>
    </div>
  )

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 p-4 border-b border-gray-200">
        <div className="relative flex-1 max-w-xs">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" aria-hidden="true" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10"
          />
        </div>
        <div className="flex items-center gap-2">
          <select value={sort} onChange={(e) => setSort(e.target.value as SortBy)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:border-must-green">
            <option value="uploadedAt">Date</option>
            <option value="name">Name</option>
            <option value="size">Size</option>
          </select>
          {(['list','grid'] as ViewMode[]).map((m) => (
            <button key={m} onClick={() => setView(m)}
              className={cn('w-7 h-7 flex items-center justify-center rounded-lg border text-xs transition-colors',
                view === m ? 'bg-must-green text-white border-must-green' : 'bg-white text-gray-500 border-gray-200 hover:border-must-green')}>
              <i className={m === 'list' ? 'fas fa-list' : 'fas fa-th'} aria-hidden="true" />
            </button>
          ))}
          {showUploadButton && (
            <button onClick={onUploadClick}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-must-green to-must-green-dark rounded-lg hover:-translate-y-px hover:shadow-soft transition-all">
              <i className="fas fa-plus" aria-hidden="true" /> Upload
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-400">
          <i className="fas fa-folder-open text-3xl opacity-40" />
          <p className="text-sm">{docs.length === 0 ? 'No documents uploaded yet.' : 'No documents match your search.'}</p>
          {showUploadButton && docs.length === 0 && (
            <button onClick={onUploadClick}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-must-green to-must-green-dark rounded-lg hover:-translate-y-px hover:shadow-soft transition-all">
              <i className="fas fa-plus" aria-hidden="true" /> Upload First Document
            </button>
          )}
        </div>
      ) : (
        <div className={cn('p-4', view === 'grid' && 'grid grid-cols-2 gap-3')}>
          {filtered.map((doc) => (
            <div key={doc.id}
              className={cn('flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-must-green/30 hover:bg-must-green/5 transition-all group',
                view === 'list' && 'mb-2 last:mb-0')}>
              <i className={cn(getFileIcon(doc.contentType ?? ''), 'text-xl flex-shrink-0')}
                style={{ color: getFileIconColor(doc.contentType ?? '') }} aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{doc.originalFilename}</p>
                <p className="text-xs text-gray-400">{formatFileSize(doc.fileSize)} • {doc.uploadedAtFormatted ?? doc.uploadedAt}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onDocumentAction?.('view', doc)}
                  className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-must-blue hover:bg-blue-50 transition-colors" title="View">
                  <i className="fas fa-eye text-xs" aria-hidden="true" />
                </button>
                <button onClick={() => onDocumentAction?.('download', doc)}
                  className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-must-green hover:bg-must-green/10 transition-colors" title="Download">
                  <i className="fas fa-download text-xs" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {docs.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400 text-center">
          {docs.length} document{docs.length !== 1 ? 's' : ''} • {formatFileSize(docs.reduce((s, d) => s + (d.fileSize ?? 0), 0))} total
        </div>
      )}
    </div>
  )
}
