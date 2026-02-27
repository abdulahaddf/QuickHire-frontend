import { HeroSection } from "@/components/home/HeroSection";
import { jobService } from "@/services/api";
import { CategorySection } from "@/components/home/CategorySection";
import { CompanyLogos } from "@/components/home/CompanyLogos";
import { StartPostingSection } from "@/components/home/StartPostingSection";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { LatestJobs } from "@/components/home/LatestJobs";

export const revalidate = 0; // Disable static rendering to always show fresh jobs

export default async function Home() {
  let jobs = [];
  try {
    const res = await jobService.getJobs();
    jobs = res.data;
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
