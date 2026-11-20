import { Clock, Heart, Home, PieChart, Wallet } from 'lucide-react'
import type { NavItem } from '../types/navigation'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda', path: '/dashboard', icon: Home },
  { label: 'Wishlist', path: '/wishlist', icon: Heart },
  { label: 'Budget', path: '/budget', icon: PieChart },
  { label: 'Tabungan', path: '/savings', icon: Wallet },
  { label: 'Riwayat Transaksi', path: '/transactions', icon: Clock },
]
