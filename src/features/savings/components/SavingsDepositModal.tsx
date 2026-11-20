import { AlertCircle, Check, Wallet, X } from 'lucide-react'
import Modal from '../../../components/ui/Modal'
import { formatRupiah } from '../../../utils/format'
import { useDepositModal } from '../hooks/useDepositModal'
import { SAVINGS_ICONS } from '../savingsIcons'

const SavingsDepositModal = () => {
  const {
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
  } = useDepositModal()

  if (!goal) return null

  const displayAmount = digits
    ? new Intl.NumberFormat('id-ID').format(amount)
    : ''

  return (
    <Modal open onClose={close} labelledBy="deposit-title">
      <div className="flex items-center justify-between">
        <h2 id="deposit-title" className="text-2xl font-medium text-gray-900">
          Setor ke target
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Tutup"
          className="grid size-11 place-items-center rounded-full bg-emerald-50 text-[#0B3B24] hover:bg-emerald-100"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-4 rounded-2xl bg-emerald-50/70 p-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-[#0B3B24]">
          {SAVINGS_ICONS[goal.icon]}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-900">{goal.name}</p>
          <p className="text-xs text-gray-600">
            {formatRupiah(goal.saved)} dari {formatRupiah(goal.target)}
          </p>
        </div>
      </div>

      <label htmlFor="deposit-amount" className="mt-6 block text-xs text-gray-600">
        Jumlah setoran
      </label>
      <div className="mt-1 flex items-baseline gap-2 text-5xl font-medium text-gray-900">
        <span>Rp</span>
        <input
          id="deposit-amount"
          value={displayAmount}
          onChange={(e) => changeAmount(e.target.value)}
          inputMode="numeric"
          autoComplete="off"
          autoFocus
          placeholder="0"
          className="w-full min-w-0 bg-transparent outline-none placeholder:text-gray-300"
        />
      </div>

      <div className="mt-5 flex items-center gap-4 rounded-2xl bg-emerald-50/70 p-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-[#0B3B24]">
          <Wallet size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">Saldo dompet</p>
          <p className="text-xs text-gray-600">{formatRupiah(balance)}</p>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${
            enough ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
          }`}
        >
          {enough ? <Check size={12} /> : <AlertCircle size={12} />}
          {enough ? 'Saldo cukup' : 'Saldo kurang'}
        </span>
      </div>

      {enough ? (
        <>
          <div className="mt-5 flex items-baseline justify-between text-sm">
            <span className="text-gray-600">Setelah setor</span>
            <span className="font-medium text-gray-900">
              {formatRupiah(afterSaved)} · {afterPercent}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={afterPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-2 h-2.5 w-full rounded-full bg-gray-100"
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${afterPercent}%` }}
            />
          </div>

          <div className="mt-6 grid grid-cols-[1fr_1.6fr] gap-3">
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-gray-200 bg-white py-3.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit}
              className="rounded-full bg-[#0F1F17] py-3.5 text-sm font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              Setor sekarang
            </button>
          </div>
        </>
      ) : (
        <>
          <p
            role="alert"
            className="mt-5 flex gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-700"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>
              Saldo dompet kurang {formatRupiah(shortfall)} untuk setoran ini.
              Kurangi jumlah atau pilih sumber dana lain.
            </span>
          </p>

          <div className="mt-5 grid grid-cols-[1.4fr_1fr] gap-3">
            <button
              type="button"
              onClick={submitMax}
              disabled={!canSubmitMax}
              className="rounded-full border border-gray-200 bg-white py-3.5 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Setor {formatRupiah(balance)} saja
            </button>
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-gray-200 py-3.5 text-sm font-medium text-gray-500"
            >
              Setor
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}

export default SavingsDepositModal
