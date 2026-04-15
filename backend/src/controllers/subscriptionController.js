const User = require('../models/User');
const { createCheckoutSession, stripe } = require('../services/stripeService');

async function createCheckout(req, res, next) {
  try {
    const session = await createCheckoutSession({
      customerEmail: req.user.email,
      customerId: req.user.subscription.stripeCustomerId,
    });

    return res.json({ checkoutUrl: session.url });
  } catch (err) {
    return next(err);
  }
}

async function webhook(req, res, next) {
  try {
    const signature = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created') {
      const sub = event.data.object;
      await User.findOneAndUpdate(
        { 'subscription.stripeCustomerId': sub.customer },
        {
          $set: {
            'subscription.isActive': sub.status === 'active',
            'subscription.plan': sub.status === 'active' ? 'pro' : 'free',
            'subscription.stripeSubscriptionId': sub.id,
            'subscription.currentPeriodEnd': new Date(sub.current_period_end * 1000),
          },
        }
      );
    }

    return res.json({ received: true });
  } catch (err) {
    return next(err);
  }
}

module.exports = { createCheckout, webhook };
