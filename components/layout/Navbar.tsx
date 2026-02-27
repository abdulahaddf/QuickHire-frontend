"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6 px-6 lg:px-20 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-2">
          {/* We assume logo.svg is in public folder */}
          <div className="relative w-8 h-8">
            <Image src="/logo.svg" alt="QuickHire Logo" fill className="object-contain" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">QuickHire</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600 text-[15px]">
          <Link href="/jobs" className="hover:text-primary transition-colors">
            Find Jobs
          </Link>
          <Link href="/people" className="hover:text-primary transition-colors">
            People
          </Link>
          <Link href="/resume" className="hover:text-primary transition-colors">
            Resume Builder
          </Link>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <Link href="/login">
          <Button variant="ghost" className="hidden sm:inline-flex px-4 px-2 text-primary font-bold">
            Login
          </Button>
        </Link>
        <span className="hidden sm:block w-[1px] h-6 bg-gray-200"></span>
        <Link href="/signup">
          <Button variant="primary" className="rounded-sm bg-[#4F46E5] hover:bg-[#4338CA] px-6">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
}
