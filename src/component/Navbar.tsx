"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useResumeStore } from "@/store/resumeStore";

const Navbar = () => {
  const path = usePathname();
  const text = path === "/" ? "My Resume" : "New Resume";
  const { resetResumeData } = useResumeStore();

  return (
    <>
      <Link href="/">
        <h1 className="text-xl sm:text-2xl font-bold">ResumeCraft</h1>
      </Link>
      <div className="flex items-center gap-2">
        <nav>
          <ul className="list-none flex items-center gap-4 justify-between max-w-80">
            <Link
              className="text-md font-medium text-slate-600 dark:text-slate-300 hover:text-slate-500 dark:hover:text-white transition-colors"
              href="/templates"
            >
              <li>Template</li>
            </Link>

            <Link
              className="text-md font-medium text-slate-600 dark:text-slate-300 hover:text-slate-500 dark:hover:text-white transition-colors"
              href="/"
            >
              <li>Pricing</li>
            </Link>
            <Link
              className="text-md font-medium text-slate-600 dark:text-slate-300 hover:text-slate-500 dark:hover:text-white transition-colors"
              href="/templates/modern"
            >
              <li>Preview</li>
            </Link>
          </ul>
        </nav>

        <Link href={path === "/" ? "/resume" : "/build"}>
          <button
            onClick={() => {
              resetResumeData();
            }}
            type="button"
            className="py-2 px-2 text-md dark:hover:text-slate-300 bg-indigo-600/10 text-indigo-500 dark:text-slate-100 rounded-md font-semibold hover:bg-indigo-500/5 transition-colors focus:outline-none focus:ring-1 hover:ring-indigo-400 focus:ring-offset-2 cursor-pointer"
          >
            {text}
          </button>
        </Link>
        <Image
          src="/images/user.png"
          alt="profile pic"
          width={20}
          height={20}
          className="size-9 hidden sm:flex"
        />
      </div>
    </>
  );
};

export default Navbar;
