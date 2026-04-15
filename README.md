# GoalPilot AI (MVP)

GoalPilot AI is a cross-platform mobile MVP built with **React Native CLI** (no Expo) and a **Node.js/Express** backend.

## Monorepo Structure

- `frontend/` React Native CLI app (Android + iOS)
- `backend/` Express API, MongoDB, JWT auth, Stripe, Firebase, OpenAI
- `.github/workflows/` CI checks
- `codemagic.yaml` iOS build pipeline via Codemagic

## Features

- JWT signup/login + persistent auth
- Goal creation with optional duration
- AI roadmap generation in strict JSON schema
- Daily task checklist, progress and streaks
- FCM notifications (Android + iOS)
- Stripe monthly subscription ($13) with webhook validation
- Dashboard analytics
- Dark mode friendly UI foundation

## Quick Start (Windows)

### Prerequisites

- Node.js 20+
- JDK 17 + Android Studio + Android SDK
- React Native CLI (`npm i -g react-native-cli`)
- MongoDB Atlas cluster
- Firebase project with FCM
- Stripe account
- OpenAI API key
- GitHub repo + Codemagic account

### 1) Clone and install

```bash
git clone <your-repo-url>
cd GoalPilotAI
cd backend && npm install
cd ../frontend && npm install
```

### 2) Environment setup

Copy env templates:

```bash
copy backend\\.env.example backend\\.env
copy frontend\\.env.example frontend\\.env
```

Fill in all required keys.

### 3) Run backend

```bash
cd backend
npm run dev
```

### 4) Run Android locally (Windows)

```bash
cd frontend
npx react-native run-android
```

### 5) iOS build using Codemagic (cloud macOS)

1. Push repo to GitHub.
2. Connect repo in Codemagic.
3. Add environment variables from `frontend/.env.example` + Apple signing credentials.
4. Start build with workflow `ios-release` from `codemagic.yaml`.
5. Download IPA / submit to TestFlight.

## Key Setup Guides

- [Backend Setup](backend/README.md)
- [Frontend Setup](frontend/README.md)
- [Firebase FCM Setup](docs/firebase-setup.md)
- [Stripe Setup](docs/stripe-setup.md)
- [Codemagic iOS Setup](docs/codemagic-ios.md)

## Production Notes

- Keep secrets in CI env vars, never in Git.
- Verify Stripe webhook signatures.
- Restrict CORS to trusted domains.
- Use secure storage for JWT refresh tokens in production.
