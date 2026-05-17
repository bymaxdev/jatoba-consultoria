"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useRef } from "react";
import { ContactForm } from "@/components/ContactForm";
import { useContactForm } from "@/components/ContactFormContext";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";

export type ContactLocation = {
  title: string;
  lines: string[];
};

export type ContactDirect = {
  channelsTitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  locations: ContactLocation[];
};

type Props = {
  sectionId: string;
  direct: ContactDirect;
};

function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  return `tel:+${digits}`;
}

export function ContactSectionClient({ sectionId, direct }: Props) {
  const t = useTranslations("contact");
  const { isOpen, openForm, closeForm } = useContactForm();
  const panelId = useId();
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const phoneLink = telHref(direct.phone);

  useEffect(() => {
    if (!isOpen) return;
    const tId = window.requestAnimationFrame(() => {
      firstFieldRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(tId);
  }, [isOpen]);

  return (
    <section
      id={sectionId}
      className="scroll-mt-20 border-t border-white/10 bg-black/25 py-16 sm:scroll-mt-24 md:scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading index={t("sectionIndex")} title={t("title")} intro={t("intro")} />
        </RevealOnScroll>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <RevealOnScroll delayMs={70}>
            <div className="rounded-xl border border-white/10 bg-jac-navy-950/50 p-5 shadow-lg shadow-black/20 sm:p-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-jac-blue-bright">
                {direct.channelsTitle}
              </h3>
              <dl className="mt-6 space-y-5 text-sm sm:text-base">
                <div>
                  <dt className="text-jac-silver-500">{direct.emailLabel}</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${direct.email}`}
                      className="font-medium text-white underline-offset-4 transition hover:text-jac-blue-bright hover:underline"
                    >
                      {direct.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-jac-silver-500">{direct.phoneLabel}</dt>
                  <dd className="mt-1.5">
                    {phoneLink ? (
                      <a
                        href={phoneLink}
                        className="font-medium text-white underline-offset-4 transition hover:text-jac-blue-bright hover:underline"
                      >
                        {direct.phone}
                      </a>
                    ) : (
                      <span className="font-medium text-white">{direct.phone}</span>
                    )}
                  </dd>
                </div>
              </dl>
              <div className="mt-8 space-y-7 border-t border-white/10 pt-8">
                {direct.locations.map((loc) => (
                  <div key={loc.title}>
                    <p className="text-sm font-semibold text-white">{loc.title}</p>
                    <address className="mt-2 not-italic text-sm leading-relaxed text-jac-silver-300">
                      {loc.lines.map((line, i) => (
                        <span key={`${loc.title}-${i}`} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={110}>
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-linear-to-br from-jac-navy-900/80 via-jac-navy-950/70 to-jac-navy-950/90 p-5 shadow-2xl shadow-black/40 backdrop-blur-md sm:rounded-2xl sm:p-8 md:p-10">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-jac-blue-bright/15 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-jac-blue-accent/20 blur-3xl"
                aria-hidden
              />

              <div className="relative">
                <p className="text-sm leading-relaxed text-jac-silver-500 sm:text-[0.95rem]">{t("emailNote")}</p>

                <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
                  <button
                    type="button"
                    id={`${panelId}-trigger`}
                    aria-expanded={isOpen}
                    aria-controls={`${panelId}-panel`}
                    onClick={() => (isOpen ? closeForm() : openForm())}
                    className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-jac-blue-bright px-6 text-base font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-jac-blue-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jac-blue-bright sm:w-auto sm:px-8"
                  >
                    {isOpen ? t("ctaClose") : t("ctaOpen")}
                  </button>
                </div>

                <div
                  id={`${panelId}-panel`}
                  role="region"
                  aria-labelledby={`${panelId}-trigger`}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    isOpen ? "mt-10 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden" inert={!isOpen ? true : undefined}>
                    <div className="border-white/10 border-t pt-8 md:pt-10">
                      <ContactForm firstInputRef={firstFieldRef} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
