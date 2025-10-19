"use client";
import React, { use, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/config/firebase";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile, updateUserProfile } from "@/store/firestore";
import Loading from "@/component/load";

import { updateProfile } from "firebase/auth";
import { redirect } from "next/navigation";

const page = () => {
  const { user, profile } = useAuthStore();
  const [name, setName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const authProvider = user?.providerData[0]?.providerId;

  useEffect(() => {
    useAuthStore.getState().loading && (
      <div className="h-[80vh] flex flex-col justify-center">
        <Loading width={12} height={12} />
      </div>
    );
  });

  const formatProviderName = (id: string) => {
    switch (id) {
      case "password":
        return "Email";
      case "google.com":
        return (
          <span className="flex items-center gap-1">
            <img
              width={17}
              height={17}
              src="/images/google.png"
              alt="google icon"
            />
            Google
          </span>
        );
      case "facebook.com":
        return "Facebook";
      case "github.com":
        return "GitHub";
      default:
        return id;
    }
  };

  const handleNameUpdate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateProfile(user, { displayName: name });
      toast.success("Name updated successfully");
      setEditingName(false);
      await updateUserProfile(user.uid, { name });
    } catch (err) {
      toast.error("Error updating name:");
    } finally {
      setLoading(false);
    }
  };

  async function handleSignOut() {
    try {
      setLoading(true);
      router.push("/");
      await signOut(auth);
      toast.success("successfully signed out");
      await fetch("/api/logout", { method: "POST" });
    } catch (err) {
      toast.error("there was an error signing out");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      {/* Profile Section */}
      <section className="dark:bg-black flex-wrap gap-4 flex items-start justify-between dark:text-slate-50 rounded-2xl shadow p-6 space-y-4">
        <div className="flex items-start gap-4">
          <img
            src={user?.photoURL || "/images/user.png"}
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover border"
          />
          <div>
            {editingName ? (
              <div className="flex gap-2 flex-wrap-reverse">
                <input
                  placeholder="Edit name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow-2xl border-none outline-none dark:bg-gray-900 dark:text-white bg-white rounded px-2 py-1 text-black"
                />

                <button
                  onClick={() => setEditingName(false)}
                  className="text-gray-600 dark:text-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  {user?.displayName || "No Name"}
                </h2>
                <button
                  onClick={() => setEditingName(true)}
                  className="text-sm text-indigo-700 cursor-pointer hover:underline"
                >
                  Edit
                </button>
              </div>
            )}
            <p className="text-gray-600 mt-1.5 dark:text-slate-100">
              {user?.email}
            </p>
          </div>
        </div>

        {editingName && (
          <button
            onClick={() => {
              if (!name) return;
              handleNameUpdate();
            }}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded place-content-end px-3 py-1 min-w-12 min-h-6 cursor-pointer transition-colors"
          >
            {loading ? (
              <div className="relative m-auto w-5 h-5">
                <span className="border-2 border-t-transparent border-white absolute p-2 rounded-full animate-spin inset-0 m-auto"></span>
              </div>
            ) : (
              "Save"
            )}
          </button>
        )}
      </section>

      {/* Profile Details */}
      <section className="dark:bg-black dark:text-slate-50 rounded-2xl shadow p-6  space-y-3">
        <h3 className="text-lg font-semibold border-b pb-2 dark:text-gray-300">
          Profile Details
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-sm">
            <span>Uid:</span>
            <span className="text-xs text-gray-400">{user?.uid}</span>
          </div>
          <div className="flex justify-between text-sm">
            <div className="text-sm">
              {formatProviderName(authProvider || "")}
            </div>
            <span className="text-xs text-gray-400">Connected</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Subscription:</span>
            <span className="text-xs text-gray-400">{profile?.plan}</span>
          </div>
          {profile?.plan === "free" ? (
            ""
          ) : (
            <div className="flex justify-between text-sm">
              <span>BillingCycle:</span>
              <span className="text-xs text-gray-400">
                {profile?.billingCycle}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span>Account Created:</span>
            <span className="text-xs text-gray-400">
              {user?.metadata.creationTime}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Last Login:</span>
            <span className="text-xs text-gray-400">
              {user?.metadata.lastSignInTime}
            </span>
          </div>
        </div>
      </section>

      {/* Settings */}
      <section className="dark:bg-black text-slate-50 rounded-2xl shadow p-6 space-y-3">
        <button
          onClick={handleSignOut}
          className="w-full bg-indigo-500 rounded-lg py-2 hover:bg-indigo-600 transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </section>
    </div>
  );
};

export default page;
