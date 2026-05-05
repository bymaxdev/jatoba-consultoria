"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState, type RefObject } from "react";

type SubmitState = "idle" | "sending" | "success" | "error";

type ContactFormProps = {
  firstInputRef?: RefObject<HTMLInputElement | null>;
};

export function ContactForm({ firstInputRef }: ContactFormProps) {
  const t = useTranslations("contact");
  const tv = useTranslations("contact.validation");
  const locale = useLocale();

  const [state, setState] = useState<SubmitState>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setState("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
      locale,
    };

    const nextErrors: Record<string, string> = {};
    if (payload.name.trim().length < 2) nextErrors.name = tv("name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
      nextErrors.email = tv("emailInvalid");
    }
    if (payload.message.trim().length < 10) nextErrors.message = tv("messageShort");

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setState("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setState("error");
        return;
      }

      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  const inputCls =
    "mt-2 w-full rounded-lg border border-white/12 bg-jac-navy-950/50 px-4 py-3 text-sm text-white shadow-inner outline-none placeholder:text-jac-silver-500 transition focus:border-jac-blue-bright/50 focus:ring-2 focus:ring-jac-blue-bright/35 disabled:opacity-55";

  const labelCls = "block text-xs font-medium uppercase tracking-wider text-jac-silver-400";

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl space-y-8">
      {/* Honeypot */}
      <div className="pointer-events-none absolute opacity-5" aria-hidden="true">
        <label htmlFor="website">{t("honeypotLabel")}</label>
        <input
          tabIndex={-1}
          id="website"
          name="website"
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="name">
            {t("fields.name")} *
          </label>
          <input
            ref={firstInputRef}
            id="name"
            name="name"
            required
            className={inputCls}
            placeholder={t("placeholders.name")}
          />
          {fieldErrors.name && (
            <p className="mt-1.5 text-sm text-red-400">{fieldErrors.name}</p>
          )}
        </div>

        <div>
          <label className={labelCls} htmlFor="company">
            {t("fields.company")}
          </label>
          <input
            id="company"
            name="company"
            className={inputCls}
            placeholder={t("placeholders.company")}
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="email">
            {t("fields.email")} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputCls}
            placeholder={t("placeholders.email")}
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-sm text-red-400">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label className={labelCls} htmlFor="phone">
            {t("fields.phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={inputCls}
            placeholder={t("placeholders.phone")}
          />
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="message">
          {t("fields.message")} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputCls} resize-y min-h-34`}
          placeholder={t("placeholders.message")}
        />
        {fieldErrors.message && (
          <p className="mt-1.5 text-sm text-red-400">{fieldErrors.message}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 border-white/5 border-t pt-8">
        <button
          type="submit"
          disabled={state === "sending" || state === "success"}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-lg bg-jac-blue-bright px-10 text-base font-semibold text-white shadow-md transition hover:bg-jac-blue-accent disabled:cursor-not-allowed disabled:opacity-65"
        >
          {state === "sending" ? t("sending") : t("submit")}
        </button>

        {state === "success" && (
          <p className="font-medium text-emerald-400 text-sm">{t("success")}</p>
        )}
        {state === "error" && (
          <p className="font-medium text-red-400 text-sm">{t("error")}</p>
        )}
      </div>
    </form>
  );
}
