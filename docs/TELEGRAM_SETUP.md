# Telegram Bot and Mini App Setup

## Protect the bot token

The token shared in chat is compromised. Revoke it in BotFather with `/revoke`, select `@AdonayTiktokAcademyofficialBot`, and use the replacement token. Keep the replacement only in `backend/.env`; never put it in frontend variables, source code, screenshots, or logs.

## Configure the backend

Copy `backend/.env.example` to `backend/.env`. Never copy real credential values into the example template or commit a real `.env` file.

### Runtime variables

Required by the current backend runtime:

- `PORT`: optional on Render (Render provides it); defaults to `5000` locally.
- `MONGO_URI`: required; Mongoose exits the process if the database connection fails.
- `JWT_SECRET`: required for admin login and protected admin APIs.
- `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: required by the current Cloudinary config module. Use the existing academy Cloudinary account values.
- `FRONTEND_URL`: comma-separated allowed browser origins for API CORS, for example `https://www.adonaytiktokacademy.com,https://adonaytiktokacademy.com`.
- `TELEGRAM_BOT_TOKEN`: required to run the bot and validate Mini App `initData`; keep it private.

Used by existing integrations when configured:

- `RESEND_API_KEY`: enables transactional email. Without it, email sending is unavailable.
- `RESEND_FROM_EMAIL`: sender identity; defaults to the academy sender in code.
- `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`: required only for Zoom meeting creation; webinar code reports a missing-credentials error when those operations are attempted.
- `BACKEND_URL`: deployment base URL for links where a backend origin is needed; not currently read by the server entry point.
- `NODE_ENV`: standard Node runtime mode; Render sets `production`.
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`: only needed when running `node createAdmin.js` to provision an admin; not runtime bot credentials.

Telegram settings:

- `TELEGRAM_BOT_TOKEN` to the newly rotated token.
- `TELEGRAM_BOT_USERNAME` to `AdonayTiktokAcademyofficialBot` (without `@`).
- `TELEGRAM_MINI_APP_URL` to `https://www.adonaytiktokacademy.com/app` (the canonical website host).
- `TELEGRAM_SUPPORT_USERNAME` to `Adonaytiktokacademysupport` (without `@`).
- `TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL` to the academy channel invite link.
- `TELEGRAM_STUDENT_GROUP_URL` to the student group invite link.
- `TELEGRAM_STUDENT_GROUP_ID` and `TELEGRAM_ANNOUNCEMENTS_CHANNEL_ID` to numeric IDs after discovery. The current bot’s menu works without either ID.
- `ADMIN_TELEGRAM_IDS` is reserved for Telegram-based admin authorization; the current diagnostics use the existing JWT-protected admin login instead. It is not a substitute for a JWT and is not currently read by runtime code.
- `TELEGRAM_WEBHOOK_SECRET` is reserved for a future webhook deployment. The current service uses long polling and does not use this secret.
- `TELEGRAM_STUDENT_GROUP_URL` and `TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL` are invite links shown as menu shortcuts. They are not chat IDs.
- `PAYMENT_PROVIDER`, `PAYMENT_RECEIPTS_FOLDER`, and `MAX_RECEIPT_SIZE_MB` are reserved configuration for the later payment-receipt workflow and are not currently read by the runtime.

The bot uses long polling and starts when the backend starts if a token is configured. It checks Telegram's webhook status first and refuses to start polling when a webhook is active. Without a token, the existing API still starts and the bot stays disabled. The Mini App URL must use HTTPS.

### Find student-group and channel IDs

The bot receives updates using its existing long-polling process; do not start another polling script while the service is running. The backend keeps only chat ID, title, chat type, update type, membership status, and observation timestamps in memory. It does not retain message text.

1. Log in to the existing admin website and obtain its normal bearer JWT.
2. Add the bot to the student group. With group privacy enabled, send a command such as `/start@AdonayTiktokAcademyofficialBot` or mention the bot so an update reaches it. Make sure the bot remains a member.
3. Add the bot as an administrator in the announcements channel, with permission to view channel posts. Publish a test post after the bot has started.
4. Request `GET https://adonay-tiktok-academy.onrender.com/api/telegram/admin/chat-diagnostics` with `Authorization: Bearer <admin JWT>`. The route requires the same signed admin JWT issued by `POST /api/auth/login` and returns only group/channel metadata to an authenticated admin.
5. Copy the `id` for the `student_group` into Render's `TELEGRAM_STUDENT_GROUP_ID`; copy the `announcements_channel` `id` into `TELEGRAM_ANNOUNCEMENTS_CHANNEL_ID`. Save and redeploy.

If no chat appears, confirm the bot is running with the rotated token, re-add it to the correct chat, and send a new group command or channel post while Render logs indicate the service is up. A channel bot must be an administrator to receive channel posts. The bot cannot determine a chat ID from a private invite link alone. The diagnostic cache is in-memory and clears on restart, so do discovery after deployment has settled.

The authenticated admin API can send a plain-text announcement after an ID has been configured: `POST /api/telegram/admin/broadcast` with JSON `{ "target": "announcements", "text": "..." }` or `{ "target": "community", "text": "..." }`. It uses only the configured numeric IDs. Treat this as a public broadcast action and restrict access to trusted admins.

## Configure BotFather

1. Use `/setdescription` and `/setabouttext` to add the academy description and short about text.
2. Use `/setuserpic` to upload the approved academy logo.
3. Use `/setmenubutton`, select the bot, choose a label such as `Open Academy`, and enter the same HTTPS Mini App URL.
4. Confirm the frontend deployment serves `/app` as the React application. The current Vercel rewrite supports this route.

The bot registers `/start`, `/help`, `/register`, `/courses`, `/account`, `/payments`, `/webinars`, `/announcements`, `/faq`, `/support`, and `/about` with Telegram when it starts. In private chat, `/start` displays a direct Mini App launch button and shortcuts, including configured announcement and student-community links. `/courses` displays verified open programs; `/webinars` queries upcoming public sessions without exposing private meeting URLs. Account and payment status are not linked to Telegram student records yet, so the bot says so instead of claiming those features are active. The persistent chat menu is configured to open the Mini App. Bot description text is synchronized at startup; set the profile photo in BotFather with `/setuserpic`.

## Local development

Run the backend in one terminal with `cd backend` and `npm run dev`. In another terminal, run `cd frontend` and `npm run dev`. Set `VITE_API_URL=http://localhost:5000/api` in `frontend/.env` if it is not already set.

Telegram requires an HTTPS URL reachable from the public internet. For local Mini App testing, expose the Vite development server through a trusted HTTPS tunnel, set its URL plus `/app` as `TELEGRAM_MINI_APP_URL`, and restart the backend. Do not use the development tunnel for production.

The Mini App validates Telegram `initData` with the backend and rejects data older than 24 hours. This version uses the verified Telegram profile for display only; it does not yet create a persisted student account or link the existing registration record to a Telegram ID. Registration and webinar submissions use the existing academy API routes. Payment checkout and student course access are not part of this bot/Mini App implementation.
