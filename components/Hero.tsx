import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ContactOpenLink } from "@/components/ContactOpenLink";
import { Link } from "@/navigation";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/campaign-creators-gMsnXqILjp4-unsplash.jpg"
          alt=""
          fill
          priority
          className="object-cover brightness-[1] scale-110"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-linear-to-br from-jac-navy-950 via-jac-navy-950/85 to-jac-blue-accent/40 mix-blend-multiply"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-jac-navy-950 via-transparent to-jac-navy-950/30"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44">
        <p className="mb-5 inline-flex rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-jac-silver-300 backdrop-blur-sm">
          {t("eyebrow")}
        </p>
        <h1 className="max-w-3xl font-bold text-zinc-100 text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.1]">
          {t("title")}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-jac-silver-100/95 md:text-xl">
          {t("subtitle1")}
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-jac-silver-100/95 md:text-xl">
          {t("subtitle2")}
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/#servicos"
            prefetch={false}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-md bg-jac-blue-bright px-8 text-base font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-jac-blue-accent"
          >
            {t("ctaServices")}
          </Link>
          <ContactOpenLink
            href="/#contato"
            prefetch={false}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-md border border-white/25 px-8 text-base font-semibold text-jac-silver-100 transition hover:border-white/40 hover:bg-white/10"
          >
            {t("ctaContact")}
          </ContactOpenLink>
        </div>
      </div>
    </section>
  );
}
