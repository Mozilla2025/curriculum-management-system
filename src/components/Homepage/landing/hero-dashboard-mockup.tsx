const curriculumItems = [
  { title: 'BSc Computer Science', school: 'SCTI', status: 'Approved', color: 'bg-emerald-500/30 text-white' },
  { title: 'BSc Nursing', school: 'SHHS', status: 'Under Review', color: 'bg-amber-400/30 text-white' },
  { title: 'BEd Mathematics', school: 'SEDU', status: 'Pending', color: 'bg-slate-400/30 text-white' },
  { title: 'MSc Data Science', school: 'SCTI', status: 'Senate Stage', color: 'bg-blue-400/30 text-white' },
  { title: 'Diploma in Pharmacy', school: 'SHHS', status: 'CUE Review', color: 'bg-purple-400/30 text-white' },
]

const approvalStages = [
  { label: 'Department', pct: 100 },
  { label: 'Dean / Board', pct: 76 },
  { label: 'Senate', pct: 44 },
  { label: 'CUE', pct: 13 },
]

export function HeroDashboardMockup() {
  return (
    <div className="w-full max-w-md bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">

      {/* Window chrome bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 text-xs text-white font-medium tracking-wide">
          Curriculum Review Dashboard
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 px-4 py-2 border-b border-white/5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/70">Programme</span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/70">School</span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/70">Status</span>
      </div>

      {/* Curriculum rows */}
      <ul className="divide-y divide-white/5">
        {curriculumItems.map((item) => (
          <li
            key={item.title}
            className="grid grid-cols-[1fr_auto_auto] gap-x-3 items-center px-4 py-3 hover:bg-white/5 transition-colors duration-150"
          >
            <span className="text-sm text-white font-medium truncate">{item.title}</span>
            <span className="text-xs text-white/60 font-mono">{item.school}</span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${item.color}`}>
              {item.status}
            </span>
          </li>
        ))}
      </ul>

      {/* Approval pipeline */}
      <div className="px-4 py-4 border-t border-white/10 bg-white/5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70 mb-3">
          Approval Pipeline — Current Cycle
        </p>
        <div className="space-y-2.5">
          {approvalStages.map((stage) => (
            <div key={stage.label} className="flex items-center gap-3">
              <span className="text-xs text-white/80 w-24 shrink-0">{stage.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-must-gold transition-all duration-500"
                  style={{ width: `${stage.pct}%` }}
                />
              </div>
              <span className="text-xs text-white/80 w-8 text-right shrink-0">{stage.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
