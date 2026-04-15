# Backend (Node.js + Express)

## API Modules

- Auth: signup/login/me using JWT
- Goals: CRUD-lite + task completion + streaks
- AI: roadmap generation endpoint
- Subscriptions: Stripe checkout + webhook sync
- Dashboard: analytics summary

## Run

```bash
npm install
npm run dev
```

## Required Environment Variables

See `.env.example`.

## API Routes

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/goals`
- `POST /api/goals`
- `PATCH /api/goals/task-status`
- `POST /api/ai/generate-roadmap`
- `POST /api/subscriptions/checkout`
- `POST /api/subscriptions/webhook`
- `GET /api/dashboard/summary`

## Security Checklist

- Use strong `JWT_SECRET`
- Validate payloads with Joi/Zod for production hardening
- Restrict CORS in production
- Store Stripe and OpenAI keys in secure secret managers
