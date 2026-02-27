'use client'

import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  pageSize: number
  totalElements: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
  onPageChange: (page: number) => void
  onPreviousPage: () => void
  onNextPage: () => void
  onPageSizeChange: (size: number) => void
  isLoading?: boolean
}

export function Pagination({
  currentPage,
  pageSize,
  totalElements,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
  onPreviousPage,
  onNextPage,
  onPageSizeChange,
  isLoading,
}: PaginationProps) {
  if (totalElements === 0) return null

  const startItem = currentPage * pageSize + 1
  const endItem = Math.min((currentPage + 1) * pageSize, totalElements)

  const renderPages = () => {
    if (totalPages <= 1) return null
    const pages: React.ReactNode[] = []
    const maxShow = 5
    let start = Math.max(0, currentPage - Math.floor(maxShow / 2))
    let end = Math.min(totalPages - 1, start + maxShow - 1)
    if (end - start < maxShow - 1) start = Math.max(0, end - maxShow + 1)

    if (start > 0) {
      pages.push(
        <PageBtn key={0} page={0} active={currentPage === 0} onClick={() => onPageChange(0)} disabled={isLoading} />,
      )
      if (start > 1) pages.push(<Ellipsis key="start-ellipsis" />)
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <PageBtn key={i} page={i} active={currentPage === i} onClick={() => onPageChange(i)} disabled={isLoading} />,
      )
    }

    if (end < totalPages - 1) {
      if (end < totalPages - 2) pages.push(<Ellipsis key="end-ellipsis" />)
      pages.push(
        <PageBtn
          key={totalPages - 1}
          page={totalPages - 1}
          active={currentPage === totalPages - 1}
          onClick={() => onPageChange(totalPages - 1)}
          disabled={isLoading}
        />,
      )
    }

    return pages
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl',
        isLoading && 'opacity-70 pointer-events-none'
      )}
    >
      <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
        <span>
          Showing {startItem}–{endItem} of {totalElements} entries
        </span>
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="whitespace-nowrap">Show:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            disabled={isLoading}
            className="px-2 py-1 border-2 border-gray-200 rounded-lg bg-white text-sm font-medium focus:outline-none focus:border-must-green hover:border-must-green transition-colors"
          >
            {[10, 20, 50, 100].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className="whitespace-nowrap">per page</span>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <NavBtn
            onClick={onPreviousPage}
            disabled={!hasPrevious || !!isLoading}
            aria-label="Previous page"
          >
            <i className="fas fa-chevron-left text-xs" />
            <span>Previous</span>
          </NavBtn>

          <div className="flex items-center gap-1 mx-2">{renderPages()}</div>

          <NavBtn
            onClick={onNextPage}
            disabled={!hasNext || !!isLoading}
            aria-label="Next page"
          >
            <span>Next</span>
            <i className="fas fa-chevron-right text-xs" />
          </NavBtn>
        </div>
      )}
    </div>
  )
}

function PageBtn({
  page,
  active,
  onClick,
  disabled,
}: {
  page: number
  active: boolean
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'min-w-[40px] h-10 px-2 flex items-center justify-center rounded-lg border-2 text-sm font-semibold transition-all duration-300 shadow-sm',
        active
          ? 'bg-gradient-to-r from-must-green via-must-green-dark to-must-teal text-white border-must-green shadow-md'
          : 'bg-white text-gray-500 border-gray-200 hover:border-must-green hover:text-must-green hover:-translate-y-px hover:shadow-soft',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {page + 1}
    </button>
  )
}

function NavBtn({
  onClick,
  disabled,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-1.5 px-4 py-2 border-2 rounded-lg text-sm font-semibold bg-white text-gray-500 border-gray-200 shadow-sm transition-all duration-300',
        !disabled && 'hover:bg-must-green hover:text-white hover:border-must-green hover:-translate-y-px hover:shadow-soft',
        disabled && 'opacity-50 cursor-not-allowed bg-gray-100'
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

function Ellipsis() {
  return <span className="px-2 text-gray-400 select-none">…</span>
}