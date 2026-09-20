"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Leaf } from "lucide-react";
import { useScrollReveal } from "@/components/ui/useScrollReveal";

export default function ProblemFinderCTA() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      aria-labelledby="problem-finder-cta-heading"
      className="section bg-cream-light"
    >
      <div className="container-brand">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-card-xl p-10 md:p-16 text-center reveal-hidden ${isVisible ? "reveal-visible" : ""}`}
          style={{
            background:
              "linear-gradient(135deg, #1C3A2B 0%, #2D5A3D 50%, #122519 100%)",
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <svg
              className="absolute top-0 right-0 w-64 h-64 text-forest-light opacity-10"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <path d="M100 10 C140 30, 180 80, 160 130 C140 180, 60 190, 40 150 C20 110, 50 40, 100 10 Z" />
            </svg>
            <svg
              className="absolute bottom-0 left-0 w-48 h-48 text-gold opacity-5"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <circle cx="100" cy="100" r="90" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 mb-6">
              <Leaf className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
              <span className="text-gold text-xs font-medium uppercase tracking-wider font-body">
                Personalised Recommendation
              </span>
            </div>

            <h2
              id="problem-finder-cta-heading"
              className="font-display font-bold text-cream leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
            >
              Not sure what your
              <br />
              routine needs?
            </h2>

            <p className="text-cream/65 font-body max-w-md mx-auto mb-8 leading-relaxed">
              Tell us your concern — skin, hair, or wellness — and we&apos;ll
              match you with the right Thulir product from our catalogue.
            </p>

            <Link
              href="/problem-finder"
              id="problem-finder-main-cta"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gold text-forest font-semibold rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-premium hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cream text-base"
            >
              <Sparkles className="w-5 h-5" aria-hidden="true" />
              Find Your Product
              <ArrowRight className="w-4.5 h-4.5" aria-hidden="true" />
            </Link>

            <p className="text-cream/35 text-xs font-body mt-5">
              No account needed · Rule-based matching · Real products only
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
