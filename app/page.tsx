import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { CompanyLogos } from "@/components/home/CompanyLogos";
import { StartPostingSection } from "@/components/home/StartPostingSection";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { LatestJobs } from "@/components/home/LatestJobs";

export default function Home() {
  return (
    <div className="flex-1 w-full bg-[#FAFBFF]">
      <HeroSection />
      <CompanyLogos />
      <CategorySection />
      <StartPostingSection />
      <FeaturedJobs />
      <LatestJobs />
    </div>
  );
}
