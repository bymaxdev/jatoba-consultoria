import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/RevealOnScroll";

type SolutionGroup = {
  title: string;
  items: string[];
};

export async function Solutions() {
  const t = await getTranslations("solutions");
  const groups = t.raw("groups") as SolutionGroup[];
  const sectionId = t("id");

  return (
    <section
      id={sectionId}
      className="scroll-mt-28 border-y border-white/10 bg-jac-navy-900/50 py-24"
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

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {groups.map((group, i) => (
            <RevealOnScroll key={group.title} delayMs={i * 90}>
              <article className="flex h-full flex-col rounded-lg border border-white/10 bg-jac-navy-950/60 p-6 shadow-black/40 shadow-lg backdrop-blur-sm">
                <div className="mb-6 h-0.5 w-12 shrink-0 rounded-full bg-linear-to-r from-jac-blue-bright to-transparent" />
                <h3 className="mb-6 font-semibold text-lg text-white tracking-wide">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-3 text-sm leading-relaxed text-jac-silver-300">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="relative pl-4 before:pointer-events-none before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-jac-blue-bright"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
