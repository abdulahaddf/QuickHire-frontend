import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const featuredJobs = [
  { id: 1, title: 'Email Marketing', company: 'Revolut', location: 'Madrid, Spain', type: 'Full Time', tags: ['Marketing', 'Design'], logo: 'R' },
  { id: 2, title: 'Brand Designer', company: 'Dropbox', location: 'San Francisco, US', type: 'Full Time', tags: ['Design', 'Business'], logo: 'D', logoColor: 'text-blue-500' },
  { id: 3, title: 'Email Marketing', company: 'Pitch', location: 'Berlin, Germany', type: 'Full Time', tags: ['Marketing'], logo: 'P' },
  { id: 4, title: 'Visual Designer', company: 'Blinkist', location: 'Granada, Spain', type: 'Full Time', tags: ['Design'], logo: 'B', logoColor: 'text-green-500' },
  { id: 5, title: 'Product Designer', company: 'ClassPass', location: 'Manchester, UK', type: 'Full Time', tags: ['Marketing', 'Design'], logo: 'C', logoColor: 'text-blue-600' },
  { id: 6, title: 'Lead Designer', company: 'Canva', location: 'Ontario, Canada', type: 'Full Time', tags: ['Design', 'Business'], logo: 'Ca', logoColor: 'text-teal-500' },
  { id: 7, title: 'Brand Strategist', company: 'GoDaddy', location: 'Marseille, France', type: 'Full Time', tags: ['Marketing'], logo: 'G', logoColor: 'text-green-600' },
  { id: 8, title: 'Data Analyst', company: 'Twitter', location: 'San Diego, US', type: 'Full Time', tags: ['Technology'], logo: 'T', logoColor: 'text-blue-400' },
];

export function FeaturedJobs() {
  return (
    <section className="bg-white py-24 border-t border-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
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
          {featuredJobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`} className="group p-6 border border-gray-200 hover:border-blue-500 transition-all bg-white hover:shadow-lg flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center font-bold text-xl ${job.logoColor || 'text-gray-900'}`}>
                  {job.logo}
                </div>
                <span className="text-blue-600 px-3 py-1 bg-blue-50 border border-blue-100 text-xs font-semibold">
                  {job.type}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-sm font-medium text-gray-500 mb-4">{job.company} • {job.location}</p>
              
              <p className="text-sm text-gray-600 mb-6 flex-1 line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {job.tags.map(tag => (
                  <span key={tag} className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                    tag === 'Marketing' ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
                    tag === 'Design' ? 'text-green-600 bg-green-50 border-green-200' :
                    tag === 'Business' ? 'text-blue-600 bg-blue-50 border-blue-200' :
                    'text-gray-600 bg-gray-50 border-gray-200'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
