import { useEffect } from 'react'

interface Props {
  message: string
  actionLabel?: string
  onAction?: () => void
  onClose: () => void
  duration?: number
}

const Toast = ({
  message,
  actionLabel,
  onAction,
  onClose,
  duration = 5000,
}: Props) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [message, onClose, duration])

  return (
    <div
      role="status"
      className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full bg-[#0F1F17] py-2.5 pl-6 pr-2.5 text-sm text-white shadow-lg"
    >
      <span>{message}</span>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="rounded-full bg-white px-4 py-1.5 font-medium text-[#0F1F17]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default Toast