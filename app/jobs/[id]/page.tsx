import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Briefcase, MapPin, Building2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { jobService } from '@/services/api';
import { ApplyForm } from '@/components/jobs/ApplyForm';

export const revalidate = 0; // Disable static rendering for fresh jobs

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  let job;
  try {
    const res = await jobService.getJobById(params.id);
    job = res.data;
  } catch (error) {
    console.error("Failed to fetch job details", error);
  }

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAFBFF] py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all jobs
        </Link>
        
        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
          
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between border-b border-gray-100 pb-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 relative bg-gray-50 border border-gray-100 flex items-center justify-center rounded-md overflow-hidden flex-shrink-0">
                {job.logoUrl ? (
                  <Image src={job.logoUrl} alt={job.company} fill className="object-contain p-3" />
                ) : (
                  <span className="font-bold text-3xl text-gray-900">{job.company.charAt(0)}</span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500">
                  <span className="flex items-center"><Building2 className="w-4 h-4 mr-1.5" /> {job.company}</span>
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> {job.location}</span>
                </div>
              </div>
            </div>
            
            <div className="w-full sm:w-auto mt-4 sm:mt-0">
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700 font-semibold w-full">
                Full Time
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 prose prose-blue max-w-none">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About the Role</h3>
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                {job.description}
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 h-fit">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Job Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <Briefcase className="w-4 h-4 mr-2" /> Category
                  </div>
                  <div className="font-semibold text-gray-900 ml-6">{job.category}</div>
                </div>
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <Calendar className="w-4 h-4 mr-2" /> Posted On
                  </div>
                  <div className="font-semibold text-gray-900 ml-6">
                    {new Date(job.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-sm border border-gray-100" id="apply">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for this position</h2>
          <ApplyForm jobId={job.id.toString()} />
        </div>
      </div>
    </div>
  );
}
