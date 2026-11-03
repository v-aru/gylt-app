# GYLT: Get Your Life Together

GYLT is a personal management app that helps you build habits and keep your subscriptions under control.

- **Habit Tracker:** create daily, weekly, monthly or custom-day habits, tick them off, and see your week at a glance.
- **Subscription Manager:** track what you pay for, when it renews, and what it costs you per month and per year, with a heads-up before each renewal.

More features (Health Tracker, To-Do List, Pomodoro Timer, Budget Tracker) are planned for later.

---

## Features

### Dashboard
- A random motivational quote.
- Today's habits with a progress count. Tick them off right there.
- Subscriptions renewing in the next 30 days.
- A month calendar.

### Habit Tracker
- **Create** a habit with a name, category, color and frequency:
  - *Daily:* every day.
  - *Weekly:* on the same weekday it started.
  - *Monthly:* on the same date it started (or the last day of shorter months).
  - *Custom:* on the weekdays you pick.
- **Read:** pick any day in the week bar to see what's due, and see the weekly progress table (done / due).
- **Update:** tick a habit off for today or any past day; click a habit to edit it.
- **Delete:** remove a habit from the edit dialog.
- **Filter** both views by color.

### Subscription Manager
- **Create** a subscription with name, category, cost and currency, billing cycle (weekly / monthly / yearly), next renewal date, a "remind me X days before" setting, and a payment label (e.g. "PayPal").
- **Read:** all subscriptions sorted by next renewal, plus monthly and yearly totals.
- **Update / Delete:** click a subscription to edit or remove it.
- **Renewal alerts:** a banner and badges flag every subscription inside its reminder window. Past renewal dates roll forward automatically by the billing cycle.

### Accounts
- Sign up and sign in with email and password (passwords are hashed with bcrypt).
- Optional Google, GitHub and Facebook sign-in. Each button only appears when that provider's keys are configured.
- Profile page with editable details.
- Every habit and subscription belongs to the signed-in user; the API never returns or changes another user's data.

---

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your environment file:
   ```bash
   cp .env.example .env.local
   ```
   Then fill in:
   - `MONGODB_URI`: a local MongoDB (`mongodb://127.0.0.1:27017/gylt`) or a MongoDB Atlas connection string.
   - `NEXTAUTH_SECRET`: generate one with `openssl rand -base64 32`.
   - Optionally, OAuth keys for Google / GitHub / Facebook.

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000), go to **Profile**, and sign up.

### Deploying (e.g. Vercel)
Set the same environment variables in your hosting provider. Set `NEXTAUTH_URL` to your production URL, and add that URL as an authorized callback (`<url>/api/auth/callback/<provider>`) for any OAuth provider you use.

---

## Project structure

```
pages/                 Next.js pages (Pages Router)
  index.js             Dashboard
  habits.js            Habit tracker
  subscriptions.js     Subscription manager
  profile.js           Sign in / sign up / profile
  api/                 API routes: auth, signup, profile, habits, subscriptions
src/
  backend/             MongoDB connection and Mongoose models
  components/          UI components
  context/             Habits and subscriptions data providers
  lib/                 Date helpers, API client, API auth helper
  data/quotes.js       Motivational quotes
styles/                Global CSS and shared styled-components
```

## Technologies used
- **Next.js 14** (Pages Router) with API routes
- **React 18**
- **MongoDB** with **Mongoose**
- **NextAuth.js** for authentication
- **styled-components** for styling

## License
This project is licensed under the MIT License.
