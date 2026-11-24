import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import ExpiredWishlistGate from '../features/wishlist/components/ExpiredWishlistGate'
import BottomNav from '../components/layout/BottomNav'

const DashboardLayout = () => (
  <div className="flex min-h-screen bg-[linear-gradient(to_bottom_left,#d1fae5,#ecfdf5_40%,#ffffff)]">
    <Sidebar />
    <main className="min-w-0 flex-1 p-4 pb-28 md:p-8">
      <Outlet />
    </main>
    <BottomNav />
    <ExpiredWishlistGate />
  </div>
)

export default DashboardLayout