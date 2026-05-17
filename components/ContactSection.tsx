import { getTranslations } from "next-intl/server";
import {
  ContactSectionClient,
  type ContactDirect,
} from "@/components/ContactSectionClient";

export async function ContactSection() {
  const t = await getTranslations("contact");
  const direct = t.raw("direct") as ContactDirect;
  return <ContactSectionClient sectionId={t("id")} direct={direct} />;
}
