import { useId } from 'react'
import type { ComponentProps } from 'react'

type Props = Omit<ComponentProps<'input'>, 'type'> & {
  label: string
}

export default function Checkbox({ label, id, ref, ...rest }: Props) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <label htmlFor={inputId} className="flex cursor-pointer items-center gap-2 text-sm">
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className="size-4 cursor-pointer rounded accent-primary"
        {...rest}
      />
      {label}
    </label>
  )
}