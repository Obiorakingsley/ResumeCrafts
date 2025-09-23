import Link from "next/link";
import React from "react";
import Button from "../../_Utils/Button";
import { FaPlus } from "react-icons/fa";

const page = () => {
  return (
    <section className="flex flex-col w-full items-center justify-center py-8 px-3 min-h-[80vh]">
      <Button path="/build/education" />
      <div className="mb-12 text-center"></div>
      <h3 className="text-2xl font-bold mb-6 border-b">Summary</h3>
      <form
        action=""
        className="form dark:text-slate-300 text-black dark:bg-black/80 shadow-lg bg-slate-50 text-center p-8 rounded-xl shadow-slate-400/10 grid gap-4 sm:grid-cols-2 align-center border-2 border-slate-400/20 relative"
      >
        <label htmlFor="responsibilities" className="sm:col-span-2 ">
          Professional Summary
          <textarea
            className=" border-2 dark:border-slate-50/20 border-slate-300/40 w-full p-1"
            name="responsibilities"
            id=""
            cols={50}
            rows={7}
            placeholder="Your generated summary will appear here"
          ></textarea>
        </label>
        <div className="flex items-start justify-between sm:col-span-2 my-2">
          <div className="flex gap-2 flex-wrap max-w-40">
            <span>Add more sections</span>
            <button
              type="button"
              className="text-sm flex items-center gap-1 p-1 rounded-full shadow-md"
            >
              <FaPlus /> Projects
            </button>
            <button
              type="button"
              className="text-sm flex items-center gap-1 p-1 rounded-full shadow-md"
            >
              <FaPlus /> Website
            </button>
          </div>
          <Link
            className="bg-indigo-500 transition-colors hover:bg-indigo-600 p-2 sm:px-3 rounded-md text-slate-50 text-sm"
            href="/templates"
          >
            <button>Choose Template</button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default page;
