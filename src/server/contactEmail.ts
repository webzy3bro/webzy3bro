import nodemailer from 'nodemailer';

export interface ContactInquiry {
  fullName: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  description: string;
}

export function isContactInquiry(value: unknown): value is ContactInquiry {
  if (!value || typeof value !== 'object') return false;
  const inquiry = value as Record<string, unknown>;
  return (
    typeof inquiry.fullName === 'string' &&
    inquiry.fullName.trim().length >= 2 &&
    inquiry.fullName.length <= 120 &&
    typeof inquiry.email === 'string' &&
    inquiry.email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inquiry.email.trim()) &&
    typeof inquiry.service === 'string' &&
    inquiry.service.trim().length > 0 &&
    inquiry.service.length <= 120 &&
    (inquiry.company === undefined ||
      (typeof inquiry.company === 'string' && inquiry.company.length <= 160)) &&
    (inquiry.budget === undefined ||
      (typeof inquiry.budget === 'string' && inquiry.budget.length <= 120)) &&
    typeof inquiry.description === 'string' &&
    inquiry.description.trim().length >= 15 &&
    inquiry.description.length <= 5000
  );
}

export async function sendContactInquiry(inquiry: ContactInquiry): Promise<void> {
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;
  const recipient = process.env.CONTACT_EMAIL || 'webzy3bro@gmail.com';
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    throw new Error('Contact email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: GMAIL_USER,
    to: recipient,
    replyTo: inquiry.email.trim(),
    subject: `[WEBZY3BRO Inquiry] ${inquiry.service.trim()} — ${inquiry.fullName.trim()}`,
    text: [
      `Name: ${inquiry.fullName.trim()}`,
      `Email: ${inquiry.email.trim()}`,
      `Company: ${inquiry.company?.trim() || 'Not provided'}`,
      `Service: ${inquiry.service.trim()}`,
      `Budget: ${inquiry.budget?.trim() || 'Not specified'}`,
      '',
      'Project Description:',
      inquiry.description.trim(),
    ].join('\n'),
  });
}
