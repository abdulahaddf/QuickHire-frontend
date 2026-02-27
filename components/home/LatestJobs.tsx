import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Job } from '@/types';

export function LatestJobs({ jobs = [] }: { jobs: Job[] }) {
  const displayJobs = jobs.slice(0, 8);

  return (
    <section className="bg-[#FAFBFF] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12">
          <h2 className="text-[2.5rem] font-bold tracking-tight text-gray-900 leading-none">
            Latest <span className="text-[#00A3FF]">jobs open</span>
          </h2>
          <Link href="/jobs" className="mt-4 sm:mt-0 flex items-center text-[#4F46E5] font-semibold hover:underline">
            Show all jobs 
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {displayJobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`} className="flex items-center p-6 bg-white border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all">
              <div className="w-16 h-16 relative flex-shrink-0 flex items-center justify-center rounded-sm overflow-hidden mr-6 bg-gray-50 border border-gray-100">
                {job.logoUrl ? (
                  <Image src={job.logoUrl} alt={job.company} fill className="object-contain p-2" />
                ) : (
                  <span className="font-bold text-2xl text-gray-900">{job.company.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium mb-3">{job.company} • {job.location}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-green-600 px-3 py-1 bg-green-50 border border-green-100 text-xs font-semibold rounded-full">
                    Full Time
                  </span>
                  <div className="w-[1px] h-6 bg-gray-200 mx-2"></div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      job.category === 'Marketing' ? 'text-yellow-600 border-yellow-200' :
                      job.category === 'Design' ? 'text-blue-600 border-blue-200' :
                      'text-gray-600 border-gray-200'
                    }`}>
                      {job.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
