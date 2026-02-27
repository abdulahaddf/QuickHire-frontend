export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedAt: string;
  category: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateName: string;
  email: string;
  resumeUrl: string;
  coverLetter?: string;
  status: 'PENDING' | 'REVIEWING' | 'SHORTLISTED' | 'REJECTED';
  appliedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
