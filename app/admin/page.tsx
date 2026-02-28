'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/types';
import { jobService } from '@/services/api';
import { Trash2, Plus, Building2, MapPin, Users, ExternalLink, Mail, Calendar } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { toast } from 'react-toastify';

interface Application {
  id: number;
  jobId: number;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string | null;
  createdAt: string;
  jobTitle: string;
  jobCompany: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');

  const allCategories = ['Design', 'Engineering', 'Marketing', 'Sales', 'Technology', 'Business', 'Finance', 'Human Resource'];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const fetchJobs = async () => {
    try {
      const res = await jobService.getJobs();
      setJobs(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${API_URL}/applications`);
      const data = await res.json();
      setApplications(data.data || []);
    } catch (err) {
      console.error('Failed to fetch applications', err);
    }
  };

  useEffect(() => {
    Promise.all([fetchJobs(), fetchApplications()]).finally(() => setLoading(false));
  }, []);

  const handleAddJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (selectedCategories.length === 0) {
      toast.error('Please select at least one category');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const logoUrl = (formData.get('logoUrl') as string) || '/Company/talkit 1.png';

    const jobData = {
      title: formData.get('title'),
      company: formData.get('company'),
      logoUrl,
      location: formData.get('location'),
      category: selectedCategories.join(', '),
      description: formData.get('description'),
    };

    try {
      await jobService.createJob(jobData);
      toast.success('Job posted successfully! 🎉');
      e.currentTarget.reset();
      setSelectedCategories([]);
      fetchJobs();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create job');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      await jobService.deleteJob(id.toString());
      setJobs(jobs.filter(j => j.id !== id));
      toast.success('Job deleted successfully');
    } catch {
      toast.error('Failed to delete job');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage jobs and review incoming applications.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit mb-8">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-5 py-2.5 rounded-md text-sm font-semibold transition-all ${
              activeTab === 'jobs'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Building2 className="w-4 h-4 inline mr-2" />
            Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-5 py-2.5 rounded-md text-sm font-semibold transition-all ${
              activeTab === 'applications'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Applications ({applications.length})
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner className="w-8 h-8 text-blue-600" />
          </div>
        ) : (
          <>
            {/* ───────────── JOBS TAB ───────────── */}
            {activeTab === 'jobs' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Job Form */}
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 sticky top-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <Plus className="w-5 h-5 mr-2 text-blue-600" /> Add New Job
                    </h2>

                    <form onSubmit={handleAddJob} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input required type="text" name="title" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Senior React Developer" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input required type="text" name="company" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Acme Corp" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL (Optional)</label>
                        <input type="url" name="logoUrl" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://example.com/logo.png" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input required type="text" name="location" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Remote, US" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <div className="flex flex-wrap gap-2">
                          {allCategories.map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => toggleCategory(cat)}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                selectedCategories.includes(cat)
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea required name="description" rows={4} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Job description..."></textarea>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
                      >
                        {isSubmitting ? <LoadingSpinner className="mr-2" /> : 'Post Job'}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Job List */}
                <div className="lg:col-span-2">
                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-between">
                      Active Jobs
                      <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full">{jobs.length} Total</span>
                    </h2>

                    {jobs.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">No jobs posted yet.</div>
                    ) : (
                      <div className="space-y-3">
                        {jobs.map(job => (
                          <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 hover:border-blue-200 rounded-lg group transition-colors">
                            <div>
                              <h3 className="font-bold text-gray-900">{job.title}</h3>
                              <div className="mt-1 flex items-center text-sm text-gray-500 gap-4">
                                <span className="flex items-center"><Building2 className="w-3.5 h-3.5 mr-1" /> {job.company}</span>
                                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {job.location}</span>
                                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">{job.category}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="mt-3 sm:mt-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors self-start sm:self-auto"
                              title="Delete Job"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ───────────── APPLICATIONS TAB ───────────── */}
            {activeTab === 'applications' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {applications.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No applications yet</h3>
                    <p>Applications will appear here when candidates apply for your jobs.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied For</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Resume</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {applications.map(app => (
                          <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-semibold text-gray-900">{app.name}</div>
                              <div className="text-sm text-gray-500 flex items-center mt-0.5">
                                <Mail className="w-3.5 h-3.5 mr-1.5" /> {app.email}
                              </div>
                              {app.coverNote && (
                                <p className="text-xs text-gray-400 mt-1 max-w-xs truncate" title={app.coverNote}>
                                  "{app.coverNote}"
                                </p>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{app.jobTitle || 'Deleted Job'}</div>
                              <div className="text-sm text-gray-500">{app.jobCompany || '—'}</div>
                            </td>
                            <td className="px-6 py-4">
                              <a
                                href={app.resumeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                              >
                                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                                View Resume
                              </a>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              <div className="flex items-center">
                                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                {new Date(app.createdAt).toLocaleDateString('en-US', {
                                  month: 'short', day: 'numeric', year: 'numeric'
                                })}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
