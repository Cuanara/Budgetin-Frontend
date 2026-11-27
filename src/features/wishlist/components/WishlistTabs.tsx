import { NavLink } from 'react-router-dom'
import { WISHLIST_ARCHIVE_PATH } from '../../../constants/wishlist'

interface Props {
  activeCount: number
  archivedCount: number
}

const tabClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[10px] transition-colors sm:px-5 sm:py-2.5 sm:text-xs ${
    isActive
      ? 'bg-[#0B1720] font-semibold text-white'
      : 'text-[#52675A] hover:bg-emerald-50'
  }`

const WishlistTabs = ({ activeCount, archivedCount }: Props) => (
  <nav
    aria-label="Kategori wishlist"
    className="inline-flex shrink-0 rounded-full bg-white p-1 shadow-sm"
  >
    <NavLink to="/wishlist" end className={tabClass}>
      Aktif
      <strong>{activeCount}</strong>
    </NavLink>

    <NavLink to={WISHLIST_ARCHIVE_PATH} end className={tabClass}>
      Arsip
      <strong>{archivedCount}</strong>
    </NavLink>
  </nav>
)

export default WishlistTabs
