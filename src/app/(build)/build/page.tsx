"use client";
import Link from "next/link";
import React from "react";
import Button from "../_Utils/Button";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const page = () => {
  const schema = z.object({
    fullName: z
      .string()
      .min(4, "Full name must be at least 4 characters long")
      .max(60)
      .regex(
        /^[a-zA-Z]+(?: [a-zA-Z]+)+$/,
        "Please enter your first name and last name"
      ),
    email: z.string(),
    phone: z.string().regex(/^\d{11,15}$/, "Please enter a valid phone number"),
    linkedIn: z.string(),
  });

  type personalForm = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const sendData = (data: personalForm) => {
    console.log(data);
  };
  return (
    <section className="flex flex-col w-full items-center justify-center py-12 px-3 min-h-[80vh]">
      <Button path="/" />
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-tight">Build Your Resume</h2>
        <p className="mt-2 text-lg">
          Fill in the details below to generate a professional resume.
        </p>
      </div>
      <h3 className="text-2xl font-bold mb-6 border-b">Personal Information</h3>
      <form
        onSubmit={handleSubmit(sendData)}
        className="form dark:text-slate-300 text-black dark:bg-black/80 shadow-lg bg-slate-50 text-center p-8 rounded-xl shadow-slate-400/10 grid gap-4 sm:grid-cols-2 align-center border-2 border-slate-400/20"
      >
        <label htmlFor="fullName">
          Full Name
          <input
            id="fullName"
            type="text"
            placeholder="e.g. John Doe"
            autoFocus
            {...register("fullName")}
          />
          {errors.fullName && (
            <span className="text-red-500 text-xs">
              {errors.fullName.message}
            </span>
          )}
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            placeholder="e.g. JohnDoe@email.com"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </label>
        <label htmlFor="phone">
          Phone
          <input
            id="phone"
            type="phone"
            placeholder="e.g. 555 555 555"
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-red-500 text-xs">{errors.phone.message}</span>
          )}
        </label>
        <label htmlFor="social">
          LinkedIn
          <input
            id="social"
            type="url"
            placeholder="e.g. linkedIn.com/in/JohnDoe"
            {...register("linkedIn")}
          />
          {errors.linkedIn && (
            <span className="text-xs text-red-500">
              {errors.linkedIn.message}
            </span>
          )}
        </label>

        <button
          type="submit"
          className="place-self-end sm:col-span-2 my-2 bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50"
        >
          Next: Skills
        </button>
      </form>
    </section>
  );
};

export default page;
