import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            href="#"
          >
            Contact
          </Link>
          <Link
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            href="#"
          >
            Terms of Service
          </Link>
        </nav>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          &copy; 2025 ResumeCraft. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
