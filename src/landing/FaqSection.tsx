import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "Apakah Budgetin gratis?",
    answer:
      "Ya. Budgetin tidak berbayar, anda cukup membuat akun untuk mulai memakainya.",
  },
  {
    question: "Apa itu masa tunda di wishlist?",
    answer:
      "Masa tunda adalah jeda 7 atau 14 hari sebelum anda memutuskan membeli barang incaran. Setelah waktunya habis, Budgetin menanyakan: jadi dibeli atau tidak?",
  },
  {
    question: "Bagaimana status siap dibeli ditentukan?",
    answer:
      "Budgetin membandingkan saldo tabunganmu dengan harga barang. Jika saldo cukup, statusnya siap dibeli. Jika belum, anda melihat persentase progress dan sisa nominal yang kurang.",
  },
  {
    question: "Bagaimana kalau saldo saya belum cukup?",
    answer:
      "Anda mendapat saran untuk menabung dan notifikasi muncul saat saldomu sudah cukup.",
  },
  {
    question: "Apakah saya harus punya akun dulu?",
    answer:
      "Ya, anda perlu mendaftar dan masuk dulu sebelum mencatat transaksi atau membuat wishlist.",
  },
];

export const FaqSection = () => {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="w-full scroll-mt-24 bg-[#f5faf7] px-5 pt-24 pb-16 md:px-[120px]"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-3.5 px-0 md:px-10">
        <h2
          id="faq-title"
          className="text-center font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[44px] font-bold leading-[48.4px] tracking-[-1.20px] text-[#0e1a14]"
        >
          Pertanyaan yang sering muncul
        </h2>
        <p className="text-center font-['Plus_Jakarta_Sans-Medium',Helvetica] text-lg font-medium leading-[27px] text-[#5b6e63]">
          Belum nemu jawabannya? Daftar saja dan coba langsung.
        </p>

        <ul className="mt-[34px] flex w-full max-w-[720px] flex-col gap-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            const buttonId = `${baseId}-button-${index}`;
            const panelId = `${baseId}-panel-${index}`;

            return (
              <li key={faq.question}>
                <div className="rounded-[18px] bg-white shadow-[0px_6px_24px_#12785014] transition-shadow duration-300 hover:shadow-[0px_10px_32px_#1278502e]">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full items-center justify-between gap-4 rounded-[18px] px-5 py-[18px] text-left font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[15px] font-bold text-[#0e1a14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d452f] focus-visible:ring-offset-2"
                    >
                      {faq.question}
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-[18px] w-[18px] shrink-0 text-[#5b6e63] transition-transform duration-300 motion-reduce:transition-none ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                      open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 font-['Plus_Jakarta_Sans-Medium',Helvetica] text-[13px] font-medium leading-[20px] text-[#5b6e63]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};