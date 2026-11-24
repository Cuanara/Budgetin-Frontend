import clsx from 'clsx'
import { Loader2 } from 'lucide-react'
import type { ComponentProps } from 'react'

type Props = ComponentProps<'button'> & {
  variant?: 'primary' | 'outline' | 'danger'
  loading?: boolean
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  loading = false,
  fullWidth = true,
  disabled,
  className,
  children,
  ...rest
}: Props) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        'disabled:cursor-not-allowed disabled:opacity-60',
        fullWidth && 'w-full',
        variant === 'primary' && 'bg-primary text-white hover:bg-primary-hover',
        variant === 'outline' &&
          'border border-line bg-white text-gray-900 hover:bg-gray-50',
        variant === 'danger' && 'bg-danger text-white hover:opacity-90',
        className,
      )}
      {...rest}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  )
}