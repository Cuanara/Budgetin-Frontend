import clsx from 'clsx'
import { useRef } from 'react'
import type { ClipboardEvent, KeyboardEvent } from 'react'

interface Props {
  digits: string[]
  onChange: (digits: string[]) => void
  invalid?: boolean
  disabled?: boolean
}

export default function OtpInput({ digits, onChange, invalid, disabled }: Props) {
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const length = digits.length

  const focusAt = (index: number) => {
    refs.current[Math.max(0, Math.min(index, length - 1))]?.focus()
  }

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = digit
    onChange(next)
    if (digit) focusAt(index + 1)
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index]) {
      e.preventDefault()
      if (index === 0) return
      const next = [...digits]
      next[index - 1] = ''
      onChange(next)
      focusAt(index - 1)
    }
    if (e.key === 'ArrowLeft') focusAt(index - 1)
    if (e.key === 'ArrowRight') focusAt(index + 1)
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    const next = Array(length).fill('')
    pasted.split('').forEach((char, i) => {
      next[i] = char
    })
    onChange(next)
    focusAt(pasted.length)
  }

  return (
    <div className="flex justify-center gap-2.5">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          autoFocus={i === 0}
          className={clsx(
            'size-12 rounded-xl border bg-white text-center text-lg font-semibold outline-none transition',
            'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30',
            invalid ? 'border-danger' : 'border-line',
          )}
        />
      ))}
    </div>
  )
}