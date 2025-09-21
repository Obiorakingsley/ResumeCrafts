import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="flex flex-col w-full items-center justify-center py-12 px-2">
      <div className="mb-12 text-center"></div>
      <h3 className="text-2xl font-bold mb-6 border-b">Skills</h3>
      <form
        action=""
        className="form dark:text-slate-300 text-black dark:bg-black/80 shadow-lg bg-slate-50 text-center p-8 rounded-xl shadow-slate-400/10 grid gap-4 align-center border-2 border-slate-400/20 w-full max-w-xl"
      >
        <label htmlFor="fullName">
          Full Name
          <input
            id="fullName"
            name="fullname"
            type="text"
            placeholder="e.g. John Doe"
          />
        </label>
        <div className="border-2 border-slate-50/50"></div>

        <Link
          className="place-self-end my-2 bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50"
          href="resume/skills"
        >
          <button>Next</button>
        </Link>
      </form>
    </section>
  );
};

export default page;
