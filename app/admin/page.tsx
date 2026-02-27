'use client';

import { useState, useEffect } from 'react';
import { jobService, applicationService } from '@/services/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Badge } from '@/components/ui/Badge';
import { Job, Application } from '@/types';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [jobsData, appsData] = await Promise.all([
        jobService.getJobs(),
        applicationService.getApplications()
      ]);
      setJobs(jobsData.data || []);
      setApplications(appsData || []);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      await jobService.deleteJob(id);
      setJobs(jobs.filter(j => j.id !== id));
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await applicationService.updateApplicationStatus(id, status);
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: status as any } : app
      ));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner className="h-10 w-10 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">Manage job postings and review applications.</p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            onClick={() => alert('Create job form would open here')}
          >
            <PlusCircle className="h-5 w-5" />
            Post New Job
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-4 border-b border-gray-200">
        <button
          className={`pb-4 px-2 text-sm font-medium transition-colors ${
            activeTab === 'jobs' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('jobs')}
        >
          Manage Jobs ({jobs.length})
        </button>
        <button
          className={`pb-4 px-2 text-sm font-medium transition-colors ${
            activeTab === 'applications' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('applications')}
        >
          Applications ({applications.length})
        </button>
      </div>

      {activeTab === 'jobs' ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Posted Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">{job.company}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge variant="secondary">{job.type}</Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(job.postedAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteJob(job.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {jobs.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-500">
              No jobs posted yet.
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Job Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Applied Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Resume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {applications.map((app) => (
                 <tr key={app.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{app.candidateName}</div>
                    <div className="text-sm text-gray-500">{app.email}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {app.jobId}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="REVIEWING">REVIEWING</option>
                      <option value="SHORTLISTED">SHORTLISTED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </td>
                   <td className="whitespace-nowrap px-6 py-4 text-sm">
                     <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 underline">
                       View Resume
                     </a>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
          {applications.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-500">
              No applications received yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
