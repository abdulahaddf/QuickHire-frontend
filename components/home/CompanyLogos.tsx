'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const companies = [
  { name: 'Vodafone', src: '/Company/vodafone-2017-logo.png', width: 140, height: 40 },
  { name: 'Intel', src: '/Company/intel-3.png', width: 140, height: 40 },
  { name: 'Tesla', src: '/Company/tesla-9 1.png', width: 140, height: 40 },
  { name: 'AMD', src: '/Company/amd-logo-1.png', width: 140, height: 40 },
  { name: 'Talkit', src: '/Company/talkit 1.png', width: 140, height: 40 },
];

export function CompanyLogos() {
  return (
    <section className="bg-white py-12 border-b border-gray-50 relative z-20 overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-20 text-center md:text-left">
        <p className="text-xl font-medium text-gray-400 mb-8 lg:pl-20">
          Companies we helped grow
        </p>

        {/* Horizontal Scroll Area Container */}
        <div className="relative w-full mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div 
            className="flex items-center w-max"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* Set 1 */}
            <div className="flex items-center gap-16 px-8 py-4">
              {companies.map((company) => (
                <div key={'row1-' + company.name} className="relative flex items-center justify-center transition-all hover:scale-105 hover:opacity-100 shrink-0">
                  <Image 
                    src={company.src} 
                    alt={`${company.name} logo`} 
                    width={company.width} 
                    height={company.height} 
                    className="object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Set 2 (Duplicated for seamless loop) */}
            <div className="flex items-center gap-16 px-8 py-4">
              {companies.map((company) => (
                <div key={'row2-' + company.name} className="relative flex items-center justify-center transition-all hover:scale-105 hover:opacity-100 shrink-0">
                  <Image 
                    src={company.src} 
                    alt={`${company.name} logo`} 
                    width={company.width} 
                    height={company.height} 
                    className="object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
            
            {/* Set 3 (Extra buffer for long screens) */}
            <div className="flex items-center gap-16 px-8 py-4">
              {companies.map((company) => (
                <div key={'row3-' + company.name} className="relative flex items-center justify-center transition-all hover:scale-105 hover:opacity-100 shrink-0">
                  <Image 
                    src={company.src} 
                    alt={`${company.name} logo`} 
                    width={company.width} 
                    height={company.height} 
                    className="object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
