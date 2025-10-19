"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useResumeStore } from "@/store/resumeStore";
import {
  FaDollarSign,
  FaEllipsisV,
  FaFile,
  FaSignInAlt,
  FaUser,
  FaWindowRestore,
} from "react-icons/fa";
import { FaFileCirclePlus, FaFileLines } from "react-icons/fa6";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/config/firebase";

const Navbar = () => {
  const { resetResumeData, setEditting } = useResumeStore();
  const [menu, setMenu] = useState(false);
  const { setModal } = useAuthStore();
  const router = useRouter();
  const path = usePathname();

  return (
    <>
      <Link href="/">
        <h1 className="text-xl sm:text-2xl font-bold">ResumeCrafts</h1>
      </Link>

      <div className="flex items-center gap-2">
        <nav className="hidden sm:block">
          <ul className="list-none flex items-center gap-4 justify-between max-w-80">
            <li
              onClick={() => {
                resetResumeData();
                setEditting(false);
                router.push("/build");
              }}
              className="text-md cursor-pointer font-medium text-slate-600 dark:text-slate-300 hover:text-slate-500 dark:hover:text-white transition-colors"
            >
              New Resume
            </li>

            <Link
              className="text-md font-medium text-slate-600 dark:text-slate-300 hover:text-slate-500 dark:hover:text-white transition-colors"
              href="/templates"
            >
              <li>Template</li>
            </Link>
            {path.startsWith("/build") && (
              <Link
                className="text-md font-medium text-slate-600 dark:text-slate-300 hover:text-slate-500 dark:hover:text-white transition-colors"
                href="/templates/modern"
              >
                <li>Preview</li>
              </Link>
            )}
            <Link
              className="text-md font-medium text-slate-600 dark:text-slate-300 hover:text-slate-500 dark:hover:text-white transition-colors"
              href="/pricing"
            >
              <li>Pricing</li>
            </Link>
            {!auth.currentUser && (
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
            router.push("/resume");
          }}
          type="button"
          className="py-1.5 px-1 text-md dark:hover:text-slate-300 bg-indigo-600/10 text-indigo-500 dark:text-slate-100 rounded-md font-semibold hover:bg-indigo-500/5 transition-colors focus:outline-none focus:ring-1 hover:ring-indigo-400 focus:ring-offset-2 cursor-pointer"
        >
          My Resume
        </button>
        {/* Profile icon */}
        <button
          onClick={() => {
            if (!auth.currentUser) {
              return setModal(true);
            } else {
              router.push("/profile");
            }
          }}
          className="hidden sm:block"
        >
          {
            <img
              src={
                auth.currentUser?.photoURL
                  ? auth.currentUser.photoURL.toString()
                  : "/images/user.png"
              }
              alt="profile pic"
              width={17}
              height={17}
              className="size-8 rounded-full cursor-pointer"
            />
          }
        </button>
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
        <nav className="menu absolute rounded-b-md rounded-t-sm right-0 top-[64px] sm:hidden min-h-[90vh] flex flex-col pb-2 justify-between">
          <ul className="flex flex-col gap-4 px-2 pb-4 min-w-48  ">
            {!auth.currentUser && (
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
            )}
            {path.startsWith("/build") && (
              <li
                onClick={() => {
                  setMenu((prev) => !prev);
                }}
              >
                <Link
                  className="flex items-center gap-0.5"
                  href="/templates/modern"
                >
                  <FaWindowRestore />
                  Preview
                </Link>
              </li>
            )}
            <li
              onClick={() => {
                resetResumeData();
                setMenu((prev) => !prev);
              }}
            >
              <Link className="flex items-center gap-0.5" href="/build">
                <FaFileCirclePlus />
                New Resume
              </Link>
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
              className="flex items-center gap-1.5"
              onClick={() => {
                setMenu((prev) => !prev);
                if (!auth.currentUser) {
                  return setModal(true);
                } else {
                  router.push("/profile");
                }
              }}
            >
              <FaUser />
              Profile
            </li>
          </ul>
          <button
            onClick={() => {
              router.push("/pricing");
              setMenu((prev) => !prev);
            }}
            className="py-1 text-indigo-500 dark:text-white flex justify-center items-center px-10 border-2 rounded-full text-sm cursor-pointer border-indigo-500 mx-auto"
          >
            Upgrade
          </button>
        </nav>
      )}
    </>
  );
};

export default Navbar;
