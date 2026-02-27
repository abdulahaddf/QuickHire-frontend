import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center overflow-x-hidden bg-[#FAFBFF]">
      <Navbar />
      <HeroSection />
    </main>
  );
}
