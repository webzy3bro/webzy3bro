import type { Handler, HandlerResponse } from '@netlify/functions';
import {
  isContactInquiry,
  isMissingEmailConfiguration,
  recordContactInquiry,
  sendContactInquiry,
} from '../../src/server/contactEmail';

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
      body: JSON.stringify({ message: "We'll review your project details and contact you soon." }),
    };
  } catch (error) {
    console.error('Failed to send contact inquiry:', error);
    if (isMissingEmailConfiguration(error)) {
      try {
        await recordContactInquiry(inquiry, false);
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: "We'll review your project details and contact you soon." }),
        };
      } catch (recordError) {
        console.error('Failed to record contact inquiry:', recordError);
      }
    }
    return {
      statusCode: isMissingEmailConfiguration(error) ? 503 : 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: isMissingEmailConfiguration(error)
          ? 'The contact form is temporarily unavailable. Please email us directly.'
          : 'We could not send your inquiry. Please try again later.',
      }),
    };
  }
};
