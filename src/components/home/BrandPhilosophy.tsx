"use client";

import { useScrollReveal } from "@/components/ui/useScrollReveal";

export default function BrandPhilosophy() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      aria-labelledby="philosophy-heading"
      className="section"
      style={{
        background:
          "linear-gradient(135deg, #1C3A2B 0%, #2D5A3D 60%, #3D7A52 100%)",
      }}
    >
      <div className="container-brand">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto text-center reveal-hidden ${isVisible ? "reveal-visible" : ""}`}
        >
          {/* Botanical line */}
          <div className="flex items-center justify-center gap-4 mb-10" aria-hidden="true">
            <div className="h-px flex-1 bg-gold/30" />
            <div className="text-gold text-2xl">🌿</div>
            <div className="h-px flex-1 bg-gold/30" />
          </div>

          {/* Quote */}
          <blockquote>
            <p
              id="philosophy-heading"
              className="font-display italic font-medium text-cream leading-relaxed mb-8"
              style={{ fontSize: "clamp(1.375rem, 3vw, 2.25rem)" }}
            >
              &ldquo;Raw ingredients can be beautiful.
              <br />
              But finding them, preparing them and
              <br />
              using them every day isn&apos;t always easy.&rdquo;
            </p>
          </blockquote>

          {/* Body text */}
          <p
            className="text-cream/70 font-body leading-relaxed max-w-xl mx-auto mb-10"
            style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}
          >
            Thulir Organics brings nature closer to your everyday routine — thoughtfully
            selected ingredients, transformed into simple, convenient care for skin, hair
            and wellness.
          </p>

          {/* Tagline pill */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gold/30 bg-gold/10">
            <span className="text-gold text-sm font-medium font-body tracking-wide">
              Nature + Convenience + Modern Lifestyle
            </span>
          </div>

          {/* Bottom botanical line */}
          <div className="flex items-center justify-center gap-4 mt-10" aria-hidden="true">
            <div className="h-px flex-1 bg-gold/20" />
            <div className="text-gold/50 text-lg">✦</div>
            <div className="h-px flex-1 bg-gold/20" />
          </div>
        </div>
      </div>
    </section>
  );
}

