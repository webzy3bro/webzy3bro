# WEBZY3BRO

Premium digital agency website built with React, TypeScript, Vite, Express, GSAP, and Motion.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies: `npm install`
2. Set up Gmail delivery (see below).
3. Run the app: `npm run dev`
4. Open `http://localhost:3000`

## Contact Form Email Setup

The contact form sends inquiries through the server using Gmail SMTP. On Netlify, it calls the `/.netlify/functions/contact` function directly. It requires a Gmail account with 2-Step Verification enabled and a Google App Password. Never put these credentials in frontend code or commit them.

Set these environment variables in the server/deployment environment:

- `GMAIL_USER`: the Gmail account used to send the inquiry (for example, `yourname@gmail.com`)
- `GMAIL_APP_PASSWORD`: an App Password generated in that Google account's security settings
- `CONTACT_EMAIL`: the inbox that should receive inquiries (defaults to `webzy3bro@gmail.com`)

For local development, copy `.env.example` to `.env` and replace the example values. Keep `.env` out of version control. In Netlify, add the variables in **Site configuration → Environment variables**, then redeploy the site so the function receives them.

The form shows a success message only after Gmail accepts the email. If email delivery is not configured or fails, it displays an error so the visitor can try again.
