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

  const navClass =
    "text-sm font-medium tracking-wide text-jac-silver-300 transition hover:text-white";

  const linkCls = `${navClass} block py-3 md:inline md:py-0`;

  return (
    <header className="sticky top-0 z-50 bg-jac-navy-950/90 pt-[max(0.5rem,env(safe-area-inset-top))] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-h-11 shrink-0 items-center gap-2"
          prefetch
        >
          <Image
            src="/logo.png"
            alt="Jatoba Consulting and Technology"
            width={230}
            height={100}
            className="h-22 w-auto sm:h-22 md:h-22"
            priority
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
          <nav
            id="primary-navigation"
            className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full max-h-[min(70vh,calc(100dvh-3.5rem))] flex-col gap-0 overflow-y-auto overscroll-contain border-b border-white/10 bg-jac-navy-950 px-4 py-4 shadow-lg md:static md:max-h-none md:flex md:flex-row md:gap-6 md:overflow-visible md:border-0 md:bg-transparent md:p-0 md:shadow-none lg:gap-8`}
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
              className={linkCls}
              onClick={() => setOpen(false)}
            >
              {t("contact")}
            </ContactOpenLink>
          </nav>

          <div className="flex flex-col items-end gap-0.5 sm:items-center md:flex-row md:items-center md:gap-2 lg:gap-3">
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.12em] text-jac-silver-500 sm:text-[0.62rem] sm:tracking-[0.14em]">
              {t("languageHint")}
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/"
                locale={otherLocale}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-jac-blue-bright/50 px-2.5 text-xs font-semibold uppercase tracking-wider text-jac-silver-100 shadow-sm transition hover:border-jac-blue-bright hover:bg-jac-blue-accent/25 sm:px-3"
                prefetch={false}
              >
                {otherLocale === "pt" ? "PT" : "EN"}
              </Link>

              <button
                type="button"
                className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md border border-white/15 text-jac-silver-300 md:hidden"
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
                    />
                  ) : (
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="1.75"
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
