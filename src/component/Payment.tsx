import { updateUserProfile } from "@/store/firestore";
import { toast } from "react-toastify";
import { auth } from "@/lib/config/firebase";

export async function payWithPaystack({
  amount,
  email,
}: {
  amount: number;
  email: string;
}) {
  try {
    if (!auth.currentUser) {
      toast.error("Please log in to continue");
      return;
    }
    if (amount === 0 && auth.currentUser?.uid) {
      toast.info("Subscribing to free plan...");
      await updateUserProfile(auth.currentUser?.uid, { plan: "free" });
      return;
    }

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
  } catch (_err) {
    toast.error("Faild to initialize payment");
  }
}
