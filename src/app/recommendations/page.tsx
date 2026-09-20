import type { Metadata } from "next";
import { Suspense } from "react";
import RecommendationsClient from "@/components/recommendations/RecommendationsClient";

export const metadata: Metadata = {
  title: "Your Recommendation",
  description: "Your personalised Thulir Organics product recommendation based on your skin, hair and wellness concerns.",
};

export default function RecommendationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream-light">
          <p className="text-forest/50 font-body animate-pulse">
            Finding your products...
          </p>
        </div>
      }
    >
      <RecommendationsClient />
    </Suspense>
  );
}
