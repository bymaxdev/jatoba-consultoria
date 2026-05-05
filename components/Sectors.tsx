import { getTranslations } from "next-intl/server";

import { RevealOnScroll } from "@/components/RevealOnScroll";

type Sector = {
  title: string;
  description: string;
};

export async function Sectors() {
  const t = await getTranslations("sectors");
  const items = t.raw("items") as Sector[];

  return (
    <section
      id={t("id")}
      className="scroll-mt-28 border-t border-white/10 bg-black/25 py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="font-semibold text-3xl tracking-tight text-white md:text-4xl">{t("title")}</h2>
        </RevealOnScroll>
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {items.map((sector, i) => (
            <RevealOnScroll key={sector.title} delayMs={i * 90}>
              <article className="group relative h-full overflow-hidden rounded-lg border border-white/10 bg-jac-navy-900/40 p-8 transition hover:border-jac-blue-bright/35">
                <span
                  className="mb-8 inline-block font-mono text-jac-blue-bright tabular-nums text-6xl opacity-40 transition-opacity group-hover:opacity-85"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="-mt-6 font-semibold text-xl text-white tracking-wide">
                  {sector.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-jac-silver-300">
                  {sector.description}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
