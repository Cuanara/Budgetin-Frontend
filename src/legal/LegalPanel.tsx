import { TermsPage } from "./TermsPage";
import { PrivacyPage } from "./PrivacyPage";

export type LegalId = "syarat" | "privasi";

type LegalPanelProps = {
  active: LegalId;
};

export const LegalPanel = ({ active }: LegalPanelProps) => {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-[920px]">
        {active === "syarat" ? <TermsPage /> : <PrivacyPage />}
      </div>
    </div>
  );
};