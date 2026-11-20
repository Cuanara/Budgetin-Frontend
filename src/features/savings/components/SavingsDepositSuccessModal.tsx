import { Check } from 'lucide-react'
import Modal from '../../../components/ui/Modal'
import { formatRupiah } from '../../../utils/format'
import { useDepositSuccess } from '../hooks/useDepositSuccess'
import SavingsDepositProgress from './SavingsDepositProgress'

const SavingsDepositSuccessModal = () => {
  const { result, close } = useDepositSuccess()

  if (!result) return null

  return (
    <Modal open onClose={close} labelledBy="deposit-success-title">
      <div className="flex flex-col items-center text-center">
        <div className="grid size-20 place-items-center rounded-full bg-emerald-600 text-white">
          <Check size={36} strokeWidth={3} />
        </div>
        <h2
          id="deposit-success-title"
          className="mt-6 text-3xl font-semibold text-[#0F1F17]"
        >
          Setoran berhasil
        </h2>
        <p className="mt-4 text-sm text-emerald-900/80">
          {formatRupiah(result.amount)} masuk ke {result.goalName}.
        </p>
      </div>

      <SavingsDepositProgress
        from={result.beforePercent}
        to={result.afterPercent}
      />

      <p className="mt-4 text-center text-sm text-emerald-900/80">
        Saldo dompet sekarang {formatRupiah(result.balanceAfter)}
      </p>

      <button
        type="button"
        onClick={close}
        className="mt-6 w-full rounded-full bg-[#0F1F17] py-4 text-base font-medium text-white hover:bg-black"
      >
        Selesai
      </button>
    </Modal>
  )
}

export default SavingsDepositSuccessModal