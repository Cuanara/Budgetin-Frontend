import { useLogout } from '../features/auth/hooks/useLogout'

export default function Home() {
  const logout = useLogout()

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Beranda</h1>
      <button onClick={logout} className="mt-4 rounded-full bg-primary px-5 py-2 text-white">
        Keluar
      </button>
    </div>
  )
}