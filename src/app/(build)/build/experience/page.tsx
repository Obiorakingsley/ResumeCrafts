"use client";
import Link from "next/link";
import React from "react";
import Button from "../../_Utils/Button";
import { FaPlus } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const page = () => {
  const schema = z.object({
    title: z.string().min(2, "Title should be at least 2 characters long"),
    company: z.string().min(2, "Company should be at least 2 characters long"),
    startDate: z.date(),
    endDate: z.date(),

    role: z
      .string("Role should be at least 10 characters long")
      .min(10, "Role should be at least 10 characters long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  type experience = z.infer<typeof schema>;

  const sendData = (data: experience) => {
    console.log(data);
  };
  return (
    <section className="flex flex-col w-full items-center justify-center py-8 px-3 min-h-[80vh]">
      <Button path="/build/skills" />
      <div className="mb-12 text-center"></div>
      <h3 className="text-2xl font-bold mb-6 border-b">Work Experience</h3>
      <form
        onSubmit={handleSubmit(sendData)}
        className="form dark:text-slate-300 text-black dark:bg-black/80 shadow-lg bg-slate-50 text-center p-8 rounded-xl shadow-slate-400/10 grid gap-4 sm:grid-cols-2 align-center border-2 border-slate-400/20"
      >
        <label htmlFor="title">
          Title
          <input
            id="title"
            type="text"
            placeholder="e.g. Senior Project Manager"
            autoFocus
            {...register("title")}
          />
          {errors.title && (
            <span className="text-xs text-red-500">{errors.title.message}</span>
          )}
        </label>
        <label htmlFor="company">
          Company
          <input
            id="company"
            type="text"
            placeholder="e.g. Tech Solution inc"
            {...register("company")}
          />
          {errors.company && (
            <span className="text-xs text-red-500">
              {errors.company.message}
            </span>
          )}
        </label>
        <label htmlFor="startDate">
          Start Date
          <input
            className="input-date"
            id="startDate"
            type="date"
            {...register("startDate", { valueAsDate: true })}
            required
          />
        </label>
        <label htmlFor="endDate">
          End Date
          <input
            className="input-date"
            id="endDate"
            type="date"
            {...register("endDate", { valueAsDate: true })}
            required
          />
        </label>
        <label htmlFor="roles" className="sm:col-span-2">
          Role
          <textarea
            className=" border-2 dark:border-slate-50/20 border-slate-300/40 w-full p-1"
            id="roles"
            cols={30}
            rows={5}
            placeholder="Describe your key role and achievements"
            {...register("role")}
          ></textarea>
          {errors.role && (
            <span className="text-xs text-red-500">{errors.role.message}</span>
          )}
        </label>
        <div className="flex items-center justify-between sm:col-span-2 my-2">
          <button
            type="button"
            className="py-2 px-2 text-md text-slate-800 rounded-md dark:text-slate-200 transition-colors cursor-pointer shadow-md gap-1 flex items-center"
          >
            <FaPlus />
            Add another job
          </button>

          <button className="bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50">
            Next: Education
          </button>
        </div>
      </form>
    </section>
  );
};

export default page;
