import Link from 'next/link';
import { Job } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-500 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
              {job.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-blue-600">{job.company}</p>
          </div>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
            {job.type}
          </Badge>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-gray-400" />
            {job.location}
          </div>
          {job.salary && (
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-gray-400" />
              {job.salary}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-400" />
            {new Date(job.postedAt).toLocaleDateString()}
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm text-gray-600">
          {job.description}
        </p>
      </div>
    </Link>
  );
}
