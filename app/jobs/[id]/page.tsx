'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ApplyForm } from '@/components/jobs/ApplyForm';
import { jobService } from '@/services/api';
import { Job } from '@/types';
import { MapPin, Briefcase, DollarSign, Clock, Building, User } from 'lucide-react';

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        const data = await jobService.getJobById(id as string);
        setJob(data);
      } catch (error) {
        console.error('Failed to fetch job:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner className="h-10 w-10 text-blue-600" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-900">Job Not Found</h2>
        <p className="mt-2 text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <div className="mt-2 flex items-center gap-2 text-lg text-blue-600">
              <Building className="h-5 w-5" />
              <span className="font-semibold">{job.company}</span>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1">
                <Briefcase className="h-4 w-4" />
                {job.type}
              </div>
              {job.salary && (
                <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1">
                  <DollarSign className="h-4 w-4" />
                  {job.salary}
                </div>
              )}
              <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1">
                <Clock className="h-4 w-4" />
                {new Date(job.postedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
             <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 self-start md:self-end">
               {job.category}
             </Badge>
             {!isApplying && !applySuccess && (
               <button
                 onClick={() => setIsApplying(true)}
                 className="mt-4 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700 md:mt-0"
               >
                 Apply for this role
               </button>
             )}
          </div>
        </div>

        <hr className="my-8 border-gray-100" />

        {isApplying ? (
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-6">
            <h3 className="mb-6 text-xl font-bold text-gray-900">Submit Your Application</h3>
            <ApplyForm 
              jobId={job.id} 
              onSuccess={() => {
                setIsApplying(false);
                setApplySuccess(true);
              }}
              onCancel={() => setIsApplying(false)}
            />
          </div>
        ) : applySuccess ? (
          <div className="rounded-xl border border-green-100 bg-green-50 p-6 text-center">
            <h3 className="text-xl font-bold text-green-800">Application Submitted!</h3>
            <p className="mt-2 text-green-700">Thank you for applying. The company will be in touch with you soon.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
              <div className="mt-4 text-gray-600 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">Requirements</h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">Responsibilities</h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
                {job.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
