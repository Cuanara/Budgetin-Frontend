import { NavLink } from 'react-router-dom'
import { WISHLIST_ARCHIVE_PATH } from '../../../constants/wishlist'

interface Props {
  activeCount: number
  archivedCount: number
}

const tabClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors ${
    isActive
      ? 'bg-[#0F1F17] font-medium text-white'
      : 'text-gray-600 hover:bg-emerald-50'
  }`

const WishlistTabs = ({ activeCount, archivedCount }: Props) => (
  <nav className="inline-flex rounded-full bg-white p-1.5 shadow-sm">
    <NavLink to="/wishlist" end className={tabClass}>
      Aktif <strong>{activeCount}</strong>
    </NavLink>
    <NavLink to={WISHLIST_ARCHIVE_PATH} end className={tabClass}>
      Arsip <strong>{archivedCount}</strong>
    </NavLink>
  </nav>
)

export default WishlistTabs