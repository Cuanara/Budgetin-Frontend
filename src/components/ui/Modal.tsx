
import { useEffect } from 'react'
import type { ReactNode } from 'react'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  open: boolean
  onClose?: () => void
  labelledBy?: string
  size?: Size
  children: ReactNode
  contentClassName?: string
}

const SIZE_CLASS: Record<Size, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
}

const Modal = ({
  open,
  onClose,
  labelledBy,
  size = 'lg',
  children,
  contentClassName = '',
}: Props) => {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }

    const previousOverflow = document.body.style.overflow

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex overflow-y-auto bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`m-auto w-full ${SIZE_CLASS[size]} rounded-[22px] bg-white p-5 shadow-xl ${contentClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
