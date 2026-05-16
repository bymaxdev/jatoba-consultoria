"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ContactOpenLink } from "@/components/ContactOpenLink";
import { Link } from "@/navigation";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const otherLocale = locale === "pt" ? "en" : "pt";
  const toggleLabel = open ? t("closeMenu") : t("openMenu");

  const navClass =
    "text-sm font-medium tracking-wide text-jac-silver-300 transition hover:text-white";

  const linkCls = `${navClass} block py-3 md:inline md:py-0`;

  return (
    <header className="sticky top-0 z-50 bg-jac-navy-950/90 backdrop-blur-md">
      <div className="mx-auto my-4 flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2" prefetch>
          <Image
            src="/logo.png"
            alt="Jatoba Consulting and Technology"
            width={230}
            height={100}
            className="h-24 w-auto sm:h-24 md:h-24"
            priority
          />
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <nav
            id="primary-navigation"
            className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-16 flex-col gap-0 border-b border-white/10 bg-jac-navy-950 px-4 py-4 shadow-lg md:static md:flex md:flex-row md:gap-5 md:border-0 md:bg-transparent md:p-0 md:shadow-none lg:gap-7`}
            aria-label="Primary"
          >
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
              {t("industries")}
            </Link>
            <Link
              href="/#about"
              className={linkCls}
              onClick={() => setOpen(false)}
              prefetch={false}
            >
              {t("about")}
            </Link>
            <ContactOpenLink
              href="/#contato"
              className={linkCls}
              onClick={() => setOpen(false)}
            >
              {t("contact")}
            </ContactOpenLink>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/"
              locale={otherLocale}
              className="rounded-md border border-jac-blue-bright/50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-jac-silver-100 shadow-sm transition hover:border-jac-blue-bright hover:bg-jac-blue-accent/25"
              prefetch={false}
            >
              {otherLocale === "pt" ? "PT" : "EN"}
            </Link>

            <button
              type="button"
              className="cursor-pointer rounded-md border border-white/15 p-2 text-jac-silver-300 md:hidden"
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
    </header>
  );
}
