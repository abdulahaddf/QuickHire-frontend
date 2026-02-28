import { HeroSection } from "@/components/home/HeroSection";
import { jobService } from "@/services/api";
import { CategorySection } from "@/components/home/CategorySection";
import { CompanyLogos } from "@/components/home/CompanyLogos";
import { StartPostingSection } from "@/components/home/StartPostingSection";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { LatestJobs } from "@/components/home/LatestJobs";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default async function Home() {
  let jobs = [];
  try {
    const res = await fetch(`${API_URL}/jobs`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      jobs = data.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch jobs for homepage", error);
  }

  return (
    <div className="flex-1 w-full bg-[#FAFBFF]">
      <HeroSection />
      <CompanyLogos />
      <CategorySection jobs={jobs} />
      <StartPostingSection />
      <FeaturedJobs jobs={jobs} />
      <LatestJobs jobs={jobs} />
    </div>
  );
}
