
import { Bell } from 'lucide-react'
import { formatToday } from '../../utils/format'

interface Props {
  title: string
}

const PageHeader = ({ title }: Props) => (
  <header className="flex items-start justify-between">
    <div>
      <p className="text-xs text-gray-500">{formatToday()}</p>
      <h1 className="text-3xl font-semibold text-[#0B3B24]">{title}</h1>
    </div>
    <button
      type="button"
      aria-label="Notifikasi"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
    >
      <Bell size={18} />
    </button>
  </header>
)

export default PageHeader