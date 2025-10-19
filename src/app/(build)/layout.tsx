import type { Metadata } from "next";
import "../globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Build Your Resume - Resume Crafts",
  description:
    "Craft your personalized, ATS-friendly resume in real time. Edit sections, preview changes instantly, and download your final design with Resume Crafts.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Build Your Resume | Resume Crafts",
    description:
      "Use Resume Crafts' AI-powered builder to create your resume with live previews and ATS-ready formatting.",
    url: "https://resumecrafts.vercel.app/build",
    siteName: "Resume Crafts",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resume Crafts Builder Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your Resume | Resume Crafts",
    description:
      "Edit, preview, and download your professional resume in real time — powered by Resume Crafts.",
    images: ["/og-build.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" min-h-screen">
        <ClientLayout> {children} </ClientLayout>
      </body>
    </html>
  );
}
