"use client";
import Link from "next/link";
import React from "react";
import Button from "../../_Utils/Button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const page = () => {
  const schema = z.object({
    institution: z
      .string("Invalid input")
      .min(5, "Institution should be at least 5 characters long"),
    degree: z
      .string("Invalid input")
      .min(5, "Degree should be at least 5 characters long"),
    startDate: z.date(),
    endDate: z.date(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  type edu = z.infer<typeof schema>;

  const sendData = (data: edu) => {
    console.log(data);
  };
  return (
    <section className="flex flex-col w-full items-center justify-center py-12 px-3 min-h-[70vh]">
      <Button type="button" path="/build/experience" />
      <div className="mb-12 text-center"></div>
      <h3 className="text-2xl font-bold mb-6 border-b">Education</h3>
      <form
        onSubmit={handleSubmit(sendData)}
        className="form dark:text-slate-300 text-black dark:bg-black/80 shadow-lg bg-slate-50 text-center p-8 rounded-xl shadow-slate-400/10 grid gap-4 sm:grid-cols-2 align-center border-2 border-slate-400/20"
      >
        <label htmlFor="institution">
          Institution
          <input
            id="institution"
            type="text"
            placeholder="e.g. University of Californai, Berkely"
            autoFocus
            {...register("institution")}
          />
          {errors.institution && (
            <span className="text-xs text-red-500">
              {errors.institution.message}
            </span>
          )}
        </label>
        <label htmlFor="Degree">
          Degree
          <input
            id="Degree"
            type="text"
            placeholder="e.g. Master of Business Administration"
            {...register("degree")}
          />
          {errors.degree && (
            <span className="text-xs text-red-500">
              {errors.degree.message}
            </span>
          )}
        </label>
        <label htmlFor="startDate">
          Start Date
          <input
            id="startDate"
            type="date"
            {...register("startDate", { valueAsDate: true })}
          />
        </label>
        <label htmlFor="endDate">
          End Date
          <input
            id="endDate"
            type="date"
            {...register("endDate", { valueAsDate: true })}
          />
        </label>

        <Button
          type="submit"
          text="Next: Summary"
          className="place-self-end sm:col-span-2 my-2 bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50"
        />
      </form>
    </section>
  );
};

export default page;
