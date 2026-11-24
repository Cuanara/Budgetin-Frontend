import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../../constants/navigation'
import SidebarUser from './SidebarUser'

const Sidebar = () => (
  <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-white px-6 py-7 md:flex">
    <div className="mb-10 px-1">
      <img src="/images/logo-dark.png" alt="Budgetin" className="h-14 w-auto" />
    </div>

    <nav className="flex flex-col gap-1.5">
      {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
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
