export const CtaSection = () => {
  return (
    <section
      aria-labelledby="cta-title"
      className="w-full bg-[#f5faf7] px-5 pt-8 pb-24 md:px-[120px]"
    >
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-3 rounded-[28px] bg-[#e4f9e9] px-10 py-14 text-center">
        <h2
          id="cta-title"
          className="font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[40px] font-bold leading-[44px] tracking-[-1.20px] text-[#0d452f]"
        >
          Siap bikin duitmu lebih rapi?
        </h2>
        <p className="font-['Plus_Jakarta_Sans-Medium',Helvetica] text-base font-medium text-[#5b6e63]">
          Daftar dan mulai catat hari ini.
        </p>
        <a
          href="#daftar"
          className="mt-3 inline-flex h-11 items-center justify-center rounded-[22px] bg-[#0d452f] px-6 font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[15px] font-bold text-white transition-colors hover:bg-[#0a3826] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d452f] focus-visible:ring-offset-2"
        >
          Daftar
        </a>
      </div>
    </section>
  );
};