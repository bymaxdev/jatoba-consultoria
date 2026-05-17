"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { ContactForm } from "@/components/ContactForm";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionHeading } from "@/components/SectionHeading";

export type ContactLocation = {
  title: string;
  lines: string[];
};

export type ContactDirect = {
  email: string;
  whatsappUrl: string;
  instagramUrl: string;
  locations: ContactLocation[];
};

type Props = {
  sectionId: string;
  direct: ContactDirect;
};

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.718 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 7.378c-2.552 0-4.622 2.07-4.622 4.622S9.448 16.622 12 16.622s4.622-2.07 4.622-4.622S14.552 7.378 12 7.378zm0 7.622a3 3 0 110-6 3 3 0 010 6zm6.406-7.809a1.079 1.079 0 11-2.158 0 1.079 1.079 0 012.158 0zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63a4.546 4.546 0 00-1.648 1.076A4.546 4.546 0 00 1.416 4.354C.333 5.776.132 6.646.072 7.924.014 9.204 0 9.612 0 12.871c0 3.259.014 3.667.072 4.947.06 1.278.261 2.148.558 2.913.308.865.718 1.596 1.34 2.218.622.622 1.353 1.032 2.218 1.34.765.297 1.635.498 2.913.558 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.278-.06 2.148-.261 2.913-.558a4.546 4.546 0 002.218-1.34 4.546 4.546 0 001.34-2.218c.297-.765.498-1.635.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.06-1.278-.261-2.148-.558-2.913a4.546 4.546 0 00-1.34-2.218 4.546 4.546 0 00-2.218-1.34c-.765-.297-1.635-.498-2.913-.558C15.667.014 15.259 0 12 0zm0 2.16c3.203 0 3.585.012 4.85.07 1.17.056 1.805.249 2.227.416.56.218.96.478 1.38.898.42.42.68.82.898 1.38.167.422.36 1.057.416 2.227.058 1.265.07 1.647.07 4.85s-.012 3.585-.07 4.85c-.056 1.17-.249 1.805-.416 2.227-.218.56-.478.96-.898 1.38-.42.42-.82.68-1.38.898-.422.167-1.057.36-2.227.416-1.265.058-1.647.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.056-1.805-.249-2.227-.416a3.713 3.713 0 01-1.38-.898 3.713 3.713 0 01-.898-1.38c-.167-.422-.36-1.057-.416-2.227-.058-1.265-.07-1.647-.07-4.85s.012-3.585.07-4.85c.056-1.17.249-1.805.416-2.227.218-.56.478-.96.898-1.38.42-.42.82-.68 1.38-.898.422-.167 1.057-.36 2.227-.416 1.265-.057 1.647-.07 4.85-.07z" />
    </svg>
  );
}

const cardCls =
  "flex h-full min-h-0 flex-col rounded-xl border border-white/10 bg-jac-navy-950/50 p-5 shadow-lg shadow-black/20 sm:p-7";

const socialCtaCls =
  "flex min-h-13 min-w-0 flex-1 items-center justify-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:brightness-110 hover:shadow-lg active:scale-[0.98] sm:py-4";

export function ContactSectionClient({ sectionId, direct }: Props) {
  const t = useTranslations("contact");
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const whatsappHref = direct.whatsappUrl?.trim();
  const instagramHref = direct.instagramUrl?.trim();

  return (
    <section
      id={sectionId}
      className="scroll-mt-20 border-t border-white/10 bg-black/25 py-16 sm:scroll-mt-24 md:scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeading
            index={t("sectionIndex")}
            title={t("title")}
            intro={t("intro")}
          />
        </RevealOnScroll>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          <RevealOnScroll delayMs={70}>
            <div className={cardCls}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-jac-blue-bright">
                {t("direct.channelsTitle")}
              </h3>

              <dl className="mt-6 text-sm sm:text-base">
                <div className="min-w-0 rounded-lg border border-white/10 bg-black/20 p-4">
                  <dt className="text-xs font-medium uppercase tracking-wider text-jac-silver-500">
                    {t("direct.emailLabel")}
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${direct.email}`}
                      className="wrap-break-word font-medium text-white underline-offset-4 transition hover:text-jac-blue-bright hover:underline"
                    >
                      {direct.email}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex min-h-0 flex-1 flex-col border-t border-white/10 pt-8">
                <div className="space-y-6">
                  {direct.locations.map((loc) => (
                    <div
                      key={loc.title}
                      className="rounded-lg border border-white/5 bg-black/15 p-4 sm:p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-jac-blue-bright/90">
                        {loc.title}
                      </p>
                      <address className="mt-3 not-italic text-sm leading-relaxed text-jac-silver-300">
                        {loc.lines.map((line, i) => (
                          <span key={`${loc.title}-${i}`} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    </div>
                  ))}
                </div>

                {(whatsappHref || instagramHref) && (
                  <div className="mt-auto border-t border-white/10 pt-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-jac-silver-400">
                      {t("direct.socialTitle")}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-jac-silver-500">
                      {t("direct.socialIntro")}
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                      {whatsappHref ? (
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${socialCtaCls} bg-linear-to-br from-[#25D366] via-[#20BA5A] to-[#128C7E] shadow-md shadow-emerald-950/30`}
                          aria-label={t("ariaWhatsapp")}
                        >
                          <IconWhatsApp className="size-6 shrink-0 opacity-95" />
                          <span className="truncate">{t("direct.whatsappLabel")}</span>
                        </a>
                      ) : null}
                      {instagramHref ? (
                        <a
                          href={instagramHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${socialCtaCls} bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-md shadow-purple-950/35`}
                          aria-label={t("ariaInstagram")}
                        >
                          <IconInstagram className="size-6 shrink-0 opacity-95" />
                          <span className="truncate">{t("direct.instagramLabel")}</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={110}>
            <div className={cardCls}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-jac-blue-bright">
                {t("ctaOpen")}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-jac-silver-400 sm:text-[0.95rem]">
                {t("emailNote")}
              </p>
              <div className="mt-6 min-h-0 flex-1 border-t border-white/10 pt-6">
                <ContactForm firstInputRef={firstFieldRef} submitStyle="prominent" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
