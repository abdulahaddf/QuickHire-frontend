import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Job } from '@/types';

export function FeaturedJobs({ jobs = [] }: { jobs: Job[] }) {
  const displayJobs = jobs.slice(0, 8);

  return (
    <section className="bg-white py-24 border-t border-gray-50">
      <div className="mx-auto max-w-11/12 px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12">
          <h2 className="text-[2.5rem] font-bold tracking-tight text-gray-900 leading-none">
            Featured <span className="text-[#00A3FF]">jobs</span>
          </h2>
          <Link href="/jobs" className="mt-4 sm:mt-0 flex items-center text-[#4F46E5] font-semibold hover:underline">
            Show all jobs 
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayJobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`} className="group p-6 border border-gray-200 hover:border-blue-500 transition-all bg-white hover:shadow-lg flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 relative bg-gray-50 border border-gray-100 flex items-center justify-center rounded-sm overflow-hidden">
                  {job?.logoUrl ? (
                    <Image src={job?.logoUrl} alt={job?.company} fill className="object-contain p-2" />
                  ) : (
                    <span className="font-bold text-xl text-gray-900">{job?.company.charAt(0)}</span>
                  )}
                </div>
                <span className="text-blue-600 px-3 py-1 bg-blue-50 border border-blue-100 text-xs font-semibold">
                  Full Time
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-sm font-medium text-gray-500 mb-4">{job.company} • {job.location}</p>
              
              <p className="text-sm text-gray-600 mb-6 flex-1 line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                    job.category === 'Marketing' ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
                    job.category === 'Design' ? 'text-green-600 bg-green-50 border-green-200' :
                    job.category === 'Business' ? 'text-blue-600 bg-blue-50 border-blue-200' :
                    'text-gray-600 bg-gray-50 border-gray-200'
                  }`}>
                    {job.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
