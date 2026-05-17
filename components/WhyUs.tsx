import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";

export async function WhyUs() {
  const t = await getTranslations("whyUs");
  const items = t.raw("items") as string[];
  const n = items.length;
  const lastIsOrphanInTwoCol = n % 2 === 1;

  return (
    <section
      id={t("id")}
      className="scroll-mt-20 border-b border-white/10 bg-black/30 py-16 sm:scroll-mt-24 md:scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading index={t("sectionIndex")} title={t("title")} intro={t("intro")} />
        </RevealOnScroll>

        <RevealOnScroll delayMs={50}>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-jac-blue-bright sm:mt-10">
            {t("deliverHeading")}
          </h3>
        </RevealOnScroll>

        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {items.map((item, i) => {
            const isLast = i === n - 1;
            const orphan2 =
              lastIsOrphanInTwoCol && isLast
                ? "sm:col-span-2 sm:mx-auto sm:max-w-xl md:max-w-2xl lg:col-span-1 lg:mx-0 lg:max-w-none"
                : "";

            return (
            <li key={`why-${i}`} className={`min-w-0 ${orphan2}`}>
              <RevealOnScroll
                delayMs={i * 75}
                className="flex h-full min-h-full gap-3 rounded-lg border border-white/10 bg-jac-navy-950/35 p-4 text-sm leading-snug text-jac-silver-100 sm:gap-4 sm:p-5 sm:text-[0.9375rem] lg:p-6 lg:text-base"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-jac-blue-accent/55 text-[0.875rem] text-white shadow-inner"
                  aria-hidden
                >
                  ✓
                </span>
                <span className="text-pretty">{item}</span>
              </RevealOnScroll>
            </li>
            );
          })}
        </ul>

        <RevealOnScroll delayMs={120}>
          <p className="mt-10 max-w-4xl rounded-lg border border-jac-blue-bright/30 bg-jac-blue-accent/10 px-5 py-5 text-base leading-relaxed text-jac-silver-100 sm:mt-14 sm:px-8 sm:py-6 sm:text-lg">
            {t("closing")}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
