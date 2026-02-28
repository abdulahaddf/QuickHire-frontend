import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Dribbble } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1f2937] text-gray-300">
      <div className="mx-auto max-w-11/12 px-4 py-16 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5 md:gap-8">
          
          <div className="md:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-8 h-8">
                <Image src="/logo.svg" alt="QuickHire Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">QuickHire</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">About</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Companies</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Advice</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Resources</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Help Docs</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Guide</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Updates</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Get job notifications</h3>
            <p className="text-sm text-gray-400 mb-4">
              The latest job news, articles, and resources sent to your inbox weekly.
            </p>
            <form className="flex max-w-md">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full min-w-0 appearance-none rounded-l-md border border-gray-700 bg-gray-800 px-4 py-2 text-base text-gray-300 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                required
              />
              <button
                type="submit"
                className="flex-shrink-0 rounded-r-md border border-transparent bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            2023 © QuickHire. All rights reserved.
          </p>
          <div className="flex space-x-6 text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
