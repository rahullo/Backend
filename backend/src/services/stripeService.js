const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession({ customerEmail, customerId }) {
  return stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    customer_email: customerId ? undefined : customerEmail,
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${process.env.APP_BASE_URL}/billing/success`,
    cancel_url: `${process.env.APP_BASE_URL}/billing/cancel`,
  });
}

module.exports = { stripe, createCheckoutSession };
