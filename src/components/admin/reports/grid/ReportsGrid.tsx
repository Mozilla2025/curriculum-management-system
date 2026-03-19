import { ReportCardItem } from './ReportCardItem'
import { REPORT_CARDS } from '@/lib/reports'

interface ReportsGridProps {
  onViewReport: (title: string) => void
  onExportReport: (title: string) => void
}

export function ReportsGrid({ onViewReport, onExportReport }: ReportsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {REPORT_CARDS.map((report) => (
        <ReportCardItem
          key={report.id}
          report={report}
          onView={onViewReport}
          onExport={onExportReport}
        />
      ))}
    </div>
  )
}
