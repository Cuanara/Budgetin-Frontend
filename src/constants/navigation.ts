import { Clock, Heart, Home, PieChart, Wallet } from 'lucide-react'
import type { NavItem } from '../types/navigation'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda', path: '/beranda', icon: Home },
  { label: 'Wishlist', path: '/wishlist', icon: Heart },
  { label: 'Budget', path: '/budget', icon: PieChart },
  { label: 'Tabungan', path: '/tabungan', icon: Wallet },
  { label: 'Riwayat Transaksi', path: '/riwayat-transaksi', icon: Clock },
]
