"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative w-full mx-auto px-6 lg:px-20 pt-12 md:pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 relative px-20">
        {/* Left Content */}
       <div className="flex flex-col gap-10 relative z-30">
        <h1 className="text-[3.5rem] md:text-[5.5rem] font-bold leading-[1.1] text-gray-900 tracking-tight">
          Discover <br />
          more than <br />
          <span className="text-[#00A3FF] relative inline-block z-10 w-max">
            5000+ Jobs
            {/* SVG Underline */}
            <div className="absolute top-[98%] left-[-5%] w-[110%] -z-10 flex justify-center pointer-events-none">
              <Image src="/Header/verticleLine.svg" alt="Underline" width={455} height={40} className="w-full h-auto" />
            </div>
          </span>
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl max-w-lg leading-relaxed mt-4 font-medium">
          Great platform for the job seeker that searching for new career heights and passionate about startups.
        </p>

        {/* Search Bar Box */}
        <div className="w-[1000px] h-[100px] bg-white p-3 shadow-[0px_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-stretch md:items-center gap-4 mt-2 border border-gray-100/50 relative z-50">
          
          <div className="flex items-center gap-3 px-4 flex-1">
            <Image src="/Header/Search.svg" alt="Search Icon" width={20} height={20} className="opacity-70" />
            <input 
              type="text" 
              placeholder="Job title or keyword" 
              className="w-full text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
            />
          </div>

          <div className="hidden md:block w-[1px] h-10 bg-gray-200"></div>
          
          <div className="flex items-center gap-3 px-4 flex-1 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
            <Image src="/Header/Location.svg" alt="Location Icon" width={20} height={20} className="opacity-70" />
            <input 
              type="text" 
              defaultValue="Florence, Italy" 
              className="w-full text-[15px] text-gray-800 focus:outline-none bg-transparent"
            />
            {/* simple caret down */}
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <Button variant="primary" className=" bg-[#4F46E5] hover:bg-[#4338CA] px-8 py-4 h-auto whitespace-nowrap md:w-auto w-full">
            Search my job
          </Button>
        </div>

        {/* Popular Tags */}
        <div className="flex items-center gap-2 text-xl mt-2 text-gray-500 font-medium">
          <span>Popular : </span>
          <span className="text-gray-700">UI Designer, UX Researcher, Android, Admin</span>
        </div>
      </div>

           {/* Background Pattern */}
         <div className="absolute top-15 left-40 -translate-x-[6%] -translate-y-[28%] w-[135%] h-[130%] z-[1] hidden md:block">
           <Image src="/Header/Pattern.svg" alt="Background Pattern" fill className="object-contain" priority />
         </div>
        {/* Right Content / Image Container */}
        <div className="relative w-full h-96 md:h-96 lg:h-[600px] hidden md:flex justify-center items-center">

           {/* Hero Image */}
           <Image 
             src="/Header/Pic.png" 
             alt="Professional" 
             width={490}
             height={600}
             className="relative z-10 object-contain"
             priority
           />

        </div>
      </div>
           {/* White Corner Bottom Right */}
          <div 
             className="absolute bottom-0 right-0 z-20" 
             style={{
               width: 0,
               height: 0,
               borderLeft: '500px solid transparent',
               borderBottom: '265px solid white',
             }}
           ></div>
    </section>
  );
}



