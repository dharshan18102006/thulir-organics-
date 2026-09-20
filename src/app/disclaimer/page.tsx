import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimer about Thulir Organics products and the Problem Finder tool.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-cream-light pt-28 pb-16">
      <div className="container-brand max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-forest text-3xl mb-6">Disclaimer</h1>
        <div className="prose-sm text-forest/70 font-body leading-relaxed space-y-5">
          <p>
            All Thulir Organics products are for <strong>cosmetic and personal-care use only</strong>. They are not intended to diagnose, treat, cure, or prevent any disease or medical condition.
          </p>
          <p>
            The Problem Finder and recommendation tools on this website provide product suggestions based on your stated personal-care preferences. These suggestions are informational only and do not constitute medical advice. Always consult a qualified healthcare professional for skin, scalp, or health concerns.
          </p>
          <p>
            Results from using Thulir Organics products may vary between individuals. Always perform a patch test before first use of any new product.
          </p>
          <p>
            Ingredient information, usage instructions, prices, and availability on this website are subject to change. Please refer to product packaging for the most current information.
          </p>
          <p className="pt-4">
            <Link href="/" className="text-forest font-medium underline hover:text-forest-mid">Return to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
