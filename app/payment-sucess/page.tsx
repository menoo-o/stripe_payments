'use server'

import Link from "next/link";

export default async function PaymentSuccess( {searchParams,}: { searchParams: Promise<{ amount: string }>; }) {
  const { amount } = await searchParams;

    return (
      <main className="max-w-6xl mx-auto p-10 text-center border border-gray-200 rounded-xl shadow-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
  <div className="mb-10">
    {/* Checkmark Icon */}
    <div className="flex justify-center mb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-20 h-20 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>

    {/* Title & Subtitle */}
    <h1 className="text-5xl font-extrabold mb-4">Payment Successful!</h1>
    <p className="text-xl mb-8 max-w-md mx-auto">
      Thank you for your order. Your payment has been processed successfully.
    </p>

    {/* Amount Box */}
    <div className="bg-white p-5 rounded-xl shadow-md text-purple-600 text-4xl font-bold inline-block">
      ${amount}
    </div>

    {/* Optional: Order Summary / Email Confirmation */}
    <p className="mt-6 text-lg text-gray-100">
      A confirmation email has been sent to your inbox.
    </p>
  </div>

  {/* Back to Home Button */}
  <div className="mt-10">
    <Link
      href="/"
      className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full shadow hover:bg-gray-100 transition-all"
    >
      Back to Home
    </Link>
  </div>
</main>
    );
  }