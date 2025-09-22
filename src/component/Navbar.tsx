import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <Link href="/">
        <h1 className="text-xl sm:text-2xl font-bold">ResumeCraft</h1>
      </Link>
      <nav className="hidden sm:flex">
        <ul className="list-none flex items-center gap-4 justify-between max-w-80">
          <Link
            className="text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-slate-500 dark:hover:text-white transition-colors"
            href="/templates"
          >
            <li>Template</li>
          </Link>
          <Link
            className="text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-slate-500 dark:hover:text-white transition-colors"
            href="/"
          >
            <li>Examples</li>
          </Link>
          <Link
            className="text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-slate-500 dark:hover:text-white transition-colors"
            href="/"
          >
            <li>Pricing</li>
          </Link>
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <Link href="/resume">
          <button
            type="button"
            className="py-2 px-2 text-md dark:hover:text-slate-300 bg-indigo-600/10 text-indigo-500 dark:text-slate-100 rounded-md font-semibold hover:bg-indigo-500/5 transition-colors focus:outline-none focus:ring-1 hover:ring-indigo-400 focus:ring-offset-2 cursor-pointer"
          >
            My Resume
          </button>
        </Link>
        <Image
          src="/user.png"
          alt="profile pic"
          width={20}
          height={20}
          className="size-9"
        />
      </div>
    </>
  );
};

export default Navbar;
