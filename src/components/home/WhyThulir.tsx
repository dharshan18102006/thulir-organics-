"use client";

import { Leaf, Heart, Droplets, Sun, Shield, Star } from "lucide-react";
import { useScrollReveal } from "@/components/ui/useScrollReveal";

const points = [
  {
    icon: Leaf,
    title: "Nature-Inspired Formulations",
    description:
      "Every product uses botanical, Ayurvedic, and traditional South Indian ingredients — the kind that have been trusted for generations.",
  },
  {
    icon: Sun,
    title: "Easy Everyday Use",
    description:
      "Designed to fit into busy modern routines. Simple steps, real ingredients, no complicated rituals required.",
  },
  {
    icon: Heart,
    title: "Thoughtfully Selected",
    description:
      "Each ingredient is chosen intentionally. We believe in knowing what goes on your skin and hair.",
  },
  {
    icon: Shield,
    title: "Personal-Care Focused",
    description:
      "Skin, hair, and wellness — everything Thulir makes is for personal care. Nothing more, nothing less.",
  },
  {
    icon: Star,
    title: "Simple Routines",
    description:
      "The best routine is one you actually do. Thulir products are designed to be easy enough to use every day.",
  },
  {
    icon: Droplets,
    title: "Rooted in Tamil Nadu",
    description:
      "Inspired by the rich botanical and wellness traditions of South India, brought to life for modern everyday use.",
  },
];

const staggerClasses = [
  "stagger-1", "stagger-2", "stagger-3",
  "stagger-4", "stagger-5", "stagger-6",
];

export default function WhyThulir() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      aria-labelledby="why-thulir-heading"
      className="section bg-cream"
    >
      <div className="container-brand">
        {/* Header */}
        <div
          ref={headingRef}
          className={`text-center mb-14 reveal-hidden ${headingVisible ? "reveal-visible" : ""}`}
        >
          <p className="text-forest/50 text-sm font-medium uppercase tracking-widest font-body mb-3">
            Why choose us
          </p>
          <h2
            id="why-thulir-heading"
            className="text-display-lg font-display font-bold text-forest"
          >
            The Thulir difference
          </h2>
        </div>

        {/* Points grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {points.map((point, i) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className={`group p-6 rounded-card-lg border border-beige bg-white hover:border-forest/20 hover:shadow-card transition-all duration-300 reveal-hidden ${staggerClasses[i] ?? ""} ${gridVisible ? "reveal-visible" : ""}`}
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-cream flex items-center justify-center mb-4 group-hover:bg-forest/5 transition-colors">
                  <Icon className="w-5.5 h-5.5 text-forest-mid" aria-hidden="true" />
                </div>

                <h3 className="font-display font-semibold text-forest text-lg mb-2">
                  {point.title}
                </h3>
                <p className="text-forest/60 text-sm leading-relaxed font-body">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-forest/35 text-xs font-body mt-10 max-w-2xl mx-auto">
          All Thulir Organics products are for cosmetic and personal-care use only.
          We do not make medical or therapeutic claims. Always perform a patch test before first use.
        </p>
      </div>
    </section>
  );
}

