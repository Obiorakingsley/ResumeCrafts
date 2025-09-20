import React from "react";

const Home = () => {
  return (
    <>
      <section className="hero-bg bg-center">
        <div className="bg-black/45 h-full grid place-content-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight">
              Craft a Resume That Gets You Hired
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-200">
              Our Ai powerd resume builder helps you create a professional
              resume in minutes. Stand out from the competition and land your
              dream job
            </p>
            <button className="mt-4 inline-block px-5 py-3 text-lg font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-transform transform hover:scale-105">
              Start building
            </button>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 sm:py-24">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Why Choose ResumeCraft?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Our resume builder is designed to make the process easy and
            efficient, helping you create a standout resume in no time.
          </p>
        </div>
        <div className="mt-16">
          <div className="p-8 bg-white dark:bg-black/50 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
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
                Let our AI suggest improvements and tailor your resume content
                to specific job descriptions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
