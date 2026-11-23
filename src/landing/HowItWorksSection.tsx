import { useEffect, useRef, useState } from "react";

type HowItWorksStep = {
  number: string;
  title: string;
  description: string;
};

const steps: HowItWorksStep[] = [
  {
    number: "1",
    title: "Atur budget",
    description: "Masukkan pemasukan utama, lalu bagi ke kategori pengeluaran.",
  },
  {
    number: "2",
    title: "Catat transaksi",
    description:
      "Isi nominal, kategori, tanggal, dan catatan. Saldo dan budget ikut diperbarui.",
  },
  {
    number: "3",
    title: "Pantau tabungan",
    description:
      "Lihat saldo, riwayat, dan progress wishlist di satu tempat.",
  },
];

export const HowItWorksSection = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = listRef.current;
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
      id="cara-kerja"
      aria-labelledby="how-it-works-title"
      className="w-full scroll-mt-24 bg-white px-[120px] pt-[95px] pb-24 max-lg:px-6 max-md:px-5 max-md:pt-14 max-md:pb-14"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-3.5 px-10 max-lg:px-0">
        <h2
          id="how-it-works-title"
          className="text-center font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[44px] font-bold leading-[48.4px] tracking-[-1.20px] text-[#0e1a14] max-md:text-[28px] max-md:leading-8 max-md:tracking-[-0.8px]"
        >
          Cara kerjanya gampang
        </h2>
        <p className="text-center font-['Plus_Jakarta_Sans-Medium',Helvetica] text-lg font-medium leading-[27px] text-[#5b6e63] max-md:text-base">
          Tiga langkah dan duitmu langsung lebih tertata.
        </p>

        <ol
          ref={listRef}
          className="mt-[34px] flex w-full items-start justify-center gap-8 max-md:flex-col max-md:items-stretch max-md:gap-8"
        >
          {steps.map((step, index) => (
        <li
            key={step.number}
            style={{ transitionDelay: visible ? `${index * 250}ms` : "0ms" }}
            className={`flex flex-1 grow flex-col items-start gap-3 transition-[opacity,translate] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-md:flex-none ${
            visible
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
            }`}
        >
              <div
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#0d452f] font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[22px] font-bold text-white"
              >
                {step.number}
              </div>
              <h3 className="font-['Plus_Jakarta_Sans-Bold',Helvetica] text-xl font-bold text-[#0e1a14]">
                {step.title}
              </h3>
              <p className="max-w-[334px] font-['Plus_Jakarta_Sans-Medium',Helvetica] text-[15px] font-medium leading-[23.2px] text-[#5b6e63]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};