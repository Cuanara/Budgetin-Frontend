export type LegalSection = {
  title: string;
  body: string;
};

type LegalDocumentProps = {
  id: string;
  title: string;
  updatedAt: string;
  description: string;
  sections: LegalSection[];
};

export const LegalDocument = ({
  id,
  title,
  updatedAt,
  description,
  sections,
}: LegalDocumentProps) => {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mx-auto w-full max-w-[920px] px-5 pt-10 pb-16 max-md:pt-8 max-md:pb-12"
    >
      <span className="inline-flex rounded-[20px] border border-solid border-[#dce9e1] bg-white px-3 py-1.5 font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[11px] font-bold text-[#0e1a14]">
        Terakhir diperbarui: {updatedAt}
      </span>
      <h1
        id={`${id}-title`}
        className="mt-4 font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[44px] font-bold leading-[48.4px] tracking-[-1.20px] text-[#0d452f] max-md:text-[32px] max-md:leading-9 max-md:tracking-[-0.8px]"
      >
        {title}
      </h1>
      <p className="mt-3 max-w-[420px] font-['Plus_Jakarta_Sans-Medium',Helvetica] text-[15px] font-medium leading-[23.2px] text-[#5b6e63] max-md:max-w-none">
        {description}
      </p>

      <article className="mt-8 flex flex-col gap-6 rounded-[26px] border border-[#dce9e1] bg-white p-8 shadow-[0px_10px_36px_#1278501f max-md:p-5 max-md:gap-5 max-md:rounded-[22px]">
        {sections.map((section, index) => (
          <section
            key={section.title}
            aria-labelledby={`${id}-section-${index}`}
          >
            <h2
              id={`${id}-section-${index}`}
              className="font-['Plus_Jakarta_Sans-Bold',Helvetica] text-[17px] font-bold text-[#0d452f]"
            >
              {index + 1}. {section.title}
            </h2>
            <p className="mt-2 font-['Plus_Jakarta_Sans-Medium',Helvetica] text-[13px] font-medium leading-[20px] text-[#5b6e63]">
              {section.body}
            </p>
          </section>
        ))}
      </article>
    </section>
  );
};