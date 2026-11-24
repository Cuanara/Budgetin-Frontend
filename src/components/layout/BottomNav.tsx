import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../../constants/navigation'

const BottomNav = () => (
  <nav
    aria-label="Navigasi utama"
    className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-1 bg-white px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:hidden"
  >
    {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
      <NavLink
        key={path}
        to={path}
        aria-label={label}
        className={({ isActive }) =>
          `flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-2 text-xs transition-colors ${
            isActive ? 'bg-[#0B3B24] font-medium text-white' : 'text-gray-600'
          }`
        }
      >
        <Icon size={22} />
        <span className="truncate">{label.split(' ')[0]}</span>
      </NavLink>
    ))}
  </nav>
)

export default BottomNav