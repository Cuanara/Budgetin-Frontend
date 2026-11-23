import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-budgetin.png";

const navigationItems = [
  { label: "Fitur", href: "#fitur" },
  { label: "Cara kerja", href: "#cara-kerja" },
  { label: "FAQ", href: "#faq" },
];

const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
  const target = document.querySelector(href);
  if (!target) return;

  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", href);
};

export const HeaderSection = () => {
  return (
    <header className="sticky top-0 z-50 flex h-21.25 w-full flex-col items-start border-b border-[#dce9e1] bg-white px-30 py-0 max-lg:px-6 max-md:px-4"> 
      <div className="relative flex h-21 w-full max-w-300 items-center justify-between px-10 py-0 max-lg:px-0">
      <Link
        className="inline-flex h-21 items-center"
        to="/"
        aria-label="Budgetin beranda"
      >
        <img src={logo} alt="Budgetin" className="h-11 w-auto max-md:h-9" />
      </Link>
        <nav aria-label="Navigasi utama" className="max-md:hidden">
          <ul className="inline-flex items-start gap-1.5">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  className="inline-flex flex-col items-start px-4.5 py-3 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] text-[15px] font-medium leading-[normal] tracking-[0] text-[#5b6e63] transition-colors hover:text-[#0d452f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d452f] focus-visible:ring-offset-2 max-lg:px-3"
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="inline-flex h-21 items-center gap-2">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-[22px] border border-solid border-[#dce9e1] bg-white px-5 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] text-sm font-bold leading-[normal] tracking-[0] text-[#0e1a14] transition-colors hover:bg-[#f5f9f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d452f] focus-visible:ring-offset-2"
            to="/login"
          >
            Masuk
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-[22px] bg-[#0d452f] px-5 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] text-sm font-bold leading-[normal] tracking-[0] text-white transition-colors hover:bg-[#0a3826] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d452f] focus-visible:ring-offset-2"
            to="/register"
          >
            Daftar
          </Link>
        </div>
      </div>
    </header>
  );
};