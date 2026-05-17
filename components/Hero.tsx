import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ContactOpenLink } from "@/components/ContactOpenLink";
import { Link } from "@/navigation";

/** Altura útil sob o header (pt + h-14 / h-16 no Header.tsx). */
const heroMinH =
  "min-h-[calc(100dvh-max(0.5rem,env(safe-area-inset-top,0px))-3.5rem)] sm:min-h-[calc(100dvh-max(0.5rem,env(safe-area-inset-top,0px))-4rem)]";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section
      className={`relative isolate flex ${heroMinH} flex-col overflow-hidden border-b border-white/10`}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/campaign-creators-gMsnXqILjp4-unsplash.jpg"
          alt=""
          fill
          priority
          className="scale-105 object-cover"
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
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-jac-navy-950/90 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col justify-center pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-10 sm:pb-12 sm:pt-12 md:py-16">
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="flex max-w-3xl flex-col gap-9 sm:max-w-4xl sm:gap-10 md:gap-12">
            <header className="flex flex-col gap-4 sm:gap-5">
              <p className="w-fit rounded-full border border-jac-blue-bright/35 bg-jac-navy-950/45 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-jac-silver-100 shadow-sm backdrop-blur-md sm:px-4 sm:py-2 sm:text-xs">
                {t("eyebrow")}
              </p>
              <h1 className="text-pretty text-3xl font-bold leading-[1.1] tracking-tight text-white [text-shadow:0_2px_24px_rgb(0_0_0/0.35)] sm:text-4xl sm:leading-[1.08] md:text-5xl md:leading-[1.06] lg:text-[3.25rem] lg:leading-[1.05]">
                {t("title")}
              </h1>
            </header>

            <div className="rounded-2xl border border-white/12 bg-jac-navy-950/45 p-5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4)] backdrop-blur-md sm:p-7 md:p-8">
              <div className="border-l-2 border-jac-blue-bright/55 pl-5 sm:pl-6">
                <div className="flex flex-col gap-4 text-pretty sm:gap-5">
                  <p className="text-base font-medium leading-relaxed text-jac-silver-100 sm:text-lg md:text-xl">
                    {t("subtitle1")}
                  </p>
                  <p className="text-sm leading-relaxed text-jac-silver-300 sm:text-base md:text-lg">
                    {t("subtitle2")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/#servicos"
                prefetch={false}
                className="inline-flex min-h-12 w-full min-w-42 flex-1 cursor-pointer items-center justify-center rounded-xl bg-jac-blue-bright px-7 text-center text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:bg-jac-blue-accent sm:w-auto sm:flex-initial sm:px-8 sm:text-base"
              >
                {t("ctaServices")}
              </Link>
              <ContactOpenLink
                href="/#contato"
                prefetch={false}
                className="inline-flex min-h-12 w-full min-w-42 flex-1 cursor-pointer items-center justify-center rounded-xl border border-white/25 bg-white/[0.07] px-7 text-center text-sm font-semibold text-jac-silver-100 shadow-sm backdrop-blur-sm transition hover:border-white/40 hover:bg-white/12 sm:w-auto sm:flex-initial sm:px-8 sm:text-base"
              >
                {t("ctaContact")}
              </ContactOpenLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
