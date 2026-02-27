import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
      <body className={`${pjs.variable} antialiased selection:bg-primary selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
