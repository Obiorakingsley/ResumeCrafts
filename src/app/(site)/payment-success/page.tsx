"use client";
import { useEffect, useState, use } from "react";

export default function PaymentSuccess({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const [status, setStatus] = useState("Verifying payment");
  const searchParam = use(searchParams);

  useEffect(() => {
    async function verifyPayment() {
      try {
        const res = await fetch(
          `/api/paystack/verify?reference=${searchParam.reference}`
        );
        const data = await res.json();

        if (data.data?.status === "success") {
          setStatus("Payment successful!");
          console.log("Payment verified:", data);
        } else {
          setStatus("Payment verification failed.");
        }
      } catch (error) {
        setStatus("Error verifying payment.");
        console.error(error);
      }
    }

    verifyPayment();
  }, [searchParam.reference]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      {status === "Verifying payment" && (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 dark:border-white border-solid mb-4"></div>
        </div>
      )}
      <h1 className="text-2xl font-semibold">{status}</h1>
    </div>
  );
}
