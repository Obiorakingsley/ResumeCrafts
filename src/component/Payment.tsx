import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";

export async function payWithPaystack({
  amount,
  email,
}: {
  amount: number;
  email: string;
}) {
  const res = await fetch("/api/paystack/initialize", {
    method: "POST",
    body: JSON.stringify({
      email,
      amount,
    }),
  });
  const data = await res.json();

  if (data.data?.authorization_url) {
    window.location.href = data.data.authorization_url;
  } else {
    toast.error("Failed to initialize payment");
  }
}
