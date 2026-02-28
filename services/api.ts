import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobService = {
  getJobs: async (params?: Record<string, any>) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },
  
  getJobById: async (id: string) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },
  
  createJob: async (data: any) => {
    const response = await api.post('/jobs', data);
    return response.data;
  },
  
  deleteJob: async (id: string) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },
};

export const applicationService = {
  applyForJob: async (jobId: string, data: FormData) => {
    const response = await api.post(`/jobs/${jobId}/apply`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getApplications: async () => {
    const response = await api.get('/applications');
    return response.data;
  },
  
  updateApplicationStatus: async (id: string, status: string) => {
    const response = await api.patch(`/applications/${id}/status`, { status });
    return response.data;
  },
};
