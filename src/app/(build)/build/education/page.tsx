"use client";
import React from "react";
import Button from "../../_Utils/Button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResumeStore } from "@/app/store/resumeStore";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const { setResumeData, resumeData } = useResumeStore();
  const [eduCount, setEduCount] = useState(0);
  const router = useRouter();
  const schema = z.object({
    institution: z
      .string("Invalid input")
      .min(5, "Institution should be at least 5 characters long"),
    degree: z.string("Invalid input"),
    startDate: z.string(),
    endDate: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  type edu = z.infer<typeof schema>;

  const sendData = (data: edu) => {
    setResumeData({ education: [...(resumeData.education || []), data] });
    setEduCount((prev) => prev + 1);
    reset();
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
            type="text"
            {...register("startDate")}
            placeholder="dd/mm/yy"
          />
          {errors.startDate && (
            <span className="text-xs text-red-500">
              {errors.startDate.message}
            </span>
          )}
        </label>
        <label htmlFor="endDate">
          End Date
          <input
            id="endDate"
            type="text"
            {...register("endDate")}
            placeholder="dd/mm/yy"
          />{" "}
          {errors.endDate && (
            <span className="text-xs text-red-500">
              {errors.endDate.message}
            </span>
          )}
        </label>
        <div className="flex items-center justify-between sm:col-span-2 my-2">
          <button
            type="submit"
            className="py-2 px-2 text-md text-slate-800 rounded-md dark:text-slate-200 transition-colors cursor-pointer shadow-md gap-1 flex items-center"
          >
            <FaPlus />
            Add
            <span>{eduCount > 0 || resumeData.education ? "more" : ""}</span>
          </button>

          <Button
            className="bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50 cursor-pointer"
            type="button"
            text="Next: Summary"
            path="/build/summary"
          />
        </div>
      </form>
    </section>
  );
};

export default page;
