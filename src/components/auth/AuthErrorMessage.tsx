interface AuthErrorMessageProps {
  message: string
}

export function AuthErrorMessage({ message }: AuthErrorMessageProps) {
  if (!message) return null

  return (
    <div
      role="alert"
      className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-sm"
    >
      <i className="fas fa-exclamation-circle flex-shrink-0"></i>
      <span>{message}</span>
    </div>
  )
}