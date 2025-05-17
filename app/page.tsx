'use client';

import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/utils/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../components/CheckoutForm";

if(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined){
  throw new Error("public key not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Home(){
   const amount = 49.99;

  return (
  
<main className="max-w-6xl mx-auto p-10 text-gray-800 text-center border border-gray-300 m-10 rounded-md bg-gradient-to-tr from-gray-100 to-gray-300">
  <div className="mb-10">
    <h1 className="text-4xl font-extrabold mb-2">Meenu</h1>
    <h2 className="text-2xl">has requested</h2>
    <span className="font-bold">${amount}</span>
  </div>

  <Elements 
    stripe={stripePromise}
    options={{
      mode: 'payment',
      amount: convertToSubcurrency(amount),
      currency: 'usd',
    }}
  >
    <CheckoutForm amount={amount} />
  </Elements>
</main>

)}