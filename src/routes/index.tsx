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
import Budget from '../pages/Budget'
import Profile from '../pages/Profile'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'

export const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  {
    element: <GuestRoute />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/verifikasi-otp', element: <VerifyOtp /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/reset-password', element: <ResetPassword /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/dashboard', element: <Home /> },
          { path: '/budget', element: <Budget /> },
          { path: '/wishlist', element: <Wishlist /> },
          { path: '/savings', element: <Savings /> },
          { path: '/wishlist/:id', element: <WishlistDetail /> },
          { path: '/wishlist/archive', element: <WishlistArchive /> },
          { path: '/profile', element: <Profile /> },
        ],
      },
    ],
  },
  { path: '/auth/callback', element: <AuthCallback /> },
  { path: '*', element: <NotFound /> },
])
