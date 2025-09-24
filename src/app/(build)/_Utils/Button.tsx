"use client";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Button = ({ path }: { path: string }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(path);
      }}
      type="button"
      className="flex items-center gap-1 mt-2 dark:bg-black/50 rounded-md text-lg ml-2 cursor-pointer fixed top-16 left-0 p-1"
    >
      <FaChevronLeft />
      Back
    </button>
  );
};

export default Button;
