import { useAuthStore } from '../../stores/authStore'

const SidebarUser = () => {
  const user = useAuthStore((s) => s.user)

  const name = user?.name ?? ''
  const email = user?.email ?? ''

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-medium uppercase text-[#0B3B24]">
        {name.charAt(0)}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{name}</p>
        <p className="truncate text-xs text-gray-500">{email}</p>
      </div>
    </div>
  )
}

export default SidebarUser