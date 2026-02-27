import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const latestJobs = [
  { id: 1, title: 'Social Media Assistant', company: 'Nomad', location: 'Paris, France', type: 'Full Time', tags: ['Marketing', 'Design'], logo: 'N', logoColor: 'text-green-500 bg-green-50' },
  { id: 2, title: 'Social Media Assistant', company: 'Netlify', location: 'Paris, France', type: 'Full Time', tags: ['Marketing', 'Design'], logo: 'N', logoColor: 'text-teal-500 bg-teal-50' },
  { id: 3, title: 'Brand Designer', company: 'Dropbox', location: 'San Francisco, US', type: 'Full Time', tags: ['Marketing', 'Design'], logo: 'D', logoColor: 'text-blue-500 bg-blue-50' },
  { id: 4, title: 'Brand Designer', company: 'Maze', location: 'San Francisco, US', type: 'Full Time', tags: ['Marketing', 'Design'], logo: 'M', logoColor: 'text-indigo-500 bg-indigo-50' },
  { id: 5, title: 'Interactive Developer', company: 'Terraform', location: 'Hamburg, Germany', type: 'Full Time', tags: ['Marketing', 'Design'], logo: 'T', logoColor: 'text-cyan-500 bg-cyan-50' },
  { id: 6, title: 'Interactive Developer', company: 'Udacity', location: 'Hamburg, Germany', type: 'Full Time', tags: ['Marketing', 'Design'], logo: 'U', logoColor: 'text-blue-600 bg-blue-100' },
  { id: 7, title: 'HR Manager', company: 'Packer', location: 'Lucerne, Switzerland', type: 'Full Time', tags: ['Marketing', 'Design'], logo: 'P', logoColor: 'text-red-500 bg-red-50' },
  { id: 8, title: 'HR Manager', company: 'Webflow', location: 'Lucerne, Switzerland', type: 'Full Time', tags: ['Marketing', 'Design'], logo: 'W', logoColor: 'text-blue-700 bg-blue-50' },
];

export function LatestJobs() {
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
          {latestJobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`} className="flex items-center p-6 bg-white border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all">
              <div className={`w-16 h-16 flex-shrink-0 flex items-center justify-center font-bold text-2xl mr-6 ${job.logoColor}`}>
                {job.logo}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium mb-3">{job.company} • {job.location}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-green-600 px-3 py-1 bg-green-50 border border-green-100 text-xs font-semibold rounded-full">
                    {job.type}
                  </span>
                  <div className="w-[1px] h-6 bg-gray-200 mx-2"></div>
                  {job.tags.map(tag => (
                    <span key={tag} className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      tag === 'Marketing' ? 'text-yellow-600 border-yellow-200' :
                      tag === 'Design' ? 'text-blue-600 border-blue-200' :
                      'text-gray-600 border-gray-200'
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
