import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/** Fallback quando o proxy não redireciona: garante que `/` nunca fique sem rota. */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
