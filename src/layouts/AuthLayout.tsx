import clsx from 'clsx'
import type { ReactNode } from 'react'
import AuthHero from '../features/auth/components/AuthHero'

interface Props {
  children: ReactNode
  reverse?: boolean
}

export default function AuthLayout({ children, reverse = false }: Props) {
  return (
    <div className="grid h-screen overflow-hidden lg:grid-cols-2">
      <AuthHero className={clsx('hidden lg:flex', reverse && 'lg:order-2')} />
      <main
        className={clsx(
          'flex items-center justify-center overflow-y-auto p-6',
          reverse
            ? 'bg-linear-to-bl from-white via-white to-surface lg:order-1'
            : 'bg-linear-to-br from-white via-white to-surface',
        )}
      >
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  )
}