"use client";

import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useScrollReveal } from "@/components/ui/useScrollReveal";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? "text-gold fill-gold" : "text-beige fill-beige"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section"
      style={{
        background:
          "linear-gradient(180deg, #F5F0E8 0%, #EDE6D8 100%)",
      }}
    >
      <div className="container-brand">
        {/* Header */}
        <div
          ref={headRef}
          className={`text-center mb-12 reveal-hidden ${headVisible ? "reveal-visible" : ""}`}
        >
          <p className="text-forest/50 text-sm font-medium uppercase tracking-widest font-body mb-3">
            Customer stories
          </p>
          <h2
            id="testimonials-heading"
            className="text-display-md font-display font-bold text-forest"
          >
            What people are saying
          </h2>
        </div>

        {/* Placeholder notice */}
        <div className="mb-8 p-4 rounded-xl border-2 border-dashed border-gold/40 bg-gold/5 text-center">
          <p className="text-earth text-sm font-body">
            <strong>🔖 Content placeholder:</strong> Replace these with real verified customer testimonials before publishing.
          </p>
        </div>

        {/* Testimonials grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <article
              key={t.id}
              className={`card p-6 rounded-card-lg reveal-hidden stagger-${i + 1} ${gridVisible ? "reveal-visible" : ""}`}
              aria-label={`Testimonial about ${t.product}`}
            >
              <StarRating rating={t.rating} />

              <blockquote className="mt-4 mb-5">
                <p className="text-forest/70 font-body text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              <div className="border-t border-beige pt-4 flex items-center justify-between">
                <div>
                  <p className="font-body font-semibold text-forest text-sm">{t.name}</p>
                  <p className="text-forest/50 text-xs">{t.location}</p>
                </div>
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-cream text-forest/60 text-xs font-medium font-body">
                    {t.product}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

