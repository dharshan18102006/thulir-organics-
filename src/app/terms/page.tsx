import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream-light pt-28 pb-16">
      <div className="container-brand max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-forest text-3xl mb-6">Terms of Use</h1>
        <div className="prose-sm text-forest/70 font-body leading-relaxed space-y-5">
          <p><strong>[PLACEHOLDER — Replace with your full Terms of Use before going live.]</strong></p>
          <p>By using this website, you agree to use it only for lawful personal-care information purposes. All content is provided for informational purposes only and does not constitute medical advice.</p>
          <p>All product descriptions, images, and content on this site are the property of Thulir Organics. Unauthorised reproduction is not permitted.</p>
          <p className="pt-4">
            <Link href="/" className="text-forest font-medium underline hover:text-forest-mid">Return to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
