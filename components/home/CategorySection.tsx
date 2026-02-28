import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Job } from '@/types';

const defaultCategories = [
  { name: 'Design', icon: '/Category/Icon.svg', href: '/jobs?category=Design' },
  { name: 'Sales', icon: '/Category/Icon-1.svg', href: '/jobs?category=Sales' },
  { name: 'Marketing', icon: '/Category/Icon-2.svg', href: '/jobs?category=Marketing' },
  { name: 'Finance', icon: '/Category/Icon-3.svg', href: '/jobs?category=Finance' },
  { name: 'Technology', icon: '/Category/Icon-4.svg', href: '/jobs?category=Technology' },
  { name: 'Engineering', icon: '/Category/Icon-5.svg', href: '/jobs?category=Engineering' },
  { name: 'Business', icon: '/Category/Icon-6.svg', href: '/jobs?category=Business' },
  { name: 'Human Resource', icon: '/Category/Icon-7.svg', href: '/jobs?category=Human+Resource' },
];

export function CategorySection({ jobs }: { jobs: Job[] }) {
  const categories = defaultCategories.map(cat => {
    const count = jobs.filter(j => j.category === cat.name).length;
    return { ...cat, count };
  });

  return (
    <section className="bg-white md:py-20">
      <div className="mx-auto max-w-11/12 px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12">
          <h2 className="md:text-[2.5rem] text-[2rem] font-bold tracking-tight text-gray-900 leading-none">
            Explore by <span className="text-[#00A3FF]">category</span>
          </h2>
          {/* Desktop: Show all jobs link in header */}
          <Link href="/jobs" className="hidden sm:flex items-center text-[#4F46E5] font-semibold hover:underline">
            Show all jobs 
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group flex md:flex-col flex-row gap-5 p-8 border border-gray-300 transition-all hover:shadow-lg bg-white border-gray-100/60 hover:border-[#00A3FF] hover:bg-[#4F46E5] hover:text-white hover:shadow-xl hover:scale-[1.02] duration-300 z-10"
              >
              
                 <div className="mb-8">
                  <Image 
                    src={category.icon} 
                    alt={category.name} 
                    width={40} 
                    height={40}
                    className={`object-contain transition-all duration-300 ${
                      category.icon.includes('Icon-2.svg') || category.icon.includes('Icon')
                        ? 'brightness-0 [filter:invert(48%)_sepia(79%)_saturate(2476%)_hue-rotate(180deg)_brightness(100%)_contrast(109%)]'
                        : ''
                    } group-hover:brightness-0 group-hover:invert`}
                  />
                </div>
             
               <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-white transition-all duration-300">
                  {category.name}
                </h3>
            
              
                <div className="mt-auto flex items-center gap-2 text-[15px] font-medium text-gray-500 group-hover:text-blue-100 transition-all duration-300">
                  {category.count} jobs available
                  <ArrowRight className="w-4 h-4 ml-auto  transition-all duration-300" />
                </div>
               </div>

              </Link>
            );
          })}
        </div>

        {/* Mobile: Show all jobs link below section */}
        <Link href="/jobs" className="mt-8 flex sm:hidden items-center text-[#4F46E5] font-semibold hover:underline">
          Show all jobs 
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
