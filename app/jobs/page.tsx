'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { jobService } from '@/services/api';
import { Job } from '@/types';
import { JobCard } from '@/components/jobs/JobCard';
import { SearchBar } from '@/components/jobs/SearchBar';
import { JobFilters } from '@/components/jobs/JobFilters';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function JobsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(initialCategory || '');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await jobService.getJobs();
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  const categories = Array.from(new Set(jobs.map(j => j.category))).filter(Boolean);
  const locations = Array.from(new Set(jobs.map(j => j.location))).filter(Boolean);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter ? job.category === categoryFilter : true;
    const matchesLocation = locationFilter ? job.location === locationFilter : true;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#FAFBFF] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find your next <span className="text-[#00A3FF]">opportunity</span></h1>
          <p className="text-lg text-gray-500">Discover top companies and remote roles that match your skills.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <SearchBar onSearch={setSearchQuery} className="flex-1" />
          <div className="hidden md:block w-[1px] bg-gray-200 mx-2"></div>
          <JobFilters 
            categories={categories}
            locations={locations}
            onCategoryChange={setCategoryFilter}
            onLocationChange={setLocationFilter}
          />
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner className="w-8 h-8 text-blue-600" />
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find more opportunities.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
