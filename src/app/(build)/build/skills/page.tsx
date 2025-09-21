import Link from "next/link";
import React from "react";
import Button from "../../_Utils/Button";

const page = () => {
  return (
    <section className="flex flex-col w-full items-center justify-center py-12 px-2">
      <Button path="/build" />
      <div className="mb-12 text-center"></div>
      <h3 className="text-2xl font-bold mb-6 border-b">Skills</h3>
      <form
        action=""
        className="form dark:text-slate-300 text-black dark:bg-black/80 shadow-lg bg-slate-50 text-center p-8 rounded-xl shadow-slate-400/10 grid gap-4 align-center border-2 border-slate-400/20 w-full max-w-xl"
      >
        <label htmlFor="skills">
          <span className="text-sm">
            Add your skills (e.g, Project Management, Python, JavaScript, React)
          </span>
          <input
            id="skills"
            name="skills"
            type="text"
            placeholder="e.g. React, Figma"
          />
        </label>
        <div className="border-2 dark:border-slate-50/20 border-slate-300/40"></div>

        <Link
          className="place-self-end my-2 bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50"
          href="/build/experience"
        >
          <button>Next: Experience</button>
        </Link>
      </form>
    </section>
  );
};

export default page;
