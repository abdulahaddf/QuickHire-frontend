'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/types';
import { jobService } from '@/services/api';
import { Trash2, Plus, Building2, MapPin } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function AdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await jobService.getJobs();
      setJobs(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.currentTarget);
    const jobData = {
      title: formData.get('title'),
      company: formData.get('company'),
      logoUrl: formData.get('logoUrl') || '/Company/talkit 1.png',
      location: formData.get('location'),
      category: formData.get('category'),
      description: formData.get('description'),
    };

    try {
      await jobService.createJob(jobData);
      setSuccess('Job successfully created!');
      e.currentTarget.reset();
      fetchJobs();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create job');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    
    try {
      await jobService.deleteJob(id.toString());
      setJobs(jobs.filter(j => j.id !== id));
    } catch (err) {
      alert('Failed to delete job');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Job Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-blue-600" /> Add New Job
            </h2>
            
            {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}
            {success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md text-sm">{success}</div>}

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
                <input type="text" name="logoUrl" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="/Company/talkit 1.png" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input required type="text" name="location" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Remote, US" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select required name="category" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Select Category</option>
                  <option value="Design">Design</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Finance">Finance</option>
                  <option value="Human Resource">Human Resource</option>
                </select>
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

        {/* Job List Management */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between">
              Manage Active Jobs
              <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full">{jobs.length} Total</span>
            </h2>

            {loading ? (
              <div className="flex justify-center py-12"><LoadingSpinner className="w-8 h-8 text-blue-600" /></div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No jobs posted yet.</div>
            ) : (
              <div className="space-y-4">
                {jobs.map(job => (
                  <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-gray-100 hover:border-blue-200 rounded-lg group transition-colors">
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
                      className="mt-4 sm:mt-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors self-start sm:self-auto"
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
    </div>
  );
}
