"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { useScrollReveal } from "@/components/ui/useScrollReveal";

const staggerClasses = ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5", "stagger-6"];

export default function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 6);
  const { ref: headRef, isVisible: headVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      aria-labelledby="featured-heading"
      className="section bg-cream"
    >
      <div className="container-brand">
        {/* Header */}
        <div
          ref={headRef}
          className={`flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 reveal-hidden ${headVisible ? "reveal-visible" : ""}`}
        >
          <div>
            <p className="text-forest/50 text-sm font-medium uppercase tracking-widest font-body mb-2">
              Handpicked for you
            </p>
            <h2
              id="featured-heading"
              className="text-display-md font-display font-bold text-forest"
            >
              Featured Products
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-forest font-medium text-sm hover:text-forest-mid transition-colors group focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            View all products
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Products grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <div
              key={product.id}
              className={`reveal-hidden ${staggerClasses[i] ?? ""} ${gridVisible ? "reveal-visible" : ""}`}
            >
              <ProductCard product={product} variant="featured" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-forest text-forest font-semibold rounded-full hover:bg-forest hover:text-cream transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold"
          >
            Explore All 30 Products
          </Link>
        </div>
      </div>
    </section>
  );
}

