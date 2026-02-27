import Link from 'next/link';
import Image from 'next/image';

export function StartPostingSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="relative overflow-hidden bg-[#4F46E5] flex flex-col md:flex-row items-center justify-between p-12 md:p-16">
          <div className="relative z-10 max-w-lg mb-10 md:mb-0">
            <h2 className="text-4xl md:text-[3.5rem] font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Start posting<br/>jobs today
            </h2>
            <p className="text-blue-100 font-medium mb-10 text-lg">
              Start posting jobs for only $10.
            </p>
            <Link
              href="/admin"
              className="inline-flex bg-white text-[#4F46E5] font-bold px-8 py-4 hover:bg-gray-50 transition-colors"
            >
              Sign up For free
            </Link>
          </div>
          
          <div className="relative w-full md:w-[600px] h-[300px] md:h-[400px] md:absolute md:right-0 md:-bottom-12 md:translate-x-12">
            <Image
              src="/Startposting/Dashboard Company.jpg"
              alt="Dashboard Preview"
              fill
              className="object-cover object-left-top shadow-2xl rounded-tl-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
