export type SavingsIcon = 'shield' | 'plane' | 'graduation' | 'gift'

export interface SavingsGoal {
  id: string
  name: string
  saved: number
  target: number
  icon: SavingsIcon
}

export type DepositMethod = 'Transfer' | 'Tunai'

export interface SavingsDeposit {
  id: string
  goalName: string
  date: string // sudah berformat tampil, contoh '10 Nov'
  method: DepositMethod
  amount: number
}

// Ringkasan setoran yang baru selesai, dipakai popup "Setoran berhasil"
export interface SavingsDepositResult {
  goalName: string
  amount: number
  beforePercent: number
  afterPercent: number
  balanceAfter: number // saldo dompet setelah setoran
}