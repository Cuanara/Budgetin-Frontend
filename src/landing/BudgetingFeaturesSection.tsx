import { useEffect, useRef, useState } from "react";

import {
  User,
  Plus,
  PieChart,
  History,
  Heart,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type BudgetingFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const budgetingFeatures: BudgetingFeature[] = [
  {
    title: "Akun pribadi",
    description:
      "Daftar dan masuk sekali, sesi aktif sampai 30 hari. Datamu tersimpan di akunmu.",
    icon: User,
  },
  {
    title: "Catat cepat",
    description:
      "Pemasukan atau pengeluaran, tinggal isi nominal, kategori, dan tanggal.",
    icon: Plus,
  },
  {
    title: "Budget per kategori",
    description:
      "Atur alokasi Makan, Transportasi, Jajan, dan lainnya dari pemasukan utamamu.",
    icon: PieChart,
  },
  {
    title: "Riwayat rapi",
    description:
      "Semua transaksi tersimpan rapi dan bisa difilter per tanggal atau kategori.",
    icon: History,
  },
  {
    title: "Wishlist pintar",
    description:
      "Simpan barang incaran, tunda belanja impulsif, dan pantau progresnya.",
    icon: Heart,
  },
  {
    title: "Tabungan dan progres",
    description:
      "Pantau saldo tabungan dan lihat seberapa dekat anda ke target.",
    icon: TrendingUp,
  },
];

export const BudgetingFeaturesSection = () => {
    const gridRef = useRef<HTMLDivElement>(null);
const [visible, setVisible] = useState(false);

useEffect(() => {
  const el = gridRef.current;
  if (!el) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -80px 0px" },
  );

  observer.observe(el);
  return () => observer.disconnect();
}, []);

  return (
    <section
      id="fitur"
      aria-labelledby="budgeting-features-title"
      className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-3.5 px-10 pt-24 pb-24 max-md:px-5 max-md:pt-14 max-md:pb-14"
    >
      <h2
        id="budgeting-features-title"
        className="text-center font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[44px] font-bold leading-[48.4px] tracking-[-1.20px] text-[#0e1a14] max-md:text-[28px] max-md:leading-8 max-md:tracking-[-0.8px]"
      >
        Semua yang kamu butuh buat ngatur duit
      </h2>
      <p className="text-center font-['Plus_Jakarta_Sans-Medium',Helvetica] text-lg font-medium leading-[27px] text-[#5b6e63] max-md:text-base">
        Simpel, cepat, dan tidak bikin pusing.
      </p>

<div ref={gridRef} className="mt-[34px] grid w-full grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
  {budgetingFeatures.map(({ title, description, icon: Icon }) => (
    <div
      key={title}
      className={`transition-[opacity,translate] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-16 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      }`}
    >
      <article className="group flex h-full cursor-default flex-col items-start gap-3 rounded-[26px] border border-transparent bg-white p-[22px] shadow-[0px_6px_24px_#12785014] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#7ad9ae] hover:shadow-[0px_18px_40px_#1278502e] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#cff3e0] transition-colors duration-300 group-hover:bg-[#0d452f]">
          <Icon
            className="h-6 w-6 text-[#0d452f] transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:text-white"
            aria-hidden="true"
          />
        </div>
        <h3 className="font-['Plus_Jakarta_Sans-Bold',Helvetica] text-xl font-bold text-[#0e1a14] transition-colors duration-300 group-hover:text-[#0d452f]">
          {title}
        </h3>
        <p className="font-['Plus_Jakarta_Sans-Medium',Helvetica] text-[15px] font-medium leading-[23.2px] text-[#5b6e63]">
          {description}
        </p>
      </article>
    </div>
  ))}
</div>
    </section>
  );
};