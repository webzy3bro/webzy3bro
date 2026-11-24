import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  isContactInquiry,
  isMissingEmailConfiguration,
  recordContactInquiry,
  sendContactInquiry,
} from '../src/server/contactEmail';

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
    res.status(200).json({ message: "We'll review your project details and contact you soon." });
  } catch (error) {
    console.error('Failed to send contact inquiry:', error);
    if (isMissingEmailConfiguration(error)) {
      try {
        await recordContactInquiry(req.body, false);
        res.status(200).json({ message: "We'll review your project details and contact you soon." });
      } catch (recordError) {
        console.error('Failed to record contact inquiry:', recordError);
        res.status(503).json({
          error: 'The contact form is temporarily unavailable. Please email us directly.',
        });
      }
      return;
    }
    res.status(500).json({
      error: 'We could not send your inquiry. Please try again later.',
    });
  }
}
