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
import { useRouter } from "next/navigation";

export default function ExampleModal() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const { resumeData, setResumeData } = useResumeStore();

  const schema = z.object({
    Name: z.string().min(4, "Full name must be at least 4 characters long"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    message: z.string().optional(),
  });

  type contactUs = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<contactUs>({ resolver: zodResolver(schema) });

  const sendData = (data: contactUs) => {
    console.log("Form submitted:", data);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Open Modal
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dark:bg-[#0f0f0f] bg-slate-200 dark:text-white text-black border border-slate-700 rounded-xl p-6 sm:max-w-md w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Sign In</DialogTitle>
            <DialogDescription className="dark:text-slate-400 text-slate-600 text-md">
              Welcome back! Please sign in to continue.
            </DialogDescription>
          </DialogHeader>

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
              text="Sign In"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors mt-2"
            />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
