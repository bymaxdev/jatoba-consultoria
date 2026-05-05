import { getTranslations } from "next-intl/server";

export default async function TermsPage() {
  const t = await getTranslations("termsPage");

  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-semibold text-3xl text-white tracking-tight md:text-4xl">{t("title")}</h1>
      <p className="mt-6 text-jac-silver-500 text-sm">{t("updated")}</p>
      <div className="mt-12 max-w-none space-y-6 text-base leading-relaxed text-jac-silver-300">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p>{t("p3")}</p>
        <p>{t("p4")}</p>
        <p>{t("p5")}</p>
      </div>
    </main>
  );
}
