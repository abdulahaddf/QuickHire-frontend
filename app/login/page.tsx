'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate network request
    setTimeout(() => {
      // Hardcoded admin auth as requested
      if (email === 'admin@quickhire.com' && password === 'admin123') {
        router.push('/admin');
      } else {
        setError('Invalid admin credentials. Please try again.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAFBFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-blue-600 mb-6">
          <Briefcase className="w-12 h-12" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100">
          
          {error && (
            <div className="mb-6 bg-red-50 border border-red-100 rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none transition-all"
                  placeholder="admin@quickhire.com"
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none transition-all"
                  placeholder="admin123"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Forgot your password?
                </a>
              </div>
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
                    Sign in to Account
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Login Details</span>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg text-sm text-blue-800 flex flex-col items-center justify-center border border-blue-100 font-mono">
              <div><span className="font-bold">Email:</span> admin@quickhire.com</div>
              <div className="mt-1"><span className="font-bold">Password:</span> admin123</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
