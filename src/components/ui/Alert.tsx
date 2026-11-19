export default function Alert({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="rounded-xl border border-danger/30 bg-red-50 px-4 py-3 text-xs text-danger"
    >
      {message}
    </p>
  )
}