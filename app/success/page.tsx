'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const plan = params.get('plan');
  const mock = params.get('mock');

  const [submitted, setSubmitted] = useState(false);

  // 🔁 Redirect after mock success
  useEffect(() => {
    if (submitted) {
      const timeout = setTimeout(() => {
        router.push('/'); // or '/dashboard' if that's your main page
      }, 3000); // 3 seconds

      return () => clearTimeout(timeout);
    }
  }, [submitted, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-4xl font-bold mb-4">Checkout</h1>

      <p className="mb-6 text-lg">
        {mock === 'true'
          ? `You're upgrading to the ${plan} plan.`
          : 'Stripe real payment confirmed.'}
      </p>

      {!submitted ? (
        <form
          className="bg-white text-black rounded-xl p-6 w-full max-w-md shadow-lg"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <label className="block mb-2 font-semibold">Card Number</label>
          <input
            type="text"
            placeholder="4242 4242 4242 4242"
            className="w-full mb-4 px-3 py-2 border rounded-md"
            required
          />

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 font-semibold">Expiry</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-semibold">CVC</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full"
          >
            Complete Payment
          </button>
        </form>
      ) : (
        <div className="text-center mt-6 text-green-400 text-xl font-semibold">
          ✅ Payment completed (mock)!<br />
          Redirecting back...
        </div>
      )}
    </div>
  );
}
