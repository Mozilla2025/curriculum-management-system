'use client'

import { cn } from '@/lib/utils'

interface NotificationsPaginationProps {
  currentPage: number
  totalPages: number
  paginationInfo: { start: number; end: number; total: number }
  onPageChange: (page: number) => void
}

export function NotificationsPagination({
  currentPage,
  totalPages,
  paginationInfo,
  onPageChange,
}: NotificationsPaginationProps) {
  if (paginationInfo.total === 0) return null

  const getPageNumbers = (): number[] => {
    const maxShow = 5
    let start = Math.max(1, currentPage - Math.floor(maxShow / 2))
    const end   = Math.min(totalPages, start + maxShow - 1)
    if (end - start < maxShow - 1) start = Math.max(1, end - maxShow + 1)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const btnBase = cn(
    'min-w-[2.5rem] h-10 px-2 flex items-center justify-center rounded-lg border-2 text-sm font-semibold',
    'transition-all duration-300 shadow-sm'
  )

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 bg-gray-50/80 border-t border-gray-200 rounded-b-xl">
      <p className="text-sm text-gray-500 font-medium">
        Showing {paginationInfo.start}–{paginationInfo.end} of {paginationInfo.total} notifications
      </p>

      {totalPages > 1 && (
        <nav className="flex items-center gap-1" aria-label="Notifications pagination">
          {/* Previous */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className={cn(
              btnBase,
              'bg-white text-gray-500 border-gray-200 gap-1.5',
              'hover:bg-must-green hover:text-white hover:border-must-green hover:-translate-y-px',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-200 disabled:hover:translate-y-0'
            )}
          >
            <i className="fas fa-chevron-left text-xs" aria-hidden="true" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1 mx-1">
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                className={cn(
                  btnBase,
                  currentPage === page
                    ? 'bg-gradient-to-r from-must-green via-must-green-dark to-must-teal text-white border-must-green shadow-md'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-must-green hover:text-must-green hover:-translate-y-px'
                )}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className={cn(
              btnBase,
              'bg-white text-gray-500 border-gray-200 gap-1.5',
              'hover:bg-must-green hover:text-white hover:border-must-green hover:-translate-y-px',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-200 disabled:hover:translate-y-0'
            )}
          >
            <span className="hidden sm:inline">Next</span>
            <i className="fas fa-chevron-right text-xs" aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  )
}
