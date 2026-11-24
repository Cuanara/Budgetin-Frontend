import clsx from 'clsx'
import type { ReactNode } from 'react'
import AuthHero from '../features/auth/components/AuthHero'

interface Props {
  children: ReactNode
  reverse?: boolean
}

export default function AuthLayout({ children, reverse = false }: Props) {
  return (
    <div className="grid min-h-dvh lg:h-dvh lg:grid-cols-2 lg:overflow-hidden">
      <AuthHero className={clsx('hidden lg:flex', reverse && 'lg:order-2')} />
      <main
        className={clsx(
          'flex flex-col items-center justify-center px-6 py-8 sm:px-10 lg:overflow-y-auto',
          reverse
            ? 'bg-linear-to-bl from-white via-white to-surface lg:order-1'
            : 'bg-linear-to-br from-white via-white to-surface',
        )}
      >
        <div className="w-full max-w-sm">
          <img
            src="/images/logo-dark.png"
            alt="Budgetin"
            className="mx-auto mb-6 h-14 w-auto lg:hidden"
          />
          {children}
        </div>
      </main>
    </div>
  )
}
