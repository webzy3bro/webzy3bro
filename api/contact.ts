import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isContactInquiry, sendContactInquiry } from '../src/server/contactEmail';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  if (!isContactInquiry(req.body)) {
    res.status(400).json({ error: 'Please check the form details and try again.' });
    return;
  }

  try {
    await sendContactInquiry(req.body);
    res.status(200).json({ message: 'Your inquiry has been sent.' });
  } catch (error) {
    console.error('Failed to send contact inquiry:', error);
    const notConfigured =
      error instanceof Error && error.message.startsWith('Contact email is not configured.');
    res.status(notConfigured ? 503 : 500).json({
      error: notConfigured
        ? 'The contact form is temporarily unavailable. Please email us directly.'
        : 'We could not send your inquiry. Please try again later.',
    });
  }
}
