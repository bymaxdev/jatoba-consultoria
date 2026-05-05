import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export async function WhyUs() {
  const t = await getTranslations("whyUs");
  const items = t.raw("items") as string[];

  return (
    <section
      id={t("id")}
      className="scroll-mt-28 py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="max-w-2xl font-semibold text-3xl tracking-tight text-white md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-jac-silver-300">
            {t("intro")}
          </p>
        </RevealOnScroll>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-8">
          {items.map((item, i) => (
            <li key={item} className="min-w-0">
              <RevealOnScroll
                delayMs={i * 75}
                className="flex h-full gap-4 rounded-lg border border-white/10 bg-black/25 p-6 text-base leading-snug text-jac-silver-100"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-jac-blue-accent/55 text-[0.875rem] text-white shadow-inner"
                  aria-hidden
                >
                  ✓
                </span>
                <span>{item}</span>
              </RevealOnScroll>
            </li>
          ))}
        </ul>

        <RevealOnScroll delayMs={120}>
          <p className="mt-14 max-w-4xl rounded-lg border border-jac-blue-bright/30 bg-jac-blue-accent/10 px-8 py-6 text-lg leading-relaxed text-jac-silver-100">
            {t("closing")}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
