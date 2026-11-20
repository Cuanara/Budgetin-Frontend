import { GraduationCap, Gift, Send, Shield } from 'lucide-react'
import type { ReactNode } from 'react'
import type { SavingsIcon } from '../../types/savings'

export const SAVINGS_ICONS: Record<SavingsIcon, ReactNode> = {
  shield: <Shield size={18} />,
  plane: <Send size={18} />,
  graduation: <GraduationCap size={18} />,
  gift: <Gift size={18} />,
}
