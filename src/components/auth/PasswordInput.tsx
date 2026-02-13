'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  hasError?: boolean
}

export function PasswordInput({ id, label, hasError, className, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base font-medium text-gray-700">
        {label} *
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          className={cn(
            'w-full py-3.5 px-5 pr-12 border-2 rounded-md text-base',
            'bg-white placeholder-gray-400 transition-all duration-150',
            'focus:outline-none focus:ring-[3px] focus:ring-must-green/15 focus:border-must-green',
            'disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60',
            hasError
              ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100'
              : 'border-gray-300',
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          disabled={props.disabled}
          aria-label={show ? 'Hide password' : 'Show password'}
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2',
            'w-9 h-9 flex items-center justify-center rounded',
            'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
            'transition-colors duration-150',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'focus-visible:outline-2 focus-visible:outline-must-green-dark focus-visible:outline-offset-2'
          )}
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )
}