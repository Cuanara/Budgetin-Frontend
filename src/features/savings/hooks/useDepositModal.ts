import { useState } from 'react'
import { useBalanceStore } from '../../../stores/balanceStore'
import { useSavingsStore } from '../../../stores/savingsStore'
import { calcPercent } from '../../../utils/savings'

const MAX_DIGITS = 10

export const useDepositModal = () => {
  const goal = useSavingsStore((s) =>
    s.goals.find((g) => g.id === s.depositGoalId),
  )
  const closeDeposit = useSavingsStore((s) => s.closeDeposit)
  const deposit = useSavingsStore((s) => s.deposit)
  const showDepositSuccess = useSavingsStore((s) => s.showDepositSuccess)
  const balance = useBalanceStore((s) => s.balance)
  const setBalance = useBalanceStore((s) => s.setBalance)
  const [digits, setDigits] = useState('')

  const amount = Number(digits) || 0
  const enough = amount <= balance
  const shortfall = Math.max(0, amount - balance)
  const canSubmit = !!goal && amount > 0 && enough
  const canSubmitMax = !!goal && balance > 0

  const saved = goal?.saved ?? 0
  const target = goal?.target ?? 0
  const afterSaved = saved + amount
  const afterPercent = calcPercent(afterSaved, target)

  const changeAmount = (raw: string) => {
    setDigits(raw.replace(/\D/g, '').slice(0, MAX_DIGITS).replace(/^0+/, ''))
  }

  const close = () => {
    setDigits('')
    closeDeposit()
  }

  const finish = (value: number) => {
    if (!goal || value <= 0) return
    const balanceAfter = balance - value

    // TODO: ganti dengan POST setoran ke BE (BE yang mengurangi saldo)
    deposit(goal.id, value)
    setBalance(balanceAfter)
    showDepositSuccess({
      goalName: goal.name,
      amount: value,
      beforePercent: calcPercent(goal.saved, goal.target),
      afterPercent: calcPercent(goal.saved + value, goal.target),
      balanceAfter,
    })
    setDigits('')
  }

  const submit = () => {
    if (canSubmit) finish(amount)
  }

  // Setor sebesar saldo dompet saja
  const submitMax = () => {
    if (canSubmitMax) finish(balance)
  }

  return {
    goal,
    balance,
    digits,
    amount,
    enough,
    shortfall,
    canSubmit,
    canSubmitMax,
    afterSaved,
    afterPercent,
    changeAmount,
    close,
    submit,
    submitMax,
  }
}