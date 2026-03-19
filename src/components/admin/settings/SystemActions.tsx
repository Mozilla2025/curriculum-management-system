import {
  RefreshCw,
  HardDrive,
  FileText,
  Download,
  Trash2,
  ToggleRight,
} from 'lucide-react'

interface SystemActionsProps {
  onForceBackup: () => void
  onClearCache: () => void
  onViewLogs: () => void
  onExport: () => void
  onResetSettings: () => void
}

export function SystemActions({
  onForceBackup,
  onClearCache,
  onViewLogs,
  onExport,
  onResetSettings,
}: SystemActionsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
          <ToggleRight className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">System Actions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onForceBackup}
          className="flex items-center gap-3 px-6 py-4 bg-must-green text-white 
            rounded-xl hover:bg-must-green-dark transition-colors font-semibold"
        >
          <RefreshCw className="w-5 h-5" />
          Force Backup Now
        </button>

        <button
          onClick={onClearCache}
          className="flex items-center gap-3 px-6 py-4 bg-blue-500 text-white 
            rounded-xl hover:bg-blue-600 transition-colors font-semibold"
        >
          <HardDrive className="w-5 h-5" />
          Clear Cache
        </button>

        <button
          onClick={onViewLogs}
          className="flex items-center gap-3 px-6 py-4 bg-purple-500 text-white 
            rounded-xl hover:bg-purple-600 transition-colors font-semibold"
        >
          <FileText className="w-5 h-5" />
          View Audit Logs
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-3 px-6 py-4 bg-amber-500 text-white 
            rounded-xl hover:bg-amber-600 transition-colors font-semibold"
        >
          <Download className="w-5 h-5" />
          Export Settings
        </button>

        <button
          onClick={onResetSettings}
          className="flex items-center gap-3 px-6 py-4 bg-red-500 text-white 
            rounded-xl hover:bg-red-600 transition-colors font-semibold md:col-span-2"
        >
          <Trash2 className="w-5 h-5" />
          Reset All Settings to Default
        </button>
      </div>
    </div>
  )
}
