import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().trim().min(2),
  company: z.string().trim().optional(),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(10),
  website: z.string().optional(),
  locale: z.enum(["pt", "en"]).optional(),
});

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_error" }, { status: 400 });
  }

  const data = parsed.data;

  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.warn(
      "Contact API: configure RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL"
    );
    return NextResponse.json({ error: "email_not_configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const subjectPrefix =
    data.locale === "en" ? "[Jatoba Website — EN]" : "[Jatoba Website — PT]";

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject: `${subjectPrefix} ${data.name}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company?.trim() || "—")}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone?.trim() || "—")}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:sans-serif">${escapeHtml(data.message)}</pre>
      <p style="font-size:12px;color:#64748b">Locale: ${escapeHtml(data.locale ?? "—")}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "provider_error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
