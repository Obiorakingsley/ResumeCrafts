import React from "react";

const page = () => {
  return (
    <section className="flex flex-col w-full items-center justify-center py-12">
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
        <label htmlFor="name">
          Full Name
          <input
            id="name"
            name="fullname"
            type="text"
            placeholder="e.g. John Doe"
          />
        </label>
        <label htmlFor="name">
          Email
          <input id="name" name="fullname" type="email" />
        </label>
        <label htmlFor="name">
          Phone
          <input id="name" name="fullname" type="phone" />
        </label>
        <label htmlFor="name">
          LinkedIn
          <input id="name" name="fullname" type="text" />
        </label>
      </form>
    </section>
  );
};

export default page;
