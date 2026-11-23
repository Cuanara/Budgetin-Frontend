import { AlertCircle } from 'lucide-react'

export default function Alert({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="flex items-center gap-2 rounded-full border border-danger/30 bg-red-50 px-4 py-2.5 text-xs text-danger"
    >
      <AlertCircle className="size-4 shrink-0" />
      {message}
    </p>
  )
}
