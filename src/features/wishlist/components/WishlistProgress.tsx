interface Props {
  percent: number
}

const WishlistProgress = ({ percent }: Props) => (
  <div
    tabIndex={0}
    className="group relative mt-9 cursor-pointer py-2 outline-none"
  >
    <span
      className="pointer-events-none absolute -top-6 rounded-full bg-[#0F1F17] px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus:opacity-100"
      style={{
        left: `${percent}%`,
        transform: `translateX(-${percent}%)`,
      }}
    >
      {percent}%
    </span>
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-2.5 w-full rounded-full bg-gray-100"
    >
      <div
        className="h-full rounded-full bg-emerald-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
)

export default WishlistProgress