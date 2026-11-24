import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WISHLIST_ARCHIVE_PATH } from '../../../constants/wishlist'

const WishlistArchiveLink = () => (
  <Link
    to={WISHLIST_ARCHIVE_PATH}
    className="inline-flex items-center gap-3 rounded-full border border-[#0B3B24] bg-white px-6 py-3 text-sm font-medium text-[#0B3B24] transition-colors hover:bg-emerald-50"
  >
    Lihat arsip barang
    <ArrowRight size={18} />
  </Link>
)

export default WishlistArchiveLink