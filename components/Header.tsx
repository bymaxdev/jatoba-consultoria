"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ContactOpenLink } from "@/components/ContactOpenLink";
import { Link } from "@/navigation";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const otherLocale = locale === "pt" ? "en" : "pt";
  const toggleLabel = open ? t("closeMenu") : t("openMenu");

  const linkBase =
    "text-sm font-medium tracking-wide text-jac-silver-300 transition-colors duration-200 hover:text-white";

  const linkCls = `${linkBase} block border-b border-white/10 py-3.5 last:border-b-0 md:inline-flex md:border-0 md:rounded-lg md:px-3 md:py-2 md:hover:bg-white/8`;

  const contactCls = `${linkBase} block border-b-0 py-3.5 md:inline-flex md:rounded-lg md:bg-jac-blue-bright/12 md:px-3.5 md:py-2 md:text-jac-silver-100 md:hover:bg-jac-blue-bright/22 md:hover:text-white`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-jac-navy-950/92 pt-[max(0.5rem,env(safe-area-inset-top))] shadow-[0_1px_0_rgb(255_255_255/0.04)_inset] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-h-11 shrink-0 items-center rounded-md outline-offset-2 ring-offset-jac-navy-950 focus-visible:ring-2 focus-visible:ring-jac-blue-bright/50"
          prefetch
        >
          <Image
            src="/logo.png"
            alt="Jatoba Consulting and Technology"
            width={280}
            height={121}
            className="h-11 w-auto sm:h-12 md:h-14"
            priority
          />
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end md:flex-initial md:justify-end md:gap-0">
          <nav
            id="primary-navigation"
            className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full z-40 max-h-[min(70vh,calc(100dvh-3.5rem))] flex-col overflow-y-auto overscroll-contain border-b border-white/10 bg-jac-navy-950 px-4 py-3 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)] md:static md:z-auto md:flex md:max-h-none md:flex-row md:items-center md:gap-0.5 md:overflow-visible md:border-0 md:bg-transparent md:p-0 md:pr-4 md:shadow-none lg:gap-1 lg:pr-5`}
            aria-label="Primary"
          >
            <Link
              href="/#about"
              className={linkCls}
              onClick={() => setOpen(false)}
              prefetch={false}
            >
              {t("about")}
            </Link>
            <Link
              href="/#servicos"
              className={linkCls}
              onClick={() => setOpen(false)}
              prefetch={false}
            >
              {t("services")}
            </Link>
            <Link
              href="/#por-que-jatoba"
              className={linkCls}
              onClick={() => setOpen(false)}
              prefetch={false}
            >
              {t("why")}
            </Link>
            <Link
              href="/#setores"
              className={linkCls}
              onClick={() => setOpen(false)}
              prefetch={false}
            >
              {t("sectors")}
            </Link>
            <ContactOpenLink
              href="/#contato"
              className={contactCls}
              onClick={() => setOpen(false)}
            >
              {t("contact")}
            </ContactOpenLink>
          </nav>

          <div className="flex shrink-0 items-center gap-2 pl-2 sm:gap-3 md:border-l md:border-white/15 md:pl-5 lg:pl-6">
            <div className="flex flex-col items-end leading-none">
              <span className="text-[0.55rem] font-medium uppercase tracking-[0.14em] text-jac-silver-500 sm:text-[0.58rem]">
                {t("languageHint")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                locale={otherLocale}
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-jac-blue-bright/50 px-2.5 text-xs font-semibold uppercase tracking-wider text-jac-silver-100 shadow-sm transition hover:border-jac-blue-bright hover:bg-jac-blue-accent/25 sm:min-h-11 sm:px-3"
                prefetch={false}
              >
                {otherLocale === "pt" ? "PT" : "EN"}
              </Link>

              <button
                type="button"
                className="inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-md border border-white/18 bg-white/5 text-jac-silver-200 transition hover:border-white/28 hover:bg-white/10 hover:text-white md:hidden"
                aria-expanded={open}
                aria-controls="primary-navigation"
                aria-label={toggleLabel}
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">{toggleLabel}</span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  {open ? (
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
