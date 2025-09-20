import React from "react";

const HomeCards = () => {
  return (
    <>
      <div className="bg-white dark:bg-black/50 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center justify-center p-4 py-8">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-400/10 text-indigo-400">
            <svg
              fill="currentColor"
              height="28px"
              viewBox="0 0 256 256"
              width="28px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
            </svg>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Professional Templates
          </h3>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Choose from a variety of professionally designed templates to match
            your industry and experience level.
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-black/50 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center justify-center p-4 py-8">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-400/10 text-indigo-400">
            <svg
              fill="currentColor"
              height="28px"
              viewBox="0 0 256 256"
              width="28px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
            </svg>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            AI Powered Content
          </h3>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Let our AI suggest improvements and tailor your resume content to
            specific job descriptions.
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-black/50 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center justify-center p-4 py-8">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-400/10 text-indigo-400">
            <svg
              fill="currentColor"
              height="28px"
              viewBox="0 0 256 256"
              width="28px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z"></path>
            </svg>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Fast &amp; Easy
          </h3>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Create a polished resume in minutes with our intuitive and
            user-friendly interface.
          </p>
        </div>
      </div>
    </>
  );
};

export default HomeCards;
