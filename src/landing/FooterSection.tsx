import type { LegalId } from "../legal/LegalPanel";

type FooterSectionProps = {
  active: LegalId | null;
  onSelect: (id: LegalId) => void;
};

const links: { label: string; id: LegalId }[] = [
  { label: "Syarat dan Ketentuan", id: "syarat" },
  { label: "Kebijakan Privasi", id: "privasi" },
];

export const FooterSection = ({ active, onSelect }: FooterSectionProps) => {
  return (
    <footer className="w-full border-t border-[#dce9e1] bg-white px-5 md:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-3 px-0 py-6 md:flex-row md:px-10">
        <nav aria-label="Tautan legal">
          <ul className="flex items-center gap-6">
            {links.map((link) => {
              const selected = active === link.id;
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    aria-expanded={selected}
                    aria-current={selected ? "true" : undefined}
                    onClick={() => onSelect(link.id)}
                    className={`border-b-2 py-1 text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d452f] focus-visible:ring-offset-2 ${
                      selected
                        ? "border-[#0d452f] font-['Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#0d452f]"
                        : "border-transparent font-['Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-[#0e1a14] hover:text-[#0d452f]"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <p className="font-['Plus_Jakarta_Sans-Medium',Helvetica] text-[13px] font-medium text-[#5b6e63]">
          © {new Date().getFullYear()} Budgetin
        </p>
      </div>
    </footer>
  );
};