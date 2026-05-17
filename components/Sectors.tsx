import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";

type Sector = {
  title: string;
  description: string;
  image: string;
};

export async function Sectors() {
  const t = await getTranslations("sectors");
  const items = t.raw("items") as Sector[];

  return (
    <section
      id={t("id")}
      className="scroll-mt-20 border-t border-white/10 bg-jac-navy-900/35 py-16 sm:scroll-mt-24 md:scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            index={t("sectionIndex")}
            title={t("title")}
            intro={t("intro")}
          />
        </RevealOnScroll>
        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {items.map((sector, i) => (
            <RevealOnScroll key={`${sector.title}-${i}`} delayMs={i * 55}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-jac-navy-950/50 shadow-lg shadow-black/15 transition hover:border-jac-blue-bright/40">
                <div className="relative aspect-5/3 w-full shrink-0 overflow-hidden border-b border-white/10">
                  <Image
                    src={sector.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-jac-navy-950/90 via-transparent to-jac-navy-950/30"
                    aria-hidden
                  />
                  <div
                    className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-jac-navy-950/75 shadow-md backdrop-blur-sm sm:h-11 sm:w-11"
                    aria-hidden
                  >
                    <span className="font-mono text-base font-semibold tabular-nums text-jac-blue-bright sm:text-lg">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <div className="min-w-0">
                    <h3 className="text-pretty font-semibold text-lg leading-snug tracking-wide text-white sm:text-xl">
                      {sector.title}
                    </h3>
                    <div
                      className="mt-3 h-px w-12 rounded-full bg-linear-to-r from-jac-blue-bright to-transparent"
                      aria-hidden
                    />
                  </div>

                  <p className="text-sm leading-relaxed text-jac-silver-300 sm:text-[0.9375rem] sm:leading-relaxed">
                    {sector.description}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
