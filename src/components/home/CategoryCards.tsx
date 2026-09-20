"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/components/ui/useScrollReveal";

const categories = [
  {
    id: "SKINCARE",
    label: "Skincare",
    description: "Face packs, serums, gels and cleansers for your daily skin ritual.",
    emoji: "✨",
    gradient: "from-forest-mid/80 to-forest-dark/90",
    href: "/products?category=SKINCARE",
    count: "14 products",
  },
  {
    id: "HAIRCARE",
    label: "Haircare",
    description: "Traditional hair care from root to tip using botanical ingredients.",
    emoji: "🌾",
    gradient: "from-earth/80 to-earth-dark/90",
    href: "/products?category=HAIRCARE",
    count: "3 products",
  },
  {
    id: "WELLNESS",
    label: "Wellness",
    description: "Soaps, body care and lip care for a complete daily routine.",
    emoji: "🌸",
    gradient: "from-forest/80 to-forest-dark/90",
    href: "/products?category=SOAPS",
    count: "6 products",
  },
];

export default function CategoryCards() {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      aria-labelledby="categories-heading"
      className="section bg-cream-light"
    >
      <div className="container-brand">
        {/* Header */}
        <div
          ref={headRef}
          className={`text-center mb-12 reveal-hidden ${headVisible ? "reveal-visible" : ""}`}
        >
          <p className="text-forest/50 text-sm font-medium uppercase tracking-widest font-body mb-3">
            What we offer
          </p>
          <h2
            id="categories-heading"
            className="text-display-lg font-display font-bold text-forest"
          >
            Three categories.
            <br />
            <span className="italic text-forest-pale">One simple philosophy.</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`group relative overflow-hidden rounded-card-xl block focus-visible:ring-2 focus-visible:ring-gold reveal-hidden stagger-${i + 1} ${gridVisible ? "reveal-visible" : ""}`}
              aria-label={`Browse ${cat.label} products`}
            >
              {/* Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`}
              />

              {/* Decorative botanical shapes */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <svg
                  className="absolute -bottom-8 -right-8 w-40 h-40 text-white/10"
                  viewBox="0 0 200 200"
                  fill="currentColor"
                >
                  <path d="M100 10 C140 30, 180 80, 160 130 C140 180, 60 190, 40 150 C20 110, 50 40, 100 10 Z" />
                </svg>
                <svg
                  className="absolute -top-6 -left-6 w-28 h-28 text-white/5"
                  viewBox="0 0 200 200"
                  fill="currentColor"
                >
                  <circle cx="100" cy="100" r="90" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 min-h-[280px] flex flex-col justify-between">
                <div>
                  <div className="text-5xl mb-5" aria-hidden="true">{cat.emoji}</div>
                  <h3 className="font-display font-bold text-cream text-2xl mb-3">
                    {cat.label}
                  </h3>
                  <p className="text-cream/70 text-sm leading-relaxed font-body">
                    {cat.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-cream/20">
                  <span className="text-cream/50 text-xs font-body">{cat.count}</span>
                  <span className="flex items-center gap-1 text-cream/80 text-sm font-medium group-hover:gap-2 transition-all">
                    Explore
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

