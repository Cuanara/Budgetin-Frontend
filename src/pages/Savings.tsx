import PageHeader from '../components/layout/PageHeader'
import SavingsDepositModal from '../features/savings/components/SavingsDepositModal'
import SavingsDepositSuccessModal from '../features/savings/components/SavingsDepositSuccessModal'
import SavingsGoalList from '../features/savings/components/SavingsGoalList'
import SavingsRecentDeposits from '../features/savings/components/SavingsRecentDeposits'
import SavingsSummary from '../features/savings/components/SavingsSummary'
import { useSavings } from '../features/savings/hooks/useSavings'

const Savings = () => {
  const {
    goals,
    deposits,
    total,
    monthlyGain,
    walletBalance,
    reachedCount,
    reachedPercent,
    activeCount,
    openDeposit,
  } = useSavings()

  return (
    <div className="space-y-6">
      <PageHeader title="Tabungan" />

      <SavingsSummary
        total={total}
        monthlyGain={monthlyGain}
        walletBalance={walletBalance}
        reachedCount={reachedCount}
        goalCount={goals.length}
        reachedPercent={reachedPercent}
      />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <SavingsGoalList
          goals={goals}
          activeCount={activeCount}
          onDeposit={openDeposit}
        />
        <SavingsRecentDeposits deposits={deposits} />
      </div>

      <SavingsDepositModal />
      <SavingsDepositSuccessModal />
    </div>
  )
}

export default Savings