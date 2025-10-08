"use client";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/config/firebase";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { updateProfile } from "firebase/auth";

const page = () => {
  const { user } = useAuthStore();
  const [name, setName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNameUpdate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateProfile(user, { displayName: name });
      setEditingName(false);
    } catch (err) {
      toast.error("Error updating name:");
    } finally {
      setLoading(false);
    }
  };

  function handleSignOut() {
    try {
      signOut(auth);
      router.push("/");
    } catch (err) {
      toast.error("there was an error");
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      {/* Profile Section */}
      <section className="dark:bg-black flex-wrap gap-4 flex items-start justify-between dark:text-slate-50 rounded-2xl shadow p-6 space-y-4">
        <div className="flex items-start gap-4">
          <img
            src={
              user?.photoURL ||
              `https://ui-avatars.com/api/?name=${user?.displayName || "User"}`
            }
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
                  className="shadow-2xl border-none outline-none dark:bg-slate-300 bg-white rounded px-2 py-1 text-black"
                />

                <button
                  onClick={() => setEditingName(false)}
                  className="text-gray-600 dark:text-slate-50"
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
                  className="text-sm text-indigo-700 hover:underline"
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
            onClick={handleNameUpdate}
            disabled={loading}
            className="bg-indigo-600 text-white rounded place-content-end px-3 py-1"
          >
            {loading ? (
              <div className="relative m-auto w-6 h-6">
                <span className="border-2 border-t-transparent border-white absolute p-2 rounded-full animate-spin inset-0 m-auto"></span>
              </div>
            ) : (
              "Save"
            )}
          </button>
        )}
      </section>

      {/* Profile Details */}
      <section className="dark:bg-black dark:text-slate-50 rounded-2xl shadow p-6 space-y-3">
        <h3 className="text-lg font-semibold border-b pb-2">Profile Details</h3>
        <div className="flex justify-between">
          <span>Account Created:</span>
          <span className="text-sm">{user?.metadata.creationTime}</span>
        </div>
        <div className="flex justify-between">
          <span>Last Login:</span>
          <span className="text-sm">{user?.metadata.lastSignInTime}</span>
        </div>
      </section>

      {/* Settings */}
      <section className="dark:bg-black text-slate-50 rounded-2xl shadow p-6 space-y-3">
        <button
          onClick={handleSignOut}
          className="w-full bg-indigo-500 rounded-lg py-2 hover:bg-indigo-600 transition-colors"
        >
          Sign Out
        </button>
      </section>
    </div>
  );
};

export default page;
