import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="flex flex-col w-full items-center justify-center py-12 px-3 min-h-[80vh]">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-tight">Build Your Resume</h2>
        <p className="mt-2 text-lg">
          Fill in the details below to generate a professional resume.
        </p>
      </div>
      <h3 className="text-2xl font-bold mb-6 border-b">Personal Information</h3>
      <form
        action=""
        className="form dark:text-slate-300 text-black dark:bg-black/80 shadow-lg bg-slate-50 text-center p-8 rounded-xl shadow-slate-400/10 grid gap-4 sm:grid-cols-2 align-center border-2 border-slate-400/20"
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
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. JohnDoe@email.com"
          />
        </label>
        <label htmlFor="phone">
          Phone
          <input
            id="phone"
            name="phone"
            type="phone"
            placeholder="e.g. 555 555 555"
          />
        </label>
        <label htmlFor="social">
          LinkedIn
          <input
            id="social"
            name="social"
            type="text"
            placeholder="e.g. linkedIn.com/in/JohnDoe"
          />
        </label>
        <Link
          className="place-self-end sm:col-span-2 my-2 bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50"
          href="resume/skills"
        >
          <button>Next</button>
        </Link>
      </form>
    </section>
  );
};

export default page;
