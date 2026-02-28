import Link from 'next/link';
import Image from 'next/image';

export function StartPostingSection() {
  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="relative w-full min-h-[450px] flex items-center">
          
          {/* Blue Polygon Background */}
          <div 
            className="absolute inset-0 bg-[#4F46E5]"
            style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 86%, 64% 100%, 0 100%, 0 20%)' }}
          ></div>
          
          {/* Content Wrapper */}
          <div className="relative z-10 w-full flex flex-col md:flex-row justify-between p-8 md:p-16 lg:p-20">
            
            {/* Left Content */}
            <div className="w-full md:w-[45%] flex flex-col justify-center mb-12 md:mb-0">
              <h2 className="text-5xl lg:text-[4rem] font-bold text-white leading-[1.1] mb-6 tracking-tight">
                Start posting<br/>jobs today
              </h2>
              <p className="text-white text-lg lg:text-xl font-medium mb-10">
                Start posting jobs for only $10.
              </p>
              <div>
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center bg-white text-[#4F46E5] font-bold text-lg px-8 py-4 hover:bg-gray-50 transition-colors"
                >
                  Sign Up For Free
                </Link>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-[50%] absolute bottom-0 right-20 h-[350px] md:min-h-[350px]">
              <Image
                src="/Startposting/Dashboard Company.jpg"
                alt="Dashboard Preview"
                fill
                className="object-left-top"
              />
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}