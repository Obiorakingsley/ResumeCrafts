"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useResumeStore } from "@/store/resumeStore";
import { FaDollarSign, FaEllipsisV, FaUser } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";

const Navbar = () => {
  const path = usePathname();
  const text = path === "/" ? "My Resume" : "New Resume";
  const { resetResumeData } = useResumeStore();
  const [menu, setMenu] = useState(false);

  return (
    <>
      <Link href="/">
        <h1 className="text-xl sm:text-2xl font-bold">ResumeCraft</h1>
      </Link>
      <div className="flex items-center gap-2">
        <nav className="hidden sm:block">
          <ul className="list-none flex items-center gap-4 justify-between max-w-80">
            <Link
              className="text-md font-medium text-slate-600 dark:text-slate-300 hover:text-slate-500 dark:hover:text-white transition-colors"
              href="/templates"
            >
              <li>Template</li>
            </Link>
            <Link
              className="text-md font-medium text-slate-600 dark:text-slate-300 hover:text-slate-500 dark:hover:text-white transition-colors"
              href="/pricing"
            >
              <li>Pricing</li>
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
          className="size-9 hidden sm:block"
        />
        <div className="">
          <button
            onClick={() => {
              setMenu((prev) => !prev);
            }}
            className="cursor-pointer sm:hidden"
          >
            <span className="absolute opacity-0 left-80">menu</span>
            <FaEllipsisV size={20} />
          </button>
        </div>
        {menu && (
          <nav className="menu absolute rounded-b-md rounded-t-sm right-0 top-[70px] sm:hidden">
            <ul className="flex flex-col gap-2 px-2 pb-4 min-w-48 ">
              <li
                onClick={() => {
                  setMenu((prev) => !prev);
                }}
              >
                <Link className="flex items-center gap-0.5" href="/templates">
                  <FaFileLines />
                  Templates
                </Link>
              </li>
              <li
                onClick={() => {
                  setMenu((prev) => !prev);
                }}
              >
                <Link className="flex items-center gap-0.5" href="/pricing">
                  <FaDollarSign /> Pricing
                </Link>
              </li>
              <li
                onClick={() => {
                  setMenu((prev) => !prev);
                }}
              >
                <Link className="flex items-center gap-0.5" href="/profile">
                  <FaUser />
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default Navbar;
