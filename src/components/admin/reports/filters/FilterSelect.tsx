'use client'

import { cn } from '@/lib/utils'

interface FilterSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder: string
  id: string
}

export function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  id,
}: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full px-3 py-2 text-sm rounded-md border border-gray-300 bg-white',
          'focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10',
          'transition-colors duration-200',
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
