# WEBZY3BRO

Premium digital agency website built with React, TypeScript, Vite, Express, GSAP, and Motion.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies: `npm install`
2. Set up Gmail delivery (see below).
3. Run the app: `npm run dev`
4. Open `http://localhost:3000`

## Contact Form Email Setup

The contact form sends inquiries through server-side endpoints. Vercel serves it from `api/contact.ts`; Netlify routes `/api/contact` to its function; Cloudflare Pages uses `functions/api/contact.js`. Never put email credentials in frontend code or commit them.

Set these environment variables in the server/deployment environment:

- `GMAIL_USER`: the Gmail account used to send the inquiry (for example, `yourname@gmail.com`)
- `GMAIL_APP_PASSWORD`: an App Password generated in that Google account's security settings
- `CONTACT_EMAIL`: the inbox that should receive inquiries (defaults to `webzy3bro@gmail.com`)

For local development, copy `.env.example` to `.env` and replace the example values. Keep `.env` out of version control. In Vercel, add the variables under **Project → Settings → Environment Variables** for the environments you use, then redeploy. In Netlify, add them in **Site configuration → Environment variables**, then redeploy.

### Cloudflare Pages deployment

The Pages Function is at `functions/api/contact.js`, so it must be deployed together with the site. Cloudflare Pages **Direct Upload from the dashboard does not support Functions**; uploading only `dist` will make `POST /api/contact` return `405`.

Use either of these supported deployment methods:

- Connect this Git repository to Pages with the repository root as the root directory, `npm run build` as the build command, and `dist` as the build output directory. Ensure `functions/api/contact.js` is committed to the connected branch.
- From this repository root, run `npm run deploy:pages`. Authenticate with Wrangler first using `npx wrangler login`. This builds the site and deploys `dist` together with the root `functions/` directory to the `webzy3bro` Pages project.

For local Pages runtime testing, run `npm run build` and then `npm run pages:dev`. Set the Cloudflare function variables in **Workers & Pages → webzy3bro → Settings → Variables and Secrets** for production and preview:

- `GMAIL_USER`: the Gmail account used to send inquiries
- `GMAIL_CLIENT_ID`: OAuth client ID for a Google OAuth client
- `GMAIL_CLIENT_SECRET` (secret): OAuth client secret
- `GMAIL_REFRESH_TOKEN` (secret): refresh token authorized for the Gmail API `gmail.send` scope
- `CONTACT_EMAIL` (optional): inquiry recipient; defaults to `webzy3bro@gmail.com`

The Cloudflare Function sends mail through Gmail's API; `GMAIL_APP_PASSWORD` alone is not sufficient on Cloudflare Workers. Redeploy after setting or changing variables. Use the same Gmail account for `GMAIL_USER` and the OAuth authorization.

The form shows a success message only after Gmail accepts the email. If email delivery is not configured or fails, it displays an error so the visitor can try again.
