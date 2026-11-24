import clsx from 'clsx'
import { Eye, EyeOff } from 'lucide-react'
import { useId, useState } from 'react'
import type { ComponentProps } from 'react'

type Props = ComponentProps<'input'> & {
  label?: string
  error?: string
  invalid?: boolean
}

export default function Input({
  label,
  error,
  invalid,
  type = 'text',
  className,
  id,
  ref,
  ...rest
}: Props) {
  const autoId = useId()
  const inputId = id ?? autoId
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  const hasError = !!error || !!invalid

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={isPassword && show ? 'text' : type}
          aria-invalid={hasError}
          className={clsx(
            'h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none transition',
            'placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20',
            hasError ? 'border-danger bg-red-50' : 'border-line',
            isPassword && 'pr-12',
            className,
          )}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-800"
          >
            {show ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
          </button>
        )}
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}