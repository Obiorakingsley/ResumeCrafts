import type { Metadata } from "next";
import "../globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Resume Crafts | Build ATS-Friendly Resumes with Real-Time Preview",
  description:
    "Resume Crafts helps job seekers, students, and professionals create polished, ATS-ready resumes with real-time previews. Customize stunning templates and export instantly.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  keywords: [
    "AI resume builder",
    "resume maker",
    "ATS resume generator",
    "resume templates",
    "create resume online",
    "free CV builder",
  ],
  openGraph: {
    title: "Resume Crafts | Build ATS-Friendly Resumes with Real-Time Preview",
    description:
      "Build your professional resume with Resume Crafts — an AI-powered tool that creates ATS-friendly, modern resumes in real time.",
    url: "https://resumecrafts.vercel.app", // update to your actual domain
    siteName: "Resume Crafts",
    images: [
      {
        url: "/og-image.png", // place this image in your /public folder
        width: 1200,
        height: 630,
        alt: "Resume Crafts App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Crafts | AI-Powered Resume Builder",
    description:
      "Design and preview beautiful, ATS-friendly resumes with Resume Crafts — built for job seekers, students, and professionals.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" min-h-screen relative">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
