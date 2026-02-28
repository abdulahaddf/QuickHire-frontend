import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/ToastProvider";

const pjs = Plus_Jakarta_Sans({
  variable: "--font-pjs",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickHire - Discover more than 5000+ Jobs",
  description: "Great platform for the job seeker that searching for new career heights and passionate about startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pjs.variable} antialiased selection:bg-blue-600 selection:text-white flex min-h-screen flex-col bg-[#FAFBFF] overflow-x-hidden`}>
        <Navbar />
        <div className="flex-1 w-full">
          {children}
        </div>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
