"use client";
import React from "react";
import Button from "../../_Utils/Button";
import { FaPlus } from "react-icons/fa";
import { object, string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResumeStore } from "@/store/resumeStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const page = () => {
  const { resumeData, setResumeData, editting } = useResumeStore();
  const [exp, setExp] = useState(0);
  const router = useRouter();

  //Experience zod schema
  const schema = z.object({
    title: z.string().min(2, "Title should be at least 2 characters long"),
    company: z.string().min(2, "Company should be at least 2 characters long"),

    start: z.string(),
    end: z.string(),

    details: z.preprocess(
      (val) =>
        typeof val === "string" ? val.split(",").map((w) => w.trim()) : val,
      z.array(string().min(10, "Role should be at least 10 characters long"))
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  type experience = z.infer<typeof schema>;

  //Add Experience details to state
  const sendData = (data: experience) => {
    setResumeData({
      experience: [...(resumeData.experience || []), data],
    });
    setExp((prev) => prev + 1);
    reset();
  };
  return (
    <section className="flex flex-col w-full items-center justify-center py-8 px-3 min-h-[80vh]">
      <Button type="button" path="/build/skills" />
      <div className="mb-12 text-center"></div>
      <h3 className="text-2xl font-bold mb-6 border-b">Work Experience</h3>
      <form
        onSubmit={handleSubmit(sendData)}
        className="form dark:text-slate-300 text-black dark:bg-black/80 shadow-lg bg-slate-50 text-center p-8 rounded-xl shadow-slate-400/10 grid gap-4 sm:grid-cols-2 align-center border-2 border-slate-400/20"
      >
        <label htmlFor="title">
          Title
          <input
            defaultValue={
              editting
                ? resumeData?.experience?.length
                  ? resumeData.experience[0]?.title
                  : ""
                : ""
            }
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
            defaultValue={
              editting
                ? resumeData?.experience
                  ? resumeData.experience[0]?.company
                  : ""
                : ""
            }
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

        <label htmlFor="start">
          Start Date
          <input
            defaultValue={
              editting
                ? resumeData?.experience
                  ? resumeData.experience[0]?.start
                  : ""
                : ""
            }
            className="input-date"
            id="start"
            type="text"
            {...register("start")}
            placeholder="dd/mm/yy"
          />
          {errors.start && (
            <span className="text-xs text-red-500">{errors.start.message}</span>
          )}
        </label>

        <label htmlFor="end">
          End Date
          <input
            defaultValue={
              editting
                ? resumeData?.experience
                  ? resumeData.experience[0]?.end
                  : ""
                : ""
            }
            className="input-date"
            id="end"
            type="text"
            {...register("end")}
            placeholder="dd/mm/yy"
          />
          {errors.end && (
            <span className="text-xs text-red-500">{errors.end.message}</span>
          )}
        </label>

        <label htmlFor="roles" className="sm:col-span-2">
          Role/Achievements
          <textarea
            defaultValue={
              editting
                ? resumeData?.experience
                  ? resumeData.experience[0]?.details
                  : ""
                : ""
            }
            className=" border-2 dark:border-slate-50/20 border-slate-300/40 w-full p-1 placeholder:text-sm"
            id="roles"
            cols={30}
            rows={5}
            placeholder="Describe your key role and achievements"
            {...register("details")}
          ></textarea>
          {errors.details && (
            <span className="text-xs text-red-500">
              {errors.details.message}
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
            <span>
              {exp > 0 || resumeData.experience?.length ? "more" : ""}
            </span>
          </button>

          {/* Custom Button */}
          <Button
            className="bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50"
            type="submit"
            text="Next: Education"
            path="/build/education"
          />
        </div>
      </form>
    </section>
  );
};

export default page;
