import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// ✅ Add this line to debug
console.log("Loaded Stripe Secret Key:", stripeSecretKey?.slice(0, 10));

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(stripeSecretKey, {
  // @ts-expect-error: Suppress incorrect TS error until Stripe types are updated
  apiVersion: '2024-04-10',
});

// Define subscription plans
export const STRIPE_PLANS = {
  PRO: {
    name: 'Pro Plan',
    price: 999, // $9.99 in cents
    credits: 100,
    description: 'Get 100 credits and pro features',
  },
  PREMIUM: {
    name: 'Premium Plan',
    price: 1999, // $19.99 in cents
    credits: 250,
    description: 'Get 250 credits and premium features',
  },
} as const;
