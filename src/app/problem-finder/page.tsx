import type { Metadata } from "next";
import ProblemFinder from "@/components/problem-finder/ProblemFinder";

export const metadata: Metadata = {
  title: "Problem Finder",
  description:
    "Use the Thulir Organics Problem Finder to discover the right botanical personal-care product for your skin, hair or wellness concern.",
};

export default function ProblemFinderPage() {
  return <ProblemFinder />;
}
