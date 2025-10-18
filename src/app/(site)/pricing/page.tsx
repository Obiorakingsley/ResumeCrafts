"use client";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { payWithPaystack } from "@/component/Payment";
import { toast } from "react-toastify";
import { auth } from "@/lib/config/firebase";
import Loading from "@/component/load";

type BillingCycle = "monthly" | "yearly";

interface PricingCardProps {
  title: string;
  amount: number;
  description: string;
  price: string;
  priceSuffix?: string;
  features?: string[];
  disabledFeatures?: string[];
  buttonText: string;
  disabledButton?: boolean;
  highlight?: boolean;
  popular?: boolean;
}

function PricingCard({
  amount,
  title,
  description,
  price,
  priceSuffix = "",
  features = [],
  disabledFeatures = [],
  buttonText,
  disabledButton,
  highlight,
  popular,
}: PricingCardProps) {
  const [loading, setLoading] = useState(false);
  function handleApayment() {
    setLoading(true);
    if (!auth.currentUser?.email) {
      toast.error("Please login to continue");
      return setLoading(false);
    }
    payWithPaystack({ amount, email: auth.currentUser?.email }).catch(() => {
      toast.error("Payment failed. Please try again.");

      setLoading(false);
    });
  }
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-2xl p-8 flex flex-col relative shadow transition 
      ${
        highlight
          ? "bg-gradient-to-b from-indigo-600 to-indigo-700 text-white"
          : "bg-white dark:bg-slate-900 dark:text-gray-100"
      }`}
    >
      {popular && (
        <span className="absolute top-4 right-4 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-gray-800">
          Most Popular
        </span>
      )}

      <h2 className={`text-2xl font-semibold mb-2`}>{title}</h2>

      <p
        className={`mb-6 ${
          highlight ? "text-indigo-100" : "text-gray-600 dark:text-gray-400"
        }`}
      >
        {description}
      </p>

      <div className="text-4xl font-bold mb-6">
        ₦{price}
        <span
          className={`text-lg font-medium ${
            highlight ? "text-indigo-100" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {" "}
          {priceSuffix}
        </span>
      </div>

      <ul className="space-y-3 flex-1">
        {features.map((f, i) => (
          <li
            key={i}
            className={`flex items-center gap-2 ${
              highlight ? "text-white" : ""
            }`}
          >
            <Check className="w-5 h-5" />
            <span>{f}</span>
          </li>
        ))}
        {disabledFeatures.map((f, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-gray-400 dark:text-gray-500"
          >
            <X className="w-5 h-5 text-red-500" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          handleApayment();
        }}
        disabled={disabledButton || loading}
        className={`mt-8 w-full py-2 rounded-lg font-medium transition 
        ${
          disabledButton
            ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
            : highlight
            ? "bg-white cursor-pointer text-indigo-700 hover:bg-indigo-50"
            : "bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700"
        }`}
      >
        {buttonText}
      </button>
    </motion.div>
  );
}

export default function PricingPage() {
  const { user, loading, setLoading } = useAuthStore();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const store = useAuthStore.getState();
  return loading ? (
    <div className="w-full min-h-[80vh] absolute flex flex-col justify-center items-center">
      <Loading width={10} height={10} />
    </div>
  ) : (
    <div className="pricing min-h-screen py-16 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Choose Your Perfect Plan
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Upgrade anytime. Start free, scale when you're ready
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-10">
        <div className="bg-white dark:bg-slate-800 shadow rounded-full flex">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition 
            ${
              billingCycle === "monthly"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly Billing
          </button>

          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition 
            ${
              billingCycle === "yearly"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly Billing
            <span className="ml-1 text-xs text-green-600 font-semibold">
              (Save 20%)
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingCard
          amount={0}
          title="Free"
          price="0"
          description="For beginners who want to test the waters."
          features={["Access to 1 basic template", "PDF download only"]}
          disabledFeatures={[
            "DOCX download",
            "Unlimited Downloads",
            "Multiple resumes",
          ]}
          buttonText={
            store.profile?.plan === "free" ? "Current Plan" : "Free plan"
          }
          disabledButton={store.profile?.plan === "free"}
        />

        <PricingCard
          popular
          title="Pro"
          amount={billingCycle === "monthly" ? 3000 : 30000}
          price={billingCycle === "monthly" ? "3,000" : "30,000"}
          description={
            billingCycle === "monthly"
              ? "Best for job seekers who want flexibility."
              : "Save more with annual billing."
          }
          priceSuffix={billingCycle === "monthly" ? "/mo" : "/yr"}
          features={[
            "All premium templates",
            "Unlimited Downloads",
            "PDF & DOCX download",

            "Multiple resume saves",
            "Priority support",
          ]}
          buttonText={
            store.profile?.plan === "pro" &&
            billingCycle === store.profile.billingCycle
              ? "Current Plan"
              : `Upgrade to Pro (${billingCycle})`
          }
          disabledButton={
            store.profile?.plan === "pro" &&
            billingCycle === store.profile.billingCycle
          }
          highlight
        />

        <PricingCard
          title="Lifetime"
          amount={50000}
          price="50,000"
          description="One-time payment, unlimited forever 🔥"
          features={[
            "All Pro features",
            "Lifetime access",
            "Future updates included",
            "Early adopter badge",
          ]}
          buttonText={
            store.profile?.plan === "lifetime"
              ? "Current Plan"
              : "Buy Lifetime Deal"
          }
          disabledButton={store.profile?.plan === "lifetime"}
        />
      </div>
    </div>
  );
}
