"use client";
import Link from "next/link";
import React from "react";
import Button from "../../_Utils/Button";
import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResumeStore } from "@/app/store/resumeStore";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { resumeData, setResumeData } = useResumeStore();
  const schema = z.object({
    skills: z.preprocess(
      (val) =>
        typeof val === "string" ? val.split(",").map((s) => s.trim()) : val,
      z.array(
        z
          .string("Skills should'nt be a number")
          .min(2, "Skills should be at least 2 characters long")
      )
    ),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  type skillType = z.infer<typeof schema>;

  const sendData = (data: skillType) => {
    setResumeData(data);
    console.log(resumeData);
    router.push("/build/experience");
  };
  return (
    <section className="flex flex-col w-full items-center justify-center py-12 px-2">
      <Button type="button" path="/build" />
      <div className="mb-12 text-center"></div>
      <h3 className="text-2xl font-bold mb-6 border-b">Skills</h3>
      <form
        onSubmit={handleSubmit(sendData)}
        action=""
        className="form dark:text-slate-300 text-black dark:bg-black/80 shadow-lg bg-slate-50 text-center p-8 rounded-xl shadow-slate-400/10 grid gap-4 align-center border-2 border-slate-400/20 w-full max-w-xl"
      >
        <label htmlFor="skills">
          <span className="text-sm">
            Add your skills (e.g, Project Management, Python, JavaScript, React)
          </span>
          <input
            id="skills"
            type="text"
            placeholder="e.g. React, Figma"
            autoFocus
            {...register("skills")}
          />
          {errors.skills && (
            <span className="text-red-500 text-xs">
              {errors.skills.message}
            </span>
          )}
        </label>
        <div className="border-2 dark:border-slate-50/20 border-slate-300/40"></div>

        <Button
          type="submit"
          text="Next: Experience"
          className="place-self-end my-2 bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50"
        />
      </form>
    </section>
  );
};

export default page;
