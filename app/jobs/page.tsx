'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/jobs/SearchBar';
import { JobFilters } from '@/components/jobs/JobFilters';
import { JobCard } from '@/components/jobs/JobCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { jobService } from '@/services/api';
import { Job } from '@/types';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ query: '', location: '', category: '', type: '' });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const data = await jobService.getJobs(filters);
      setJobs(data.data || []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Find Your Dream Job</h1>
        <SearchBar 
          onSearch={(query, location) => setFilters(prev => ({ ...prev, query, location }))} 
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <JobFilters 
            onFilterChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))} 
          />
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <LoadingSpinner className="h-8 w-8 text-blue-600" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 h-64 flex-col items-center justify-center text-gray-500">
              <p className="text-lg font-medium">No jobs found matching your criteria</p>
              <button 
                onClick={() => setFilters({ query: '', location: '', category: '', type: '' })}
                className="mt-4 text-blue-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
