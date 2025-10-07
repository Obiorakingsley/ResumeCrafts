"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Button from "@/app/(build)/_Utils/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResumeStore } from "@/store/resumeStore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/config/firebase";

import { useAuthStore } from "@/store/useAuthStore";

export default function Modal() {
  const { resumeData, setResumeData, modal, setModal } = useResumeStore();
  const { setLoading, loading } = useAuthStore();
  const [isSignedUp, setIsSignedUp] = useState(true);

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
  } = useForm<authT>({ resolver: zodResolver(schema) });

  const sendData = async (data: authT) => {
    if (isSignedUp) {
      //Handle Sign in
      try {
        setLoading(true);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;
        setModal(false);
        console.log("user signed in " + user);
      } catch (err: any) {
        if (
          err.code === "auth/invalid-credential" ||
          err.code === "auth/user-not-found"
        ) {
          alert(`auth error ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    } else {
      //Handle Sign Up
      try {
        setLoading(true);
        const newUser = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        console.log("new user created " + newUser.user);
        setModal(false);
        const user = newUser.user;
        setModal(false);
        console.log("user signed in " + user);
      } catch (err: any) {
        if (
          err.code === "auth/invalid-credential" ||
          err.code === "auth/user-not-found"
        ) {
          alert(`auth error ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogContent className="dark:bg-[#080808] bg-slate-200 dark:text-white text-black border border-slate-700 rounded-xl p-6 sm:max-w-md w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isSignedUp ? "Sign In" : "Sign Up"}
          </DialogTitle>
          <DialogDescription className="dark:text-slate-400 text-slate-600 text-md">
            Welcome back! Please sign in to continue.
          </DialogDescription>
        </DialogHeader>
        {isSignedUp ? (
          // Handle Sign in
          <form onSubmit={handleSubmit(sendData)} className="grid gap-4 mt-4">
            <div className="flex flex-col text-left">
              <label htmlFor="email" className="mb-1 text-sm font-medium">
                Email
              </label>
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
            </div>
            <div className="flex flex-col text-left">
              <label htmlFor="password" className="mb-1 text-sm font-medium">
                Password
              </label>
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
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors mt-2"
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
            <div className="flex items-center justify-center gap-4">
              <div>
                <img
                  src="/images/google.png"
                  alt="Google icon"
                  height={25}
                  width={25}
                />
              </div>
              <button onClick={() => {}} className="text-slate-50">
                dont have an account?{" "}
                <span
                  onClick={() => {
                    setIsSignedUp((prev) => !prev);
                  }}
                  className="underline"
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
            <div className="flex flex-col text-left">
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
            <div className="flex flex-col text-left">
              <label htmlFor="email" className="mb-1 text-sm font-medium">
                Email
              </label>
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
            </div>
            <div className="flex flex-col text-left">
              <label htmlFor="password" className="mb-1 text-sm font-medium">
                Password
              </label>
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
            </div>
            <Button
              type="submit"
              text="Sign Up"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors mt-2"
            />
            <span className="text-center">or</span>
            <div className="flex items-center justify-center gap-4">
              <div>
                <img
                  src="/images/google.png"
                  alt="Google icon"
                  height={25}
                  width={25}
                />
              </div>
              <button className="text-slate-50">
                dont have an account?{" "}
                <span
                  onClick={() => {
                    setIsSignedUp((prev) => !prev);
                  }}
                  className="underline"
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
