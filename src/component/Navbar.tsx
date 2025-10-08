"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useResumeStore } from "@/store/resumeStore";
import { FaDollarSign, FaEllipsisV, FaSignInAlt, FaUser } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const path = usePathname();
  const text = path === "/" ? "My Resume" : "New Resume";
  const { resetResumeData, setModal } = useResumeStore();
  const [menu, setMenu] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();

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
            {!user && (
              <button
                onClick={() => {
                  setModal(true);
                }}
                className="text-md font-medium text-slate-600 dark:text-slate-300 hover:text-slate-500 dark:hover:text-white transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}
          </ul>
        </nav>

        <button
          onClick={() => {
            resetResumeData();
            router.push(path === "/" ? "/resume" : "/build");
          }}
          type="button"
          className="py-1.5 px-1 text-sm dark:hover:text-slate-300 bg-indigo-600/10 text-indigo-500 dark:text-slate-100 rounded-md font-semibold hover:bg-indigo-500/5 transition-colors focus:outline-none focus:ring-1 hover:ring-indigo-400 focus:ring-offset-2 cursor-pointer"
        >
          {text}
        </button>

        <Link className="hidden sm:block" href="/profile">
          {user?.photoURL ? (
            <img
              src={user.photoURL.toString()}
              alt="profile pic"
              width={17}
              height={17}
              className="size-8 rounded-full"
            />
          ) : (
            <FaUser size={20} />
          )}
        </Link>
        <div>
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

        {/* Mobile navigation */}
      </div>
      {menu && (
        <nav className="menu absolute rounded-b-md rounded-t-sm right-0 top-[64px] sm:hidden">
          <ul className="flex flex-col gap-2 px-2 pb-4 min-w-48 ">
            <li
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                setMenu((prev) => !prev);
                setModal(true);
              }}
            >
              <FaSignInAlt />
              Sign In
            </li>
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
    </>
  );
};

export default Navbar;
