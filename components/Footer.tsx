import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="mt-auto border-t border-white/10 bg-jac-navy-950/90 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <div className="max-w-lg">
          <p className="font-medium text-white tracking-wide">{t("tagline")}</p>
          <p className="mt-3 text-sm leading-relaxed text-jac-silver-500">{t("legalNote")}</p>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link href="/privacy" className="text-jac-silver-300 underline-offset-4 transition hover:text-white hover:underline">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="text-jac-silver-300 underline-offset-4 transition hover:text-white hover:underline">
              {t("terms")}
            </Link>
          </nav>
          <p className="text-jac-silver-500 text-sm">{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
