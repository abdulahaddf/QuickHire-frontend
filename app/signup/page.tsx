'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network request for signup
    setTimeout(() => {
      // In a real app this would create a user. For this demo, we just redirect to login
      router.push('/login');
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAFBFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-blue-600 mb-6">
          <Briefcase className="w-12 h-12" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            Sign in instead
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100">
          
          <form className="space-y-5" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="text-sm text-gray-500 pb-2">
              By signing up, you agree to our <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Terms</a> and <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Privacy Policy</a>.
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <LoadingSpinner className="w-5 h-5 text-white" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
