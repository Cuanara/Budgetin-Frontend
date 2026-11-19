import { useEffect, useRef, useState } from "react";
import { HeaderSection } from "./HeaderSection";
import { HeroSection } from "./HeroSection";
import { BudgetingFeaturesSection } from "./BudgetingFeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { WishlistCheckoutSection } from "./WishlistCheckoutSection";
import { FaqSection } from "./FaqSection";
import { CtaSection } from "./CtaSection";
import { FooterSection } from "./FooterSection";
import { LegalPanel, type LegalId } from "../legal/LegalPanel";

export const LandingPage = () => {
  const [openLegal, setOpenLegal] = useState<LegalId | null>(null);
  const legalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openLegal) {
      legalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [openLegal]);

  const handleSelect = (id: LegalId) => {
    if (id === openLegal) {
      legalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setOpenLegal(id);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#f5faf7]">
      <HeaderSection />

      <main className="[background:radial-gradient(50%_50%_at_8%_30%,rgba(196,242,218,1)_0%,rgba(196,242,218,0)_70%),radial-gradient(50%_50%_at_70%_40%,rgba(211,241,238,1)_0%,rgba(211,241,238,0)_70%),linear-gradient(0deg,rgba(245,250,247,1)_0%,rgba(245,250,247,1)_100%)]">
        <HeroSection />
        <BudgetingFeaturesSection />
      </main>

      <HowItWorksSection />
      <WishlistCheckoutSection />
      <FaqSection />
      <CtaSection />
      <FooterSection active={openLegal} onSelect={handleSelect} />

      <div ref={legalRef} className="scroll-mt-4">
        {openLegal && <LegalPanel active={openLegal} />}
      </div>
    </div>
  );
};