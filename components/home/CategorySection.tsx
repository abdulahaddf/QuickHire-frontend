import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Job } from '@/types';

const defaultCategories = [
  { name: 'Design', icon: '/Category/Icon-1.svg', href: '/jobs?category=Design', isHighlighted: false },
  { name: 'Sales', icon: '/Category/Icon-2.svg', href: '/jobs?category=Sales', isHighlighted: false },
  { name: 'Marketing', icon: '/Category/Icon-3.svg', href: '/jobs?category=Marketing', isHighlighted: true },
  { name: 'Finance', icon: '/Category/Icon-4.svg', href: '/jobs?category=Finance', isHighlighted: false },
  { name: 'Technology', icon: '/Category/Icon-5.svg', href: '/jobs?category=Technology', isHighlighted: false },
  { name: 'Engineering', icon: '/Category/Icon-6.svg', href: '/jobs?category=Engineering', isHighlighted: false },
  { name: 'Business', icon: '/Category/Icon-7.svg', href: '/jobs?category=Business', isHighlighted: false },
  { name: 'Human Resource', icon: '/Category/Icon.svg', href: '/jobs?category=Human+Resource', isHighlighted: false },
];

export function CategorySection({ jobs }: { jobs: Job[] }) {
  const categories = defaultCategories.map(cat => {
    const count = jobs.filter(j => j.category === cat.name).length;
    return { ...cat, count };
  });

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12">
          <h2 className="text-[2.5rem] font-bold tracking-tight text-gray-900 leading-none">
            Explore by <span className="text-[#00A3FF]">category</span>
          </h2>
          <Link href="/jobs" className="mt-4 sm:mt-0 flex items-center text-[#4F46E5] font-semibold hover:underline">
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
                className={`group flex flex-col p-8 border rounded-sm transition-all hover:shadow-lg ${
                  category.isHighlighted 
                    ? 'bg-[#4F46E5] border-[#4F46E5] text-white shadow-xl scale-105 z-10' 
                    : 'bg-white border-gray-100/60 hover:border-[#00A3FF]'
                }`}
              >
                <div className="mb-8">
                  <Image 
                    src={category.icon} 
                    alt={category.name} 
                    width={40} 
                    height={40}
                    className={category.isHighlighted ? 'brightness-0 invert' : ''}
                  />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${category.isHighlighted ? 'text-white' : 'text-gray-900'}`}>
                  {category.name}
                </h3>
                <div className={`mt-auto flex items-center gap-2 text-[15px] font-medium ${
                  category.isHighlighted ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {category.count} jobs available
                  <ArrowRight className={`w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${category.isHighlighted ? 'text-white' : 'text-gray-900'}`} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
