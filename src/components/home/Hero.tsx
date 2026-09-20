"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, Leaf, Sparkles } from "lucide-react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.35}px)`,
  };

  return (
    <section
      ref={heroRef}
      aria-label="Hero section"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #122519 0%, #1C3A2B 50%, #2D5A3D 100%)" }}
    >
      {/* Parallax botanical background */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
        style={parallaxStyle}
      >
        {/* Large decorative leaves - SVG */}
        <svg
          className="absolute -top-8 -left-8 w-64 h-64 text-forest-light opacity-20 animate-leaf-sway"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M100 10 C140 30, 180 80, 160 130 C140 180, 60 190, 40 150 C20 110, 50 40, 100 10 Z" />
        </svg>
        <svg
          className="absolute top-1/4 -right-12 w-48 h-48 text-forest-light opacity-15 animate-leaf-sway"
          style={{ animationDelay: "2s" }}
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M100 10 C140 30, 180 80, 160 130 C140 180, 60 190, 40 150 C20 110, 50 40, 100 10 Z" />
        </svg>
        <svg
          className="absolute bottom-20 left-1/4 w-32 h-32 text-gold opacity-10 animate-float"
          style={{ animationDelay: "1s" }}
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <circle cx="100" cy="100" r="80" />
          <path d="M100 30 L110 80 L160 70 L120 100 L140 150 L100 120 L60 150 L80 100 L40 70 L90 80 Z" fill="none" stroke="currentColor" strokeWidth="8" />
        </svg>
        {/* Botanical circles */}
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full border border-cream/5" />
        <div className="absolute top-24 right-24 w-72 h-72 rounded-full border border-cream/5" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full border border-cream/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-brand text-center pt-24 pb-16">
        {/* Eyebrow label */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 mb-8 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <Leaf className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
          <span className="text-gold text-xs font-medium font-body tracking-wider uppercase">
            Tamil Nadu&apos;s Organic Personal Care
          </span>
        </div>

        {/* Brand name — bold, gold-highlighted */}
        <h1
          className="opacity-0 animate-fade-up"
          style={{
            animationDelay: "0.3s",
            animationFillMode: "forwards",
          }}
        >
          <span
            className="font-display font-black tracking-widest inline-block"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              letterSpacing: "0.25em",
              background: "linear-gradient(90deg, #DFC08A 0%, #C9A96E 40%, #F5E4C3 70%, #C9A96E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: "drop-shadow(0 0 18px rgba(201,169,110,0.35))",
            }}
          >
            THULIR ORGANICS
          </span>
          {/* Gold underline accent */}
          <span className="block w-16 h-0.5 mx-auto mt-2 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }} aria-hidden="true" />
        </h1>

        {/* Hero headline */}
        <div
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
        >
          <h2
            className="font-display text-cream font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Nature,{" "}
            <span className="italic text-gold">Made Easy.</span>
          </h2>
        </div>

        {/* Supporting copy */}
        <p
          className="text-cream/70 font-body leading-relaxed max-w-xl mx-auto mb-10 opacity-0 animate-fade-up"
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            animationDelay: "0.6s",
            animationFillMode: "forwards",
          }}
        >
          Natural goodness, thoughtfully transformed into simple everyday care
          for your skin, hair and wellness.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.75s", animationFillMode: "forwards" }}
        >
          <Link
            href="/problem-finder"
            id="hero-primary-cta"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold text-forest font-semibold rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-premium hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cream"
          >
            <Sparkles className="w-4.5 h-4.5" aria-hidden="true" />
            Find Your Product
          </Link>
          <Link
            href="/products"
            id="hero-secondary-cta"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-cream/40 text-cream font-medium rounded-full hover:border-cream/70 hover:bg-cream/10 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold"
          >
            Explore Products
          </Link>
        </div>

        {/* Stats / trust indicators */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 mt-14 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
        >
          {[
            { value: "30+", label: "Botanical Products" },
            { value: "100%", label: "Natural Ingredients" },
            { value: "Tamil Nadu", label: "Made in India" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-cream">{stat.value}</p>
              <p className="text-cream/50 text-xs font-body mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center gap-2 text-cream/40">
          <span className="text-xs font-body tracking-wider uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4" aria-hidden="true" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #FAFAF7 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
