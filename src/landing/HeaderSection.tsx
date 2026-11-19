import logo from "../assets/logo.png";

export const HeaderSection = () => {
  const navigationItems = [
  { label: "Fitur", href: "#fitur" },
  { label: "Cara kerja", href: "#cara-kerja" },
  { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="absolute top-0 left-0 z-10 flex h-21.25 w-full flex-col items-start border-b border-[#dce9e1] bg-white px-30 py-0">
      <div className="relative flex h-21 w-full max-w-300 items-center justify-between px-10 py-0">
        <a
          className="inline-flex h-21 items-center gap-3"
          href="/"
          aria-label="Budgetin beranda"
        >
        <span
            className="relative h-11 w-11 rounded-[13px] bg-cover bg-center"
            style={{ backgroundImage: `url(${logo})` }}
            role="img"
            aria-label="Logo Budgetin"
        />
          <span className="inline-flex flex-col items-start">
            <span className="relative -mt-px flex w-fit items-center font-['Plus_Jakarta_Sans-Bold',Helvetica] text-2xl font-bold leading-[normal] tracking-[-0.50px] text-[#0e1a14]">
              Budgetin
            </span>
          </span>
        </a>
        <nav aria-label="Navigasi utama">
          <ul className="inline-flex items-start gap-1.5">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  className="inline-flex flex-col items-start px-4.5 py-3 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] text-[15px] font-medium leading-[normal] tracking-[0] text-[#5b6e63] transition-colors hover:text-[#0d452f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d452f] focus-visible:ring-offset-2"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="inline-flex h-21 items-center gap-2">
          <a
            className="inline-flex h-10 items-center justify-center rounded-[22px] border border-solid border-[#dce9e1] bg-white px-5 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] text-sm font-bold leading-[normal] tracking-[0] text-[#0e1a14] transition-colors hover:bg-[#f5f9f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d452f] focus-visible:ring-offset-2"
            href="#masuk"
          >
            Masuk
          </a>
          <a
            className="inline-flex h-10 items-center justify-center rounded-[22px] bg-[#0d452f] px-5 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] text-sm font-bold leading-[normal] tracking-[0] text-white transition-colors hover:bg-[#0a3826] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d452f] focus-visible:ring-offset-2"
            href="#daftar"
          >
            Daftar
          </a>
        </div>
      </div>
    </header>
  );
};
