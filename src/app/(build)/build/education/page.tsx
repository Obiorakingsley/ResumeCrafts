import Link from "next/link";
import React from "react";
import Button from "../../_Utils/Button";

const page = () => {
  return (
    <section className="flex flex-col w-full items-center justify-center py-12 px-3 min-h-[70vh]">
      <Button path="/build/experience" />
      <div className="mb-12 text-center"></div>
      <h3 className="text-2xl font-bold mb-6 border-b">Education</h3>
      <form
        action=""
        className="form dark:text-slate-300 text-black dark:bg-black/80 shadow-lg bg-slate-50 text-center p-8 rounded-xl shadow-slate-400/10 grid gap-4 sm:grid-cols-2 align-center border-2 border-slate-400/20"
      >
        <label htmlFor="institution">
          Institution
          <input
            id="institution"
            name="institution"
            type="text"
            placeholder="e.g. University of Californai, Berkely"
          />
        </label>
        <label htmlFor="Degree">
          Degree
          <input
            id="Degree"
            name="Degree"
            type="text"
            placeholder="e.g. Master of Business Administration"
          />
        </label>
        <label htmlFor="startDate">
          Start Date
          <input id="startDate" name="startDate" type="date" />
        </label>
        <label htmlFor="endDate">
          End Date
          <input id="endDate" name="endDate" type="date" />
        </label>

        <Link
          className="place-self-end sm:col-span-2 my-2 bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50"
          href="/build/summary"
        >
          <button>Next: Summary</button>
        </Link>
      </form>
    </section>
  );
};

export default page;
