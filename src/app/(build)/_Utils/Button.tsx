"use client";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Button = ({
  path,
  text,
  className,
  type,
}: {
  path?: string;
  text?: string;
  className?: string;
  type: string;
}) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (path === undefined) return;
        router.push(path);
      }}
      type={type === undefined ? "button" : "submit"}
      className={`${
        !className
          ? "flex items-center gap-1 mt-2 dark:bg-black/50 rounded-md text-lg ml-2 cursor-pointer fixed top-16 left-0 p-1"
          : className
      }`}
    >
      {text ? (
        text
      ) : (
        <>
          <FaChevronLeft />
          Back
        </>
      )}
    </button>
  );
};

export default Button;
