import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Thulir Organics.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream-light pt-28 pb-16">
      <div className="container-brand max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-forest text-3xl mb-6">Privacy Policy</h1>
        <div className="prose-sm text-forest/70 font-body leading-relaxed space-y-5">
          <p><strong>[PLACEHOLDER — Replace with your full Privacy Policy before going live.]</strong></p>
          <h2 className="font-display font-semibold text-forest text-xl">Information we collect</h2>
          <p>When you use the contact form or Problem Finder, we may collect information you voluntarily provide, such as your name and email address. We do not collect medical records, government IDs, payment details, or sensitive health information.</p>
          <h2 className="font-display font-semibold text-forest text-xl">How we use information</h2>
          <p>We use information only to respond to your enquiries. Questionnaire inputs from the Problem Finder are processed locally in your browser and are not stored on our servers.</p>
          <h2 className="font-display font-semibold text-forest text-xl">Data security</h2>
          <p>We implement reasonable technical measures to protect any information you share with us. We do not sell or share your personal information with third parties for marketing purposes.</p>
          <h2 className="font-display font-semibold text-forest text-xl">Contact</h2>
          <p>For privacy-related queries, contact us at <a href="mailto:[EMAIL]" className="text-forest font-medium underline">[EMAIL]</a>.</p>
          <p className="pt-4">
            <Link href="/" className="text-forest font-medium underline hover:text-forest-mid">Return to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
