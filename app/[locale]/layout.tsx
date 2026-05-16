import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { ContactFormProvider } from "@/components/ContactFormContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function resolveMetadataBase(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    try {
      return new URL(explicit.endsWith("/") ? explicit.slice(0, -1) : explicit);
    } catch {
      /* ignore */
    }
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const metadataBase = resolveMetadataBase();
  const title = t("title");
  const description = t("description");

  return {
    metadataBase,
    title,
    description,
    openGraph: {
      title,
      description,
      locale,
      type: "website",
      siteName: "Jatoba Consulting and Technology",
      url: `/${locale}`,
      images: [
        {
          url: "/logo.png",
          alt: "Jatoba Consulting and Technology",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (locale !== "pt" && locale !== "en") {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-jac-navy-950 font-sans text-jac-silver-100"
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <ContactFormProvider>
            <Header />
            <div className="flex flex-1 flex-col">{children}</div>
            <Footer />
          </ContactFormProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
