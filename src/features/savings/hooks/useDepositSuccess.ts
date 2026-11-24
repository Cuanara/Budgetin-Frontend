import { useSavingsStore } from '../../../stores/savingsStore'

export const useDepositSuccess = () => {
  const result = useSavingsStore((s) => s.depositResult)
  const close = useSavingsStore((s) => s.closeDepositSuccess)

  return { result, close }
}