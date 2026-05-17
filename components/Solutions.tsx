import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceAccordions } from "@/components/ServiceAccordions";

type TopicGroup = {
  title: string;
  items: string[];
};

export async function Solutions() {
  const t = await getTranslations("solutions");
  const groups = t.raw("groups") as TopicGroup[];
  const sectionId = t("id");

  return (
    <section
      id={sectionId}
      className="scroll-mt-20 border-y border-white/10 bg-jac-navy-900/40 py-16 sm:scroll-mt-24 md:scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading index={t("sectionIndex")} title={t("title")} intro={t("intro")} />
        </RevealOnScroll>

        <RevealOnScroll delayMs={80}>
          <p className="mt-6 max-w-3xl text-sm text-jac-silver-500 sm:mt-8 sm:text-base">
            {t("accordionLead")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={100}>
          <ServiceAccordions groups={groups} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
