export interface Job {
  id: number;
  title: string;
  company: string;
  logoUrl: string;
  location: string;
  category: string;
  description: string;
  createdAt: string;
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
