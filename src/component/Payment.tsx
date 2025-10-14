"use client";
import { useState } from "react";

export default function PayWithPaystack({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      body: JSON.stringify({
        email,
        amount: 3000,
      }),
    });
    const data = await res.json();
    console.log(data);

    setLoading(false);

    if (data.data?.authorization_url) {
      window.location.href = data.data.authorization_url;
    } else {
      alert("Failed to initialize payment");
    }
  }

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="px-4 py-2 bg-green-600 text-white rounded-lg"
    >
      {loading ? "Processing..." : "Pay ₦3000"}
    </button>
  );
}
