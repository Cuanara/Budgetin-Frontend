import { createBrowserRouter } from 'react-router-dom'
import GuestRoute from '../features/auth/components/GuestRoute'
import ProtectedRoute from '../features/auth/components/ProtectedRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import AuthCallback from '../pages/AuthCallback'
import Home from '../pages/Home'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
import VerifyOtp from '../pages/VerifyOtp'
import Savings from '../pages/Savings'
import Wishlist from '../pages/Wishlist'
import WishlistDetail from '../pages/WishlistDetail'
import WishlistArchive from '../pages/WishlistArchive'

export const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  {
    element: <GuestRoute />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/verifikasi-otp', element: <VerifyOtp /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/beranda', element: <Home /> },
          { path: '/wishlist', element: <Wishlist /> },
          { path: '/tabungan', element: <Savings /> },
          { path: '/wishlist/:id', element: <WishlistDetail /> },
          { path: '/wishlist/arsip', element: <WishlistArchive /> },
        ],
      },
    ],
  },
  { path: '/auth/callback', element: <AuthCallback /> },
  { path: '*', element: <NotFound /> },
])