import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="section bg-cream-light"
    >
      <div className="container-brand">
        <div className="text-center max-w-2xl mx-auto">
          {/* Botanical divider */}
          <div className="flex items-center justify-center gap-4 mb-10" aria-hidden="true">
            <div className="h-px w-16 bg-gold/40" />
            <Leaf className="w-5 h-5 text-gold" />
            <div className="h-px w-16 bg-gold/40" />
          </div>

          <h2
            id="final-cta-heading"
            className="text-display-lg font-display font-bold text-forest mb-5 leading-tight"
          >
            Make nature part of
            <br />
            <span className="italic text-forest-pale">your everyday routine.</span>
          </h2>

          <p className="text-forest/60 font-body leading-relaxed mb-10">
            From Nalangu Maavu to Kumkumadi Oil — every Thulir product is
            made for real everyday use. Find what works for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              id="final-cta-explore"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-forest text-cream font-semibold rounded-full hover:bg-forest-mid transition-all duration-300 hover:shadow-premium hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-gold text-base"
            >
              Explore Thulir Organics
              <ArrowRight className="w-4.5 h-4.5" aria-hidden="true" />
            </Link>
            <Link
              href="/problem-finder"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-forest text-forest font-medium rounded-full hover:bg-forest/5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold text-base"
            >
              🌿 Problem Finder
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
