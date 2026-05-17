import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";

export async function Testimonial() {
  const t = await getTranslations("testimonial");

  return (
    <section
      aria-labelledby="testimonial-heading"
      className="scroll-mt-20 border-y border-white/10 bg-jac-navy-900/65 py-16 sm:scroll-mt-24 md:scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            index={t("sectionIndex")}
            title={t("title")}
            intro={t("intro")}
            className="max-w-3xl"
            headingId="testimonial-heading"
          />
        </RevealOnScroll>

        <RevealOnScroll delayMs={110}>
          <figure className="mt-10 max-w-4xl sm:mt-14">
            <blockquote className="border-l-2 border-jac-blue-bright pl-6 text-lg leading-relaxed text-white sm:pl-10 sm:text-xl">
              {t("quote")}
            </blockquote>
            <figcaption className="mt-8 border-t border-white/10 pt-6 text-sm text-jac-silver-300 sm:text-base">
              <p className="font-semibold text-white">{t("author")}</p>
              <p className="mt-1 text-jac-silver-400">{t("role")}</p>
            </figcaption>
          </figure>
        </RevealOnScroll>
      </div>
    </section>
  );
}
