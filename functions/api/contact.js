import {
  CONTACT_PHONE_REGIONS,
  isValidContactPhone,
} from "../../src/data/phoneRegions.ts";

const MAX_REQUEST_BYTES = 10_000;
const DEFAULT_CONTACT_EMAIL = "webzy3bro@gmail.com";
const SUCCESS_MESSAGE = "We'll review your project details and contact you soon.";

function json(data, status = 200, additionalHeaders = {}) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...additionalHeaders,
    },
  });
}

function isValidInquiry(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const inquiry = value;
  const hasPhone = typeof inquiry.phone === "string" && inquiry.phone.trim().length > 0;
  const hasValidRegion =
    typeof inquiry.phoneRegion === "string" &&
    CONTACT_PHONE_REGIONS.some(({ code }) => code === inquiry.phoneRegion);

  return (
    typeof inquiry.fullName === "string" &&
    inquiry.fullName.trim().length >= 2 &&
    inquiry.fullName.length <= 120 &&
    typeof inquiry.email === "string" &&
    inquiry.email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inquiry.email.trim()) &&
    (inquiry.phone === undefined ||
      (typeof inquiry.phone === "string" && inquiry.phone.length <= 40)) &&
    (inquiry.phoneRegion === undefined ||
      (typeof inquiry.phoneRegion === "string" && hasValidRegion)) &&
    (!hasPhone || (hasValidRegion && isValidContactPhone(inquiry.phone, inquiry.phoneRegion))) &&
    (inquiry.company === undefined ||
      (typeof inquiry.company === "string" && inquiry.company.length <= 160)) &&
    typeof inquiry.service === "string" &&
    inquiry.service.trim().length > 0 &&
    inquiry.service.length <= 120 &&
    (inquiry.budget === undefined ||
      (typeof inquiry.budget === "string" && inquiry.budget.length <= 120)) &&
    typeof inquiry.description === "string" &&
    inquiry.description.trim().length >= 15 &&
    inquiry.description.length <= 5000
  );
}

async function readLimitedBody(request) {
  const reader = request.body?.getReader();
  if (!reader) return "";

  const chunks = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > MAX_REQUEST_BYTES) {
      await reader.cancel();
      throw new RangeError("Contact inquiry request is too large.");
    }

    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(body);
}

function base64Encode(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64UrlEncode(value) {
  return base64Encode(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sendGmail(inquiry, env) {
  const {
    GMAIL_USER,
    CONTACT_EMAIL = DEFAULT_CONTACT_EMAIL,
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_REFRESH_TOKEN,
  } = env;

  if (!GMAIL_USER || !GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !GMAIL_REFRESH_TOKEN) {
    throw new Error("Contact email is not configured.");
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GMAIL_CLIENT_ID,
      client_secret: GMAIL_CLIENT_SECRET,
      refresh_token: GMAIL_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`Google authentication failed with status ${tokenResponse.status}.`);
  }

  const tokenData = await tokenResponse.json();
  if (typeof tokenData.access_token !== "string" || !tokenData.access_token) {
    throw new Error("Google did not return an access token.");
  }

  const phone = inquiry.phone?.trim()
    ? `${inquiry.phoneRegion} ${inquiry.phone.trim()}`
    : "Not provided";
  const text = [
    `Name: ${inquiry.fullName.trim()}`,
    `Email: ${inquiry.email.trim()}`,
    `Phone: ${phone}`,
    `Company: ${inquiry.company?.trim() || "Not provided"}`,
    `Service: ${inquiry.service.trim()}`,
    `Budget: ${inquiry.budget?.trim() || "Not specified"}`,
    "",
    "Project Description:",
    inquiry.description.trim(),
  ].join("\n");
  const subject = base64Encode(
    `[WEBZY3BRO Inquiry] ${inquiry.service.trim()} - ${inquiry.fullName.trim()}`,
  );

  const mimeMessage = [
    `From: WEBZY3BRO Website <${GMAIL_USER}>`,
    `To: ${CONTACT_EMAIL}`,
    `Reply-To: ${inquiry.email.trim()}`,
    `Subject: =?UTF-8?B?${subject}?=`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    base64Encode(text),
  ].join("\r\n");

  const gmailResponse = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: base64UrlEncode(mimeMessage) }),
    },
  );

  if (!gmailResponse.ok) {
    throw new Error(`Gmail could not send the message (status ${gmailResponse.status}).`);
  }
}

export async function onRequest({ request, env }) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
  }

  let text;
  try {
    text = await readLimitedBody(request);
  } catch (error) {
    if (error instanceof RangeError) {
      return json({ error: "Request is too large." }, 413);
    }
    console.error("Failed to read contact inquiry request:", error);
    return json({ error: "Please submit valid form details." }, 400);
  }

  let inquiry;
  try {
    inquiry = JSON.parse(text);
  } catch {
    return json({ error: "Please submit valid form details." }, 400);
  }

  if (!isValidInquiry(inquiry)) {
    return json({ error: "Please check the form details and try again." }, 400);
  }

  try {
    await sendGmail(inquiry, env);
  } catch (error) {
    console.error("Contact form email delivery failed:", error);
    if (error instanceof Error && error.message === "Contact email is not configured.") {
      return json(
        { error: "The contact form is not configured yet. Please email us directly." },
        503,
      );
    }
    return json({ error: "We could not send your inquiry. Please try again later." }, 502);
  }

  return json({ message: SUCCESS_MESSAGE });
}
