# Stripe Setup ($13/month subscription)

## 1) Create product and recurring price

- Product: `GoalPilot Pro`
- Price: `$13/month`
- Save the `price_id` into backend env `STRIPE_PRICE_ID`.

## 2) API keys

- Put secret key in `STRIPE_SECRET_KEY` (backend).
- Put publishable key in frontend env `STRIPE_PUBLISHABLE_KEY`.

## 3) Webhook

- Endpoint: `https://<api-domain>/api/subscriptions/webhook`
- Listen to:
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- Save webhook secret to `STRIPE_WEBHOOK_SECRET`.

## 4) Access control

- Free users limited by `FREE_GOAL_LIMIT`.
- Pro users get unlimited goals.
