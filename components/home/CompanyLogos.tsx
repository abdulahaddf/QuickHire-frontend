import Image from 'next/image';

const companies = [
  { name: 'Vodafone', src: '/Company/vodafone-2017-logo.png', width: 140, height: 40 },
  { name: 'Intel', src: '/Company/intel-3.png', width: 90, height: 40 },
  { name: 'Tesla', src: '/Company/tesla-9 1.png', width: 120, height: 40 },
  { name: 'AMD', src: '/Company/amd-logo-1.png', width: 100, height: 40 },
  { name: 'Talkit', src: '/Company/talkit 1.png', width: 100, height: 40 },
];

export function CompanyLogos() {
  return (
    <section className="bg-white py-12 border-b border-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20 text-center md:text-left">
        <p className="text-sm font-medium text-gray-400 mb-8 max-w-7xl mx-auto">
          Companies we helped grow
        </p>
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-300 mx-auto w-full max-w-7xl">
          {companies.map((company) => (
            <div key={company.name} className="relative flex items-center justify-center transition-all hover:scale-105 hover:opacity-100">
              <Image 
                src={company.src} 
                alt={`${company.name} logo`} 
                width={company.width} 
                height={company.height} 
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
