# WEBZY3BRO

Premium digital agency website built with React, TypeScript, Vite, Express, GSAP, and Motion.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies: `npm install`
2. Set up Gmail delivery (see below).
3. Run the app: `npm run dev`
4. Open `http://localhost:3000`

## Contact Form Email Setup

The contact form sends inquiries through server-side endpoints. Vercel serves it from `api/contact.ts`; Netlify routes `/api/contact` to its function; the Cloudflare Worker routes it through `worker.js` to `functions/api/contact.js`. Never put email credentials in frontend code or commit them.

Set these environment variables in the server/deployment environment:

- `GMAIL_USER`: the Gmail account used to send the inquiry (for example, `yourname@gmail.com`)
- `GMAIL_APP_PASSWORD`: an App Password generated in that Google account's security settings
- `CONTACT_EMAIL`: the inbox that should receive inquiries (defaults to `webzy3bro@gmail.com`)

For local development, copy `.env.example` to `.env` and replace the example values. Keep `.env` out of version control. In Vercel, add the variables under **Project → Settings → Environment Variables** for the environments you use, then redeploy. In Netlify, add them in **Site configuration → Environment variables**, then redeploy.

### Cloudflare Workers deployment

The provided deployment URL is `workers.dev`, so deploy this as a Cloudflare Worker with Static Assets, not as a Pages site. A dashboard Direct Upload of only the static `dist` directory does not include the `/api/contact` handler, which causes the contact submission to return `405`.

From the repository root, authenticate with Wrangler and deploy the Worker and assets together. The Wrangler worker name is `1`, matching the current `1.webzy3bro.workers.dev` URL:

- Run `npx wrangler login` once.
- Run `npm run deploy:worker` to build and deploy `dist` with the Worker API handler.

For local Worker testing, run `npm run dev:worker`. Set the Worker variables in **Workers & Pages → 1 → Settings → Variables and Secrets**:

- `GMAIL_USER`: the Gmail account used to send inquiries
- `GMAIL_CLIENT_ID`: OAuth client ID for a Google OAuth client
- `GMAIL_CLIENT_SECRET` (secret): OAuth client secret
- `GMAIL_REFRESH_TOKEN` (secret): refresh token authorized for the Gmail API `gmail.send` scope
- `CONTACT_EMAIL` (optional): inquiry recipient; defaults to `webzy3bro@gmail.com`

The Cloudflare Worker sends mail through Gmail's API; `GMAIL_APP_PASSWORD` alone is not sufficient on Cloudflare Workers. Use the same Gmail account for `GMAIL_USER` and the OAuth authorization. Redeploy after setting or changing variables.

The form shows a success message only after Gmail accepts the email. If email delivery is not configured or fails, it displays an error so the visitor can try again.
