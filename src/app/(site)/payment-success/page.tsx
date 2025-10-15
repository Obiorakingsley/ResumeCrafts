"use client";
import { useEffect, useState, use } from "react";
import { updateUserProfile, savePayment } from "@/store/firestore";
import { useAuthStore } from "@/store/useAuthStore";
import { auth } from "@/lib/config/firebase";

export default function PaymentSuccess({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const [status, setStatus] = useState("Verifying payment");
  const { user } = useAuthStore();
  const searchParam = use(searchParams);

  useEffect(() => {
    async function verifyPayment() {
      try {
        const res = await fetch(
          `/api/paystack/verify?reference=${searchParam.reference}`
        );
        const data = await res.json();
        if (auth.currentUser === null) {
          setStatus("User not found. Please login to continue.");
          return;
        }

        if (data.data?.status === "success") {
          setStatus("Payment successful!");
          console.log("Payment verified:", data);

          if (data.data.amount / 100 === 3000) {
            await updateUserProfile(auth.currentUser.uid, {
              plan: "pro",
              billingCycle: "monthly",
            });
          } else if (data.data.amount / 100 === 50000) {
            await updateUserProfile(auth.currentUser.uid, { plan: "lifetime" });
          } else if (data.data.amount / 100 === 30000) {
            await updateUserProfile(auth.currentUser.uid, {
              plan: "pro",
              billingCycle: "yearly",
            });
          } else if (data.data.amount / 100 < 3000) {
            await updateUserProfile(auth.currentUser.uid, { plan: "free" });
          }
          await savePayment(auth.currentUser.uid, {
            reference: data.data.reference,
            amount: data.data.amount / 100,
            status: data.status,
            message: data.message,
            id: data.data.customer.id,
            firstName: data.data.customer.first_name,
            lastName: data.data.customer.last_name,
            channel: data.data.channel,
            currency: data.data.currency,
            email: data.data.customer.email,
          });
        } else {
          setStatus("Payment verification failed.");
        }
      } catch (error) {
        setStatus("Error verifying payment.");
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
      <h1 className="text-2xl font-normal">{status}</h1>
    </div>
  );
}
