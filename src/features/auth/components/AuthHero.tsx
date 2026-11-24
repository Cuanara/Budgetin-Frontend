import clsx from 'clsx'

export default function AuthHero({ className }: { className?: string }) {
  return (
    <aside
      className={clsx(
        'relative flex-col overflow-hidden text-white',
        'bg-linear-to-br from-[#0e6b44] via-primary to-[#06301f]',
        className,
      )}
    >
      {/* Koin dekoratif */}
      <img src="/images/koin.png" alt="" className="absolute right-[12%] top-[4%] w-[9%]" />
      <img src="/images/koin2.png" alt="" className="absolute right-[26%] top-[20%] w-[5%]" />

      {/* Teks */}
      <div className="relative z-10 px-[8%] pt-[4vh]">
        <img src="/images/logo.png" alt="Budgetin" className="h-10 w-auto xl:h-14" />

        <h1 className="mt-[3vh] text-3xl font-extrabold leading-[1.1] xl:text-5xl">
          Duit rapi,
          <br />
          <span className="text-mint">wishlist kebeli.</span>
        </h1>
        <p className="mt-3 max-w-md text-xs leading-relaxed text-white/90 xl:text-sm">
          Catat pemasukan dan pengeluaran, atur budget bulanan, dan tahan belanja
          impulsif lewat wishlist.
        </p>
      </div>

      {/* Mockup: ambil sisa tinggi panel, disembunyikan jika layar terlalu pendek */}
     <div className="relative z-10 flex min-h-0 flex-1 items-end justify-center px-[4%] pb-[3vh] pt-[2vh] [@media(max-height:500px)]:hidden">
        <div className="relative aspect-607/400 h-full max-h-full max-w-full">
          <img
            src="/images/border.png"
            alt=""
            className="absolute right-[-8%] top-[-18%] w-[85%] opacity-60"
          />

          <img
            src="/images/laptop.png"
            alt="Dashboard Budgetin"
            className="absolute left-0 top-[8%] w-[88%]"
          />

          <img
            src="/images/tablet.png"
            alt="Wishlist Budgetin"
            className="absolute right-0 top-[22%] w-[42%]"
          />

          <div className="absolute right-[2%] top-[-2%] flex items-center gap-2 whitespace-nowrap rounded-full bg-amber-300 px-3 py-1.5 text-[10px] font-bold text-gray-900 shadow-lg xl:px-4 xl:py-2 xl:text-sm">
            <span className="grid size-5 place-items-center rounded-full bg-white text-xs">+</span>
            Rp 1.500.000
            <span className="font-medium">Uang saku</span>
          </div>

          <div className="absolute bottom-[6%] left-[10%] rounded-2xl bg-white px-3 py-2 text-gray-900 shadow-xl xl:px-4 xl:py-2.5">
            <p className="text-[11px] font-bold leading-tight xl:text-sm">Transaksi berhasil disimpan</p>
            <p className="text-[9px] text-gray-500 xl:text-xs">Makan siang · -Rp 45.000</p>
          </div>

          <div className="absolute bottom-[-2%] left-[34%] rounded-full border border-white/30 bg-white/10 px-4 py-1 text-[10px] backdrop-blur xl:px-5 xl:py-1.5 xl:text-xs">
            Budget aman
          </div>
        </div>
      </div>
    </aside>
  )
}
