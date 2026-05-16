import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export async function AboutSection() {
  const t = await getTranslations("about");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section
      id={t("id")}
      className="scroll-mt-28 border-t border-white/10 bg-jac-navy-900/40 py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="max-w-3xl font-semibold text-3xl tracking-tight text-white md:text-4xl">
            {t("title")}
          </h2>
        </RevealOnScroll>
        <div className="mt-10 max-w-3xl space-y-6">
          {paragraphs.map((p, i) => (
            <RevealOnScroll key={`ab-${i}`} delayMs={i * 70}>
              <p className="text-base leading-relaxed text-jac-silver-200 md:text-lg">{p}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
