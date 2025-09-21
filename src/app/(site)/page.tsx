import HomeCards from "@/component/HomeCards";
import Link from "next/link";
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
            <Link href="/resume">
              <button className="mt-4 inline-block px-5 py-3 text-lg font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-transform transform hover:scale-105 cursor-pointer">
                Start building
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 sm:py-24 bg-slate-100 dark:bg-black">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Why Choose ResumeCraft?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Our resume builder is designed to make the process easy and
            efficient, helping you create a standout resume in no time.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:gap-4 md:grid-cols-3">
          <HomeCards />
        </div>
      </section>
    </>
  );
};

export default Home;
