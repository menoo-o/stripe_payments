"use client";

import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/utils/convertToSubcurrency";

export default function CheckoutForm({amount}: {amount:number}) {
  
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    fetch('/api/create-payment-intent', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({amount: convertToSubcurrency(amount) }),
    })
    .then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);
  

  const handleSubmit =async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setLoading(true);
  
    if(!stripe || !elements){
      return;
    }

    const {error: submitError} = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams:{
        return_url: `http://localhost:3000/payment-sucess?amunt=${amount}`,
      },
    });

    if(error){
      setErrorMessage(error.message)
    } else {

    }
    setLoading(false)

  }

  if (!clientSecret || !stripe || !elements){
    return <div>loading...</div>
  }





return(
  <form onSubmit={handleSubmit}>
    {clientSecret && <PaymentElement />}

    {errorMessage && <div>{errorMessage}</div>}

    <button 
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse" 
        disabled= {!stripe || loading}
    >
      {!loading ? `Pay $${amount}` : "Processing...."}
    </button>
  </form>
)


};
