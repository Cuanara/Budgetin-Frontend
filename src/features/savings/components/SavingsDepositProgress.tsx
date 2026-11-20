import { useAnimatedPercent } from '../hooks/useAnimatedPercent'

interface Props {
  from: number
  to: number
}

const SavingsDepositProgress = ({ from, to }: Props) => {
  const percent = useAnimatedPercent(from, to)

  return (
    <div className="mt-8">
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-emerald-900/80">{from}%</span>
        <span className="font-semibold text-[#0F1F17]">{to}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={to}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2 h-2.5 w-full rounded-full bg-emerald-50"
      >
        <div
          className="h-full rounded-full bg-emerald-500 transition-[width] duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default SavingsDepositProgress