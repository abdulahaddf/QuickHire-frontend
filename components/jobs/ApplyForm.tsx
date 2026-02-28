'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

interface ApplyFormProps {
  jobId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function ApplyForm({ jobId, onSuccess, onCancel }: ApplyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      jobId,
      name: formData.get('candidateName'),
      email: formData.get('email'),
      resumeLink: formData.get('resumeLink'),
      coverNote: formData.get('coverNote') || '',
    };

    try {
      const res = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }

      setSubmitted(true);
      toast.success('Application submitted successfully! 🎉');
      if (onSuccess) onSuccess();
    } catch (err: any) {
      const msg = err.message || 'Failed to submit application';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
        <p className="text-gray-500">Thank you for applying. We'll review your application and get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-100">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="candidateName"
          name="candidateName"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700">
          Resume Link
        </label>
        <input
          type="url"
          id="resumeLink"
          name="resumeLink"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="https://drive.google.com/your-resume"
        />
        <p className="mt-1 text-xs text-gray-400">Paste a link to your resume (Google Drive, Dropbox, etc.)</p>
      </div>

      <div>
        <label htmlFor="coverNote" className="block text-sm font-medium text-gray-700">
          Cover Note <span className="text-gray-400">(Optional)</span>
        </label>
        <textarea
          id="coverNote"
          name="coverNote"
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Tell us why you're a great fit for this role..."
        />
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}
