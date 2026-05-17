import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { Sectors } from "@/components/Sectors";
import { Solutions } from "@/components/Solutions";
import { WhyUs } from "@/components/WhyUs";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <Solutions />
      <WhyUs />
      <Sectors />
      <ContactSection />
    </main>
  );
}
