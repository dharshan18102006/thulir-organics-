import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import BrandPhilosophy from "@/components/home/BrandPhilosophy";
import CategoryCards from "@/components/home/CategoryCards";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProblemFinderCTA from "@/components/home/ProblemFinderCTA";
import WhyThulir from "@/components/home/WhyThulir";
import AboutSnippet from "@/components/home/AboutSnippet";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Thulir Organics — Nature, Made Easy.",
  description:
    "Discover Thulir Organics — a Tamil Nadu-based organic personal-care brand bringing botanical skincare, haircare and wellness products into your everyday routine.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandPhilosophy />
      <CategoryCards />
      <FeaturedProducts />
      <ProblemFinderCTA />
      <WhyThulir />
      <AboutSnippet />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
