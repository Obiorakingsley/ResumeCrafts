"use client";
import { useEffect, useState, use } from "react";
import { updateUserProfile, savePayment } from "@/store/firestore";

import { auth } from "@/lib/config/firebase";
import { useRouter } from "next/navigation";
import Loading from "@/component/load";

export default function PaymentSuccess({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const [status, setStatus] = useState("Verifying payment");
  const searchParam = use(searchParams);
  const router = useRouter();

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
          router.push("/pricing");
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
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="flex items-center flex-col gap-1.5">
        {status === "Verifying payment" && <Loading width={10} height={10} />}
        <h1 className="text-2xl font-normal">{status}</h1>
      </div>
    </div>
  );
}
