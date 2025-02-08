import { useSearchParams } from 'next/navigation';

export default function CompletePage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  return (
    <div>
      {status === 'success' ? (
        <div>
          <h1>Payment Successful! 🎉</h1>
          <p>Your order is being processed</p>
        </div>
      ) : (
        <div>
          <h1>Payment Failed ❌</h1>
          <p>Please try again</p>
        </div>
      )}
    </div>
  );
}