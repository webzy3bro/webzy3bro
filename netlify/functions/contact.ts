import type { Handler, HandlerResponse } from '@netlify/functions';
import { isContactInquiry, sendContactInquiry } from '../../src/server/contactEmail';

export const handler: Handler = async (event): Promise<HandlerResponse> => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed.' }),
    };
  }

  let inquiry: unknown;
  try {
    inquiry = event.body ? JSON.parse(event.body) : undefined;
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Please submit valid form details.' }),
    };
  }

  if (!isContactInquiry(inquiry)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Please check the form details and try again.' }),
    };
  }

  try {
    await sendContactInquiry(inquiry);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Your inquiry has been sent.' }),
    };
  } catch (error) {
    console.error('Failed to send contact inquiry:', error);
    const notConfigured =
      error instanceof Error && error.message.startsWith('Contact email is not configured.');
    return {
      statusCode: notConfigured ? 503 : 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: notConfigured
          ? 'The contact form is temporarily unavailable. Please email us directly.'
          : 'We could not send your inquiry. Please try again later.',
      }),
    };
  }
};
