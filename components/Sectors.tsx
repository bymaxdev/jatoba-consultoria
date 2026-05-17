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
              <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-jac-navy-950/45 transition hover:border-jac-blue-bright/35">
                <div className="relative aspect-16/10 w-full overflow-hidden">
                  <Image
                    src={sector.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-jac-navy-950 via-jac-navy-950/20 to-transparent"
                    aria-hidden
                  />
                  <span
                    className="absolute bottom-3 left-3 font-mono text-2xl tabular-nums text-white/90 drop-shadow-md sm:bottom-4 sm:left-4 sm:text-3xl"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h3 className="font-semibold text-lg text-white tracking-wide sm:text-xl">
                    {sector.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-jac-silver-300 sm:mt-3 sm:text-[0.95rem]">
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
