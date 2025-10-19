// app/ClientLayout.tsx
"use client";

import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
import Login from "@/component/SignIn";
import Theme from "@/component/Toast-theme";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="dark:text-white bg-slate-50 dark:bg-black text-black py-4 px-2 flex items-center justify-between sticky top-0 z-20">
        <Navbar />
      </header>

      <main className="pb-30 sm:pb-24 min-h-[90vh]">
        {children}
        <Theme />
        <Login />
      </main>

      <footer className="bg-white dark:bg-black/50 border-t border-slate-200 dark:border-slate-800 absolute bottom-0 w-full">
        <Footer />
      </footer>
    </>
  );
}
