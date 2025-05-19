'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import type { Appearance } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

// Load Stripe with publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Public key not defined');
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('Fetch response status:', res.status);
        return res.json();
      })
      .then((data) => {
        console.log('Fetch response data:', data);
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error('No client secret received:', data);
          setError(data.error || 'Failed to load payment form');
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Network error occurred');
      });
  }, []);

  // const appearance = {
  //   theme: 'night',
  //   labels: 'floating',
  // };

  const appearance: Appearance = {
  theme: 'night',
  labels: 'floating',
  // other optional styling options
};

  return (
    <div className="max-w-6xl mx-auto p-10 text-gray-800 text-center border border-gray-300 m-10 rounded-md bg-gradient-to-tr from-gray-100 to-gray-300">
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <div className="text-center">
          <p>Loading payment form...</p>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}