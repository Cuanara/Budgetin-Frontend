import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../../constants/navigation'
import SidebarUser from './SidebarUser'

const Sidebar = () => (
  <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-white px-6 py-7">
    <div className="mb-10 flex items-center gap-3 px-1">
      <img
        src="/images/logo.png"
        alt="Budgetin"
        className="h-11 w-11 rounded-xl object-contain"
      />
      <span className="text-2xl font-medium">Budgetin</span>
    </div>

    <nav className="flex flex-col gap-1.5">
      {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={({ isActive }) =>
            `flex items-center gap-3.5 rounded-full px-5 py-3 text-[15px] transition-colors ${
              isActive
                ? 'bg-[#0B3B24] font-medium text-white'
                : 'text-gray-600 hover:bg-emerald-50'
            }`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>

    <div className="mt-auto">
      <SidebarUser />
    </div>
  </aside>
)

export default Sidebar