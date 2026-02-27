'use client'

interface PageHeaderProps {
  onAddNew: () => void
}

export function PageHeader({ onAddNew }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Curricula</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage and oversee all educational curricula in the system
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-px hover:shadow-md bg-gradient-to-br from-must-blue to-must-blue-dark"
          >
            <i className="fas fa-print" aria-hidden="true" />
            Print Report
          </button>

          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-px hover:shadow-md bg-gradient-to-br from-must-green via-must-green-dark to-must-teal"
          >
            <i className="fas fa-plus" aria-hidden="true" />
            Add New Curriculum
          </button>
        </div>
      </div>
    </div>
  )
}