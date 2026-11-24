import { useEffect, useRef, useState } from "react";

type Decision = "buy" | "skip";

const steps = [
  {
    number: "1",
    content:
      "Tambahkan wishlist dengan link pembelian dan atur masa tunda 7 atau 14 hari.",
  },
  {
    number: "2",
    content: "Saat masa tunda habis, anda ditanya: jadi dibeli atau tidak?",
  },
  {
    number: "3",
    content:
      "Jika saldo cukup, anda diarahkan ke link pembelian. Jika belum, ada saran untuk menabung dulu.",
  },
];

const decisions: { value: Decision; label: string }[] = [
  { value: "buy", label: "Jadi" },
  { value: "skip", label: "Tidak jadi" },
];

export const WishlistCheckoutSection = () => {
  const [decision, setDecision] = useState<Decision>("buy");
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const reveal = `transition-[opacity,translate] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
    visible
      ? "translate-y-0 opacity-100"
      : "translate-y-16 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
  }`;

  return (
    <section
      aria-labelledby="wishlist-checkout-title"
      className="w-full bg-[#0b3d24] px-[120px] py-24 max-lg:px-6 max-md:px-5 max-md:py-14"
    >
      <div
        ref={containerRef}
        className="mx-auto grid w-full max-w-[1200px] grid-cols-2 items-center gap-16 px-10 max-lg:grid-cols-1 max-lg:gap-10 max-lg:px-0"
      >
        <div className={`flex flex-col items-start gap-4 ${reveal}`}>
          <h2
            id="wishlist-checkout-title"
            className="font-['Plus_Jakarta_Sans-Bold',Helvetica] text-5xl font-bold leading-[51.8px] tracking-[-1.40px] max-md:text-[34px] max-md:leading-[38px] max-md:tracking-[-1px]"
          >
            <span className="block text-white">Tahan dulu,</span>
            <span className="block text-[#7ad9ae]">baru checkout.</span>
          </h2>
          <p className="max-w-[500px] font-['Plus_Jakarta_Sans-Medium',Helvetica] text-[19px] font-medium leading-[29.5px] text-[#ffffffd1] max-md:text-base max-md:leading-6">
            Simpan link barang incaranmu, pilih masa tunda, dan biarkan
            Budgetin yang mengingatkan.
          </p>
          <ol className="m-0 flex list-none flex-col gap-3.5 p-0 pt-3">
            {steps.map((step) => (
              <li key={step.number} className="flex items-start gap-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7ad9ae] font-['Plus_Jakarta_Sans-Bold',Helvetica] text-sm font-bold text-[#0b3d24]">
                  {step.number}
                </span>
                <p className="max-w-[460px] font-['Plus_Jakarta_Sans-Medium',Helvetica] text-base font-medium leading-[23.2px] text-white">
                  {step.content}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div
          className={`flex flex-col gap-4 ${reveal}`}
          style={{ transitionDelay: visible ? "200ms" : "0ms" }}
        >
          <article className="flex flex-col items-start gap-1.5 rounded-[26px] bg-white p-[22px] shadow-[0px_10px_36px_#1278501f]">
            <p className="font-['Plus_Jakarta_Sans-Bold',Helvetica] text-xs font-bold text-[#0f6b2c]">
              MASA TUNDA BERAKHIR
            </p>
            <h3 className="font-['Plus_Jakarta_Sans-Bold',Helvetica] text-2xl font-bold tracking-[-0.50px] text-[#0e1a14] max-md:text-lg">
              Headphone nirkabel, jadi dibeli?
            </h3>
            <div className="flex items-start gap-2.5 pt-3">
              {decisions.map(({ value, label }) => {
                const active = decision === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setDecision(value)}
                    className={`inline-flex h-11 items-center justify-center rounded-[22px] px-6 font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[15px] font-bold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d452f] focus-visible:ring-offset-2 ${
                      active
                        ? "bg-[#0d452f] text-white"
                        : "border border-solid border-[#dce9e1] bg-white text-[#0e1a14] hover:bg-[#f5f9f6]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </article>

          <article className="flex items-center justify-between gap-4 rounded-[26px] bg-white p-[22px] shadow-[0px_10px_36px_#1278501f]">
            <div className="flex flex-col">
              <p className="font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[17px] font-bold text-[#0e1a14]">
                Sepatu lari
              </p>
              <p className="font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[13px] font-bold text-[#5b6e63]">
                Progress 100% dari Rp 850.000
              </p>
            </div>
            <span className="shrink-0 rounded-xl bg-[#ddf5e3] px-3 py-[5px] font-['Plus_Jakarta_Sans-Bold',Helvetica] text-xs font-bold text-[#0f6b2c]">
              Siap dibeli
            </span>
          </article>
        </div>
      </div>
    </section>
  );
};