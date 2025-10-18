import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
            href="/terms-and-conditions"
          >
            Terms and Conditions
          </Link>
        </nav>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} ResumeCraft. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
