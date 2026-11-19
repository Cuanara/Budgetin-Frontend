import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TermsPage } from "./TermsPage";
import { PrivacyPage } from "./PrivacyPage";

const tabs = [
  { label: "Syarat dan Ketentuan", id: "syarat" },
  { label: "Kebijakan Privasi", id: "privasi" },
];

export const LegalPage = () => {
  const { hash } = useLocation();
  const [activeId, setActiveId] = useState("syarat");

  // Dibuka dari footer (/legal#privasi): langsung ke bagian yang dituju
  useEffect(() => {
    const id = hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target) {
      target.scrollIntoView({ block: "start" });
      setActiveId(id);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  // Tab aktif mengikuti bagian yang sedang dibaca
  useEffect(() => {
    const elements = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleTabClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <div className="min-h-screen w-full bg-[#f5faf7]">
      <div className="sticky top-0 z-40 border-b border-[#dce9e1] bg-white">
        <div className="mx-auto flex w-full max-w-[920px] items-center justify-between gap-4 px-5">
          <nav aria-label="Dokumen legal" className="flex items-center gap-5">
            {tabs.map((tab) => {
              const active = activeId === tab.id;
              return (
                <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  onClick={(e) => handleTabClick(e, tab.id)}
                  aria-current={active ? "location" : undefined}
                  className={`-mb-px border-b-2 py-3.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d452f] focus-visible:ring-offset-2 ${
                    active
                      ? "border-[#0d452f] font-['Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#0d452f]"
                      : "border-transparent font-['Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-[#5b6e63] hover:text-[#0d452f]"
                  }`}
                >
                  {tab.label}
                </a>
              );
            })}
          </nav>
          <p className="font-['Plus_Jakarta_Sans-Medium',Helvetica] text-xs font-medium text-[#5b6e63]">
            © {new Date().getFullYear()} Budgetin
          </p>
        </div>
      </div>

      <main>
        <TermsPage />
        <PrivacyPage />
      </main>
    </div>
  );
};