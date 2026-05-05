"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useRef } from "react";
import { ContactForm } from "@/components/ContactForm";
import { useContactForm } from "@/components/ContactFormContext";
import { RevealOnScroll } from "@/components/RevealOnScroll";

type Props = {
  sectionId: string;
};

export function ContactSectionClient({ sectionId }: Props) {
  const t = useTranslations("contact");
  const { isOpen, openForm, closeForm } = useContactForm();
  const panelId = useId();
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const tId = window.requestAnimationFrame(() => {
      firstFieldRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(tId);
  }, [isOpen]);

  return (
    <section id={sectionId} className="scroll-mt-28 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-jac-navy-900/80 via-jac-navy-950/70 to-jac-navy-950/90 p-8 shadow-2xl shadow-black/40 backdrop-blur-md md:p-10 lg:p-12">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-jac-blue-bright/15 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-jac-blue-accent/20 blur-3xl"
              aria-hidden
            />

            <div className="relative">
              <div className="max-w-2xl">
                <h2 className="font-semibold text-3xl tracking-tight text-white md:text-4xl">
                  {t("title")}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-jac-silver-300">{t("intro")}</p>
                <p className="mt-4 text-sm leading-relaxed text-jac-silver-500">{t("emailNote")}</p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    id={`${panelId}-trigger`}
                    aria-expanded={isOpen}
                    aria-controls={`${panelId}-panel`}
                    onClick={() => (isOpen ? closeForm() : openForm())}
                    className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-lg bg-jac-blue-bright px-8 text-base font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-jac-blue-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jac-blue-bright"
                  >
                    {isOpen ? t("ctaClose") : t("ctaOpen")}
                  </button>
                </div>
              </div>

              <div
                id={`${panelId}-panel`}
                role="region"
                aria-labelledby={`${panelId}-trigger`}
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  isOpen ? "mt-12 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden" inert={!isOpen ? true : undefined}>
                  <div className="border-white/10 border-t pt-10 md:pt-12">
                    <ContactForm firstInputRef={firstFieldRef} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
