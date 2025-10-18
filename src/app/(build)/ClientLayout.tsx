// app/ClientLayout.tsx
"use client";
import Navbar from "@/component/Navbar";
import Login from "@/component/SignIn";
import ToastProvider from "@/component/Toast-theme";

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
      <main className=" min-h-[80vh]">
        {children}
        <ToastProvider />

        <Login />
      </main>
    </>
  );
}
