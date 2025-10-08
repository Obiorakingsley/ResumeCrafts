"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResumeStore } from "@/store/resumeStore";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/config/firebase";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";

export default function Modal() {
  const { modal, setModal } = useResumeStore();
  const { setLoading, loading, user } = useAuthStore();
  const [isSignedUp, setIsSignedUp] = useState(true);

  //Form details schema
  const schema = z.object({
    Name: z.string().min(4, "Full name must be at least 4 characters long"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  type authT = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<authT>({ resolver: zodResolver(schema) });

  const sendData = async (data: authT) => {
    if (isSignedUp) {
      //Handle Email and Password Sign in
      try {
        setLoading(true);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;
        toast.success("Successfully signed in");
        reset();
        setModal(false);
      } catch (err: any) {
        err.code === "auth/invalid-credential"
          ? toast.error("Invalid Email or Password")
          : err.code === "auth/user-not-found"
          ? toast.error("User not found")
          : err.code === "auth/network-request-failed"
          ? toast.error("Network connection error")
          : toast.error(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      //Handle Email and Password Sign Up
      try {
        setLoading(true);
        const newUser = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        const user = newUser.user;
        await updateProfile(user, { displayName: data.Name });
        console.log(user.displayName);

        await signOut(auth);
        reset();
        setIsSignedUp(true);
      } catch (err: any) {
        err.code === "auth/invalid-credential"
          ? toast.error("Invalid Email or Password")
          : err.code === "auth/user-not-found"
          ? toast.error("User not found")
          : err.code === "auth/network-request-failed"
          ? toast.error("Network connection error")
          : toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  //Handle Google Sign IN
  async function handleGoogleSignIn() {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("successfully signed in");
      setModal(false);
    } catch (err: any) {
      err.code === "auth/invalid-credential"
        ? toast.error("Invalid Email or Password")
        : err.code === "auth/user-not-found"
        ? toast.error("User not found")
        : err.code === "auth/internal-error"
        ? toast.error("Network connection error")
        : toast.error(err.message);
    }
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogContent className="dark:bg-[#080808] bg-slate-200 dark:text-white text-black border border-slate-700 rounded-xl p-6 sm:max-w-md w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isSignedUp ? "Sign In" : "Sign Up"}
          </DialogTitle>
          <DialogDescription className="dark:text-slate-400 text-slate-600 text-md">
            {isSignedUp && "Welcome back! Please sign in to continue."}
          </DialogDescription>
        </DialogHeader>
        {isSignedUp ? (
          // Handle Sign in
          <form onSubmit={handleSubmit(sendData)} className="grid gap-4 mt-4">
            {/* Email */}

            <label
              htmlFor="emai"
              className="mb-1 text-sm font-medium flex flex-col text-left gap-1"
            >
              Email
              <input
                id="emai"
                type="email"
                placeholder="e.g. johndoe@email.com"
                className="bg-transparent border border-slate-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </label>

            {/* Password */}
            <label
              htmlFor="password"
              className="mb-1 text-sm font-medium flex flex-col text-left gap-1"
            >
              Password
              <input
                id="password"
                type="password"
                placeholder="********"
                className="bg-transparent border border-slate-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </label>

            {/* Sign In Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors mt-2 cursor-pointer"
            >
              {loading ? (
                <div className="relative m-auto w-6 h-6">
                  <span className="border-2 border-t-transparent border-white absolute p-2 rounded-full animate-spin inset-0 m-auto"></span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <span className="text-center">or</span>

            {/* //Google sign In */}
            <div className="flex items-center justify-center gap-4">
              <div
                onClick={() => {
                  handleGoogleSignIn();
                }}
                className="cursor-pointer"
              >
                <img
                  src="/images/google.png"
                  alt="Google icon"
                  height={25}
                  width={25}
                />
              </div>
              <button
                type="button"
                onClick={() => {}}
                className="dark:text-slate-50 text-black"
              >
                dont have an account?{" "}
                <span
                  onClick={() => {
                    reset();
                    setIsSignedUp((prev) => !prev);
                  }}
                  className="underline cursor-pointer text-indigo-500"
                >
                  Sign Up
                </span>
              </button>
            </div>
          </form>
        ) : (
          /////////////
          // Handle Sign up
          /////////////
          <form onSubmit={handleSubmit(sendData)} className="grid gap-4 mt-4">
            {/* Name */}
            <div className="flex flex-col text-left gap-1">
              <label htmlFor="Name" className="mb-1 text-sm font-medium">
                Name
              </label>
              <input
                id="Name"
                type="text"
                placeholder="e.g. John Doe"
                className="bg-transparent border border-slate-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                {...register("Name")}
              />
              {errors.Name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.Name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <label
              htmlFor="email"
              className="mb-1 text-sm font-medium flex flex-col text-left gap-1"
            >
              Email
              <input
                id="email"
                type="email"
                placeholder="e.g. johndoe@email.com"
                className="bg-transparent border border-slate-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </label>

            {/* Password */}
            <label
              htmlFor="password"
              className="mb-1 text-sm font-medium flex flex-col gap-1 text-left"
            >
              Password
              <input
                id="password"
                type="password"
                placeholder="********"
                className="bg-transparent border border-slate-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </label>

            {/* Sign Up Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors mt-2 cursor-pointer"
            >
              {loading ? (
                <div className="relative m-auto w-6 h-6">
                  <span className="border-2 border-t-transparent border-white absolute p-2 rounded-full animate-spin inset-0 m-auto"></span>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>

            <span className="text-center">or</span>

            {/* Google Sign In */}
            <div className="flex items-center justify-center gap-4">
              <div
                className="cursor-pointer"
                onClick={() => {
                  handleGoogleSignIn();
                }}
              >
                <img
                  src="/images/google.png"
                  alt="Google icon"
                  height={25}
                  width={25}
                />
              </div>
              <button className="dark:text-slate-50 text-black">
                dont have an account?{" "}
                <span
                  onClick={() => {
                    reset();
                    setIsSignedUp((prev) => !prev);
                  }}
                  className="underline text-indigo-500 cursor-pointer"
                >
                  Sign In
                </span>
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
