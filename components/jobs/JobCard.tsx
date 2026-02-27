import Link from 'next/link';
import Image from 'next/image';
import { Job } from '@/types';

export function JobCard({ job }: { job: Job }) {
  return (
    <Link 
      href={`/jobs/${job.id}`} 
      className="group p-6 border border-gray-200 hover:border-blue-500 transition-all bg-white hover:shadow-lg flex flex-col h-full rounded-sm"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 relative bg-gray-50 border border-gray-100 flex items-center justify-center rounded-sm overflow-hidden">
          {job.logoUrl ? (
            <Image src={job.logoUrl} alt={job.company} fill className="object-contain p-2" />
          ) : (
            <span className="font-bold text-xl text-gray-900">{job.company.charAt(0)}</span>
          )}
        </div>
        <span className="text-blue-600 px-3 py-1 bg-blue-50 border border-blue-100 text-xs font-semibold">
          Full Time
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
        {job.title}
      </h3>
      
      <p className="text-sm font-medium text-gray-500 mb-4">
        {job.company} • {job.location}
      </p>
      
      <p className="text-sm text-gray-600 mb-6 flex-1 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
          job.category === 'Marketing' ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
          job.category === 'Design' ? 'text-green-600 bg-green-50 border-green-200' :
          job.category === 'Business' ? 'text-blue-600 bg-blue-50 border-blue-200' :
          job.category === 'Technology' ? 'text-purple-600 bg-purple-50 border-purple-200' :
          'text-gray-600 bg-gray-50 border-gray-200'
        }`}>
          {job.category}
        </span>
      </div>
    </Link>
  );
}
