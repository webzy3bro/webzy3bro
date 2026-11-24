import 'dotenv/config';
import express from 'express';
import path from 'path';
import {
  isContactInquiry,
  isMissingEmailConfiguration,
  recordContactInquiry,
  sendContactInquiry,
} from './src/server/contactEmail';
import { createServer as createViteServer } from 'vite';

const PORT = Number(process.env.PORT) || 3000;
const inquiryAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

async function startServer() {
  const app = express();

  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '10kb' }));
  app.post(['/api/contact', '/.netlify/functions/contact'], async (req, res) => {
    const now = Date.now();
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    const attempts = inquiryAttempts.get(clientIp);

    if (attempts && attempts.resetAt > now && attempts.count >= RATE_LIMIT_MAX) {
      res.status(429).json({ error: 'Too many inquiries. Please try again later.' });
      return;
    }

    if (!isContactInquiry(req.body)) {
      res.status(400).json({ error: 'Please check the form details and try again.' });
      return;
    }

    if (!attempts || attempts.resetAt <= now) {
      inquiryAttempts.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    } else {
      attempts.count += 1;
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
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WEBZY3BRO server listening on http://localhost:${PORT}`);
  });
}

startServer();
