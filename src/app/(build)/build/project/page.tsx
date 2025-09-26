"use client";
import React from "react";
import Button from "../../_Utils/Button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResumeStore } from "@/app/store/resumeStore";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

const page = () => {
  const { setResumeData, resumeData } = useResumeStore();
  const [project, setProject] = useState(0);
  const schema = z.object({
    projectName: z
      .string()
      .min(5, "project name should be at least 5 characters long"),
    url: z.url().optional(),
    description: z
      .string()
      .min(10, "project description should be at least 10 characters long")
      .max(50),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  type edu = z.infer<typeof schema>;

  const sendData = (data: edu) => {
    setResumeData({ projects: [...(resumeData.projects || []), data] });
    setProject((prev) => prev + 1);
    console.log(resumeData);
    reset();
  };
  return (
    <section className="flex flex-col w-full items-center justify-center py-12 px-3 min-h-[70vh]">
      <Button type="button" path="/build/experience" />
      <div className="mb-12 text-center"></div>
      <h3 className="text-2xl font-bold mb-6 border-b">Project</h3>
      <form
        onSubmit={handleSubmit(sendData)}
        className="form dark:text-slate-300 text-black dark:bg-black/80 shadow-lg bg-slate-50 text-center p-8 rounded-xl shadow-slate-400/10 grid gap-4 sm:grid-cols-2 align-center border-2 border-slate-400/20"
      >
        <label htmlFor="project">
          Project Name
          <input
            id="project"
            type="text"
            placeholder="e.g. Ecommerce Project"
            autoFocus
            {...register("projectName")}
          />
          {errors.projectName && (
            <span className="text-xs text-red-500">
              {errors.projectName.message}
            </span>
          )}
        </label>
        <label htmlFor="url">
          <p>
            URL <span className="text-xs">(optional)</span>
          </p>
          <input
            id="url"
            type="text"
            placeholder="e.g. https://project.com"
            {...register("url")}
          />
          {errors.url && (
            <span className="text-xs text-red-500">{errors.url.message}</span>
          )}
        </label>
        <label htmlFor="description" className="sm:col-span-2">
          Description
          <textarea
            className=" border-2 dark:border-slate-50/20 border-slate-300/40 w-full p-1"
            id="description"
            cols={30}
            rows={5}
            placeholder="Project description"
            {...register("description")}
          ></textarea>
          {errors.description && (
            <span className="text-xs text-red-500">
              {errors.description.message}
            </span>
          )}
        </label>

        <div className="flex items-center justify-between sm:col-span-2 my-2">
          <button
            type="submit"
            onClick={() => {
              console.log(resumeData);
            }}
            className="py-2 px-2 text-md text-slate-800 rounded-md dark:text-slate-200 transition-colors cursor-pointer shadow-md gap-1 flex items-center"
          >
            <FaPlus />
            Add
            <span>{project > 0 || resumeData.projects ? "more" : ""}</span>
          </button>

          <Button
            className="bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50"
            type="submit"
            path="/templates"
            text="Choose Template"
          />
        </div>
      </form>
    </section>
  );
};

export default page;
