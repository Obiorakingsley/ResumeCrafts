"use client";
import React from "react";

const Loading = ({ width, height }: { width: number; height: number }) => {
  return (
    <div className={`relative m-auto w-${width} h-${height}`}>
      <span className="border-2 border-t-transparent dark:border-white border-indigo-600 absolute p-2 rounded-full animate-spin inset-0 m-auto"></span>
    </div>
  );
};

export default Loading;
