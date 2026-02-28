"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("search", keyword.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="relative w-full pt-12 md:pt-20 lg:pt-24 bg-[#FAFBFF] overflow-hidden">
       {/* Background Pattern */}
         <div className="absolute -top-3 right-30 w-[55%] h-[165%] z-[1] hidden md:block">
           <Image src="/Header/Pattern.svg" alt="Background Pattern" fill className="object-contain object-right-top" priority />
         </div>
      <div className="mx-auto max-w-11/12 px-4 sm:px-6 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 relative gap-12 lg:gap-0">
          
          {/* Left Content */}
          <div className="flex min-w-0 flex-col gap-8 relative z-30 pt-4">
            <h1 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[5rem] font-bold leading-[1.05] text-gray-900 tracking-tight">
              Discover <br />
              more than <br />
              <span className="text-[#00A3FF] relative inline-block z-10 w-max">
                5000+ Jobs
                {/* SVG Underline */}
                <div className="absolute top-[90%] left-[-2%] w-[104%] -z-10 flex justify-center pointer-events-none">
                  <Image src="/Header/verticleLine.svg" alt="Underline" width={455} height={40} className="w-full h-auto" />
                </div>
              </span>
            </h1>
            
            <p className="text-gray-500 text-lg md:text-xl max-w-lg leading-relaxed font-medium mt-2">
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>

            {/* Search Bar Box */}
            <form onSubmit={handleSearch} className="w-full lg:w-[950px] h-[100px] bg-white p-3 shadow-[0px_15px_50px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-stretch md:items-center gap-2 mt-4 border border-gray-100/50 relative z-50 rounded-sm">
              
              <div className="flex min-w-0 items-center gap-3 px-4 flex-1 h-14">
                <Image src="/Header/Search.svg" alt="Search Icon" width={22} height={22} className="opacity-80" />
                <input 
                  type="text" 
                  placeholder="Job title or keyword" 
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full text-base text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
                  aria-label="Job title or keyword"
                />
              </div>

              <div className="hidden md:block w-[1px] h-10 bg-gray-200" />

              <div className="flex min-w-0 items-center gap-3 px-4 flex-1 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 h-14">
                <Image src="/Header/Location.svg" alt="Location Icon" width={22} height={22} className="opacity-80" />
                <div className="flex flex-1 items-center justify-between gap-2 overflow-hidden">
                  <input 
                    type="text" 
                    placeholder="Florence, Italy" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-base text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent truncate"
                    aria-label="Location"
                  />
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 shrink-0">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <Button type="submit" variant="primary" className="bg-[#4F46E5] hover:bg-[#4338CA] px-10 h-14 whitespace-nowrap md:w-auto w-full text-base font-bold shadow-sm transition-all rounded-sm">
                Search my job
              </Button>
            </form>

            {/* Popular Tags */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base text-gray-500 font-medium">
              <span>Popular : </span>
              <span className="text-gray-700">UI Designer, UX Researcher, Android, Admin</span>
            </div>
          </div>

          {/* Right Content / Image Container */}
          <div 
            className="relative w-full h-[400px] sm:h-[500px] lg:h-[650px] hidden md:flex justify-center items-end overflow-hidden"
          >
          

             {/* Hero Image */}
             <div className="relative z-10 w-full h-full flex items-end justify-center">
               <Image 
                 src="/Header/Pic.png" 
                 alt="Professional" 
                 width={520}
                 height={650}
                 className="object-contain h-full w-auto"
                 priority
               />
             </div>
          </div>
        </div>
      </div>

      {/* Background Visual Element: The big white corner reveal */}
      <div 
        className="hidden lg:block absolute bottom-0 right-0 z-20 bg-white" 
        style={{
          width: '30%',
          height: '35%',
          clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)',
        }}
      ></div>
    </section>
  );  
}



