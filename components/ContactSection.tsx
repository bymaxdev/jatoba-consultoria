import { getTranslations } from "next-intl/server";
import { ContactSectionClient } from "@/components/ContactSectionClient";

export async function ContactSection() {
  const t = await getTranslations("contact");
  return <ContactSectionClient sectionId={t("id")} />;
}
