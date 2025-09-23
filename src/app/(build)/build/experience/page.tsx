import Link from "next/link";
import React from "react";
import Button from "../../_Utils/Button";
import { FaPlus } from "react-icons/fa";

const page = () => {
  return (
    <section className="flex flex-col w-full items-center justify-center py-8 px-3 min-h-[80vh]">
      <Button path="/build/skills" />
      <div className="mb-12 text-center"></div>
      <h3 className="text-2xl font-bold mb-6 border-b">Work Experience</h3>
      <form
        action=""
        className="form dark:text-slate-300 text-black dark:bg-black/80 shadow-lg bg-slate-50 text-center p-8 rounded-xl shadow-slate-400/10 grid gap-4 sm:grid-cols-2 align-center border-2 border-slate-400/20"
      >
        <label htmlFor="title">
          Title
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Senior Project Manager"
            autoFocus
          />
        </label>
        <label htmlFor="company">
          Company
          <input
            id="company"
            name="company"
            type="text"
            placeholder="e.g. Tech Solution inc"
          />
        </label>
        <label htmlFor="startDate">
          Start Date
          <input
            className="input-date"
            id="startDate"
            name="startDate"
            type="date"
          />
        </label>
        <label htmlFor="endDate">
          End Date
          <input
            className="input-date"
            id="endDate"
            name="endDate"
            type="date"
          />
        </label>
        <label htmlFor="responsibilities" className="sm:col-span-2">
          Responsibilities
          <textarea
            className=" border-2 dark:border-slate-50/20 border-slate-300/40 w-full p-1"
            name="responsibilities"
            id=""
            cols={30}
            rows={5}
            placeholder="Describe your key responsibilities and achievement"
          ></textarea>
        </label>
        <div className="flex items-center justify-between sm:col-span-2 my-2">
          <button
            type="button"
            className="py-2 px-2 text-md text-slate-800 rounded-md dark:text-slate-200 transition-colors cursor-pointer shadow-md gap-1 flex items-center"
          >
            <FaPlus />
            Add another job
          </button>
          <Link
            className="bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50"
            href="/build/education"
          >
            <button>Next: Education</button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default page;
