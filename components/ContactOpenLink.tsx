"use client";

import type { ComponentProps } from "react";
import { Link } from "@/navigation";
import { useContactForm } from "@/components/ContactFormContext";

type LinkProps = ComponentProps<typeof Link>;

type ContactOpenLinkProps = Omit<LinkProps, "href"> & {
  href: LinkProps["href"];
};

/** Navega para a âncora de contato e abre o formulário (estado global). */
export function ContactOpenLink({ onClick, href, ...rest }: ContactOpenLinkProps) {
  const { openForm } = useContactForm();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          openForm();
        }
      }}
    />
  );
}
