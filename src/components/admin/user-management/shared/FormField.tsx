import { cn } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
  hint?: string
}

export function FormField({ label, error, required, hint, className, id, ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        className={cn(
          'px-3 py-2.5 text-sm border rounded-lg transition-all duration-200 bg-white',
          'placeholder:text-gray-400',
          'focus:outline-none focus:border-must-green focus:ring-2 focus:ring-must-green/10',
          error
            ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100'
            : 'border-gray-200',
          props.disabled && 'bg-gray-100 text-gray-500 cursor-not-allowed',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <i className="fas fa-exclamation-circle" aria-hidden="true" />
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-gray-500">{hint}</p>
      )}
    </div>
  )
}
