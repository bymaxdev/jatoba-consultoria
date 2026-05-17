import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";

export async function AboutSection() {
  const t = await getTranslations("about");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section
      id={t("id")}
      className="scroll-mt-20 border-b border-white/10 bg-jac-navy-950 py-16 sm:scroll-mt-24 md:scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading index={t("sectionIndex")} title={t("title")} intro={t("intro")} />
        </RevealOnScroll>
        <div className="mt-10 max-w-3xl space-y-6 sm:mt-14">
          {paragraphs.map((p, i) => (
            <RevealOnScroll key={`about-p-${i}`} delayMs={i * 85}>
              <p className="text-base leading-relaxed text-jac-silver-200 sm:text-lg">{p}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
