import nodemailer from 'nodemailer';
import { randomBytes } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { CONTACT_PHONE_REGIONS, isValidContactPhone } from '../data/phoneRegions';

export interface ContactInquiry {
  fullName: string;
  email: string;
  phone?: string;
  phoneRegion?: string;
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
    (inquiry.phone === undefined ||
      (typeof inquiry.phone === 'string' && inquiry.phone.length <= 40)) &&
    (inquiry.phoneRegion === undefined ||
      (typeof inquiry.phoneRegion === 'string' &&
        CONTACT_PHONE_REGIONS.some(({ code }) => code === inquiry.phoneRegion))) &&
    (!inquiry.phone?.trim() ||
      !inquiry.phoneRegion ||
      isValidContactPhone(inquiry.phone, inquiry.phoneRegion)) &&
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

export function isMissingEmailConfiguration(error: unknown): boolean {
  return error instanceof Error && error.message.startsWith('Contact email is not configured.');
}

export async function recordContactInquiry(
  inquiry: ContactInquiry,
  emailDispatched: boolean,
): Promise<void> {
  const inquiriesFile = process.env.INQUIRIES_FILE
    ? path.resolve(process.env.INQUIRIES_FILE)
    : path.resolve(process.cwd(), 'data', 'inquiries.json');

  await mkdir(path.dirname(inquiriesFile), { recursive: true });

  let inquiries: unknown[] = [];
  try {
    const existing = await readFile(inquiriesFile, 'utf8');
    const parsed: unknown = JSON.parse(existing);
    if (Array.isArray(parsed)) inquiries = parsed;
  } catch (error) {
    if (!(error instanceof Error) || !('code' in error) || error.code !== 'ENOENT') {
      console.warn('Could not read existing inquiry records:', error);
    }
  }

  const id = `WZ-${randomBytes(3).toString('hex').toUpperCase()}`;
  inquiries.push({
    id,
    ...inquiry,
    createdAt: new Date().toISOString(),
    emailDispatched,
  });
  await writeFile(inquiriesFile, `${JSON.stringify(inquiries, null, 2)}\n`, 'utf8');
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
      `Phone: ${
        inquiry.phone?.trim()
          ? `${inquiry.phoneRegion || ''} ${inquiry.phone.trim()}`.trim()
          : 'Not provided'
      }`,
      `Company: ${inquiry.company?.trim() || 'Not provided'}`,
      `Service: ${inquiry.service.trim()}`,
      `Budget: ${inquiry.budget?.trim() || 'Not specified'}`,
      '',
      'Project Description:',
      inquiry.description.trim(),
    ].join('\n'),
  });
}
