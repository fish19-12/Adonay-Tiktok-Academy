# Telegram Bot and Mini App Setup

## Protect the bot token

The token shared in chat is compromised. Revoke it in BotFather with `/revoke`, select `@AdonayTiktokAcademyofficialBot`, and use the replacement token. Keep the replacement only in `backend/.env`; never put it in frontend variables, source code, screenshots, or logs.

## Configure the backend

Copy `backend/.env.example` to `backend/.env`, then set:

- `TELEGRAM_BOT_TOKEN` to the newly rotated token.
- `TELEGRAM_BOT_USERNAME` to `AdonayTiktokAcademyofficialBot` (without `@`).
- `TELEGRAM_MINI_APP_URL` to `https://www.adonaytiktokacademy.com/app` (the canonical website host).
- `TELEGRAM_SUPPORT_USERNAME` to `fera_tech` (without `@`).
- `TELEGRAM_ANNOUNCEMENTS_CHANNEL_URL` to the academy channel invite link.
- `TELEGRAM_STUDENT_GROUP_URL` to the student group invite link.
- `FRONTEND_URL` to the frontend origin so the existing API CORS policy permits it.
- `TELEGRAM_STUDENT_GROUP_URL` only if there is an approved invite link that is safe to distribute.

The bot uses long polling and starts when the backend starts if a token is configured. Without a token, the existing API still starts and the bot stays disabled. The configured Mini App URL must use HTTPS; buttons otherwise fall back to the corresponding public academy pages.

## Configure BotFather

1. Use `/setdescription` and `/setabouttext` to add the academy description and short about text.
2. Use `/setuserpic` to upload the approved academy logo.
3. Use `/setmenubutton`, select the bot, choose a label such as `Open Academy`, and enter the same HTTPS Mini App URL.
4. Confirm the frontend deployment serves `/app` as the React application. The current Vercel rewrite supports this route.

The bot registers `/start`, `/help`, `/register`, `/courses`, `/account`, `/payments`, `/webinars`, `/announcements`, `/faq`, `/support`, and `/about` with Telegram when it starts. In private chat, `/start` displays a direct Mini App launch button and shortcuts, including configured announcement and student-community links. The persistent chat menu is also configured to open the Mini App. Bot description text is synchronized at startup; set the profile photo in BotFather with `/setuserpic`.

## Local development

Run the backend in one terminal with `cd backend` and `npm run dev`. In another terminal, run `cd frontend` and `npm run dev`. Set `VITE_API_URL=http://localhost:5000/api` in `frontend/.env` if it is not already set.

Telegram requires an HTTPS URL reachable from the public internet. For local Mini App testing, expose the Vite development server through a trusted HTTPS tunnel, set its URL plus `/app` as `TELEGRAM_MINI_APP_URL`, and restart the backend. Do not use the development tunnel for production.

The Mini App validates Telegram `initData` with the backend and rejects data older than 24 hours. This version uses the verified Telegram profile for display only; it does not yet create a persisted student account or link the existing registration record to a Telegram ID. Registration and webinar submissions use the existing academy API routes. Payment checkout and student course access are not part of this bot/Mini App implementation.
