interface NotificationToastProps {
  show: boolean
  message: string
  type: 'success' | 'error' | 'info'
}

export function NotificationToast({
  show,
  message,
  type,
}: NotificationToastProps) {
  if (!show) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all duration-300 ${
        type === 'success'
          ? 'bg-must-green'
          : type === 'error'
            ? 'bg-red-500'
            : 'bg-blue-500'
      }`}
    >
      {message}
    </div>
  )
}
