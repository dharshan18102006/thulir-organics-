"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock,
  AlertCircle,
  List,
  Star,
  RotateCcw,
} from "lucide-react";
import {
  getRecommendations,
  RecommendationOutput,
  RecommendationInput,
} from "@/recommendation-engine/scoring";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import ProductCard from "@/components/products/ProductCard";

export default function RecommendationsClient() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<RecommendationOutput | null>(null);

  useEffect(() => {
    const category = searchParams.get("category") as "SKIN" | "HAIR" | "WELLNESS" | null;
    const concernsRaw = searchParams.get("concerns") || "";
    const selectedConcerns = concernsRaw
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    const skinType = searchParams.get("skinType") || "";
    const hairType = searchParams.get("hairType") || "";
    // Sanitize freeText before using
    const rawText = searchParams.get("freeText") || "";
    const freeText = rawText.replace(/[<>]/g, "").trim().slice(0, 500);

    const input: RecommendationInput = {
      category,
      selectedConcerns,
      skinType: skinType || undefined,
      hairType: hairType || undefined,
      freeText: freeText || undefined,
    };

    const recommendations = getRecommendations(input);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResult(recommendations);
  }, [searchParams]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-light">
        <p className="text-forest/50 font-body animate-pulse">Finding your products...</p>
      </div>
    );
  }

  const { primary, alternatives, complementary, inputSummary } = result;

  return (
    <div className="min-h-screen bg-cream-light">
      {/* Header */}
      <div
        className="pt-28 pb-10"
        style={{
          background: "linear-gradient(180deg, #1C3A2B 0%, #2D5A3D 100%)",
        }}
      >
        <div className="container-brand text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
            <span className="text-gold text-xs font-medium uppercase tracking-wider font-body">
              Your Thulir Recommendation
            </span>
          </div>
          <h1 className="text-display-xl font-display font-bold text-cream mb-3">
            Your Match
          </h1>
          {inputSummary && (
            <p className="text-cream/50 font-body text-sm max-w-lg mx-auto">
              {inputSummary}
            </p>
          )}
        </div>
      </div>

      {/* Disclaimer banner */}
      <div className="container-brand py-4">
        <div
          className="flex items-start gap-3 p-4 rounded-xl border border-gold/30 bg-gold/5"
          role="note"
        >
          <AlertCircle className="w-4 h-4 text-earth shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-earth text-xs font-body">
            <strong>Note:</strong> These recommendations are based on your selected preferences and are
            for cosmetic/personal-care use only. Results may vary. Always perform a patch test.
            This is not medical advice.
          </p>
        </div>
      </div>

      <div className="container-brand py-8">
        {/* No results */}
        {!primary && (
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="text-6xl mb-5" aria-hidden="true">🌿</div>
            <h2 className="font-display font-semibold text-forest text-2xl mb-3">
              No exact match found
            </h2>
            <p className="text-forest/60 font-body mb-6">
              We couldn&apos;t find a strong match for your preferences. Try adjusting your
              selections or browse all products.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/problem-finder"
                className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-cream font-medium rounded-full hover:bg-forest-mid transition-colors focus-visible:ring-2 focus-visible:ring-gold"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                Try Again
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-forest text-forest font-medium rounded-full hover:bg-forest/5 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
              >
                Browse All Products
              </Link>
            </div>
          </div>
        )}

        {/* Primary recommendation */}
        {primary && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-gold fill-gold" aria-hidden="true" />
              <h2 className="font-display font-bold text-forest text-xl">
                Best Match for You
              </h2>
            </div>

            <article
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 rounded-card-xl border-2 border-forest/20 bg-white shadow-card"
              aria-label={`Primary recommendation: ${primary.product.name}`}
            >
              {/* Image */}
              <div>
                <div className="rounded-card-lg overflow-hidden shadow-sm" style={{ aspectRatio: "4/3" }}>
                  {primary.product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={primary.product.image}
                      alt={primary.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImagePlaceholder
                      productName={primary.product.name}
                      category={primary.product.category}
                      size="full"
                    />
                  )}
                </div>
              </div>

              {/* Details */}
              <div>
                {/* Category */}
                <span className="px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-medium font-body">
                  {primary.product.categoryLabel}
                </span>

                <h3 className="font-display font-bold text-forest mt-4 mb-2"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
                  {primary.product.name}
                </h3>

                <p className="text-forest/65 font-body text-sm leading-relaxed mb-6">
                  {primary.product.longDescription}
                </p>

                {/* Why this was recommended */}
                {primary.matchReasons.length > 0 && (
                  <div className="p-4 rounded-xl bg-forest/5 border border-forest/10 mb-5">
                    <p className="text-forest font-body font-semibold text-xs uppercase tracking-wider mb-2.5">
                      🌿 Why we matched this
                    </p>
                    <ul className="space-y-1.5" aria-label="Match reasons">
                      {primary.matchReasons.map((reason, i) => (
                        <li key={i} className="flex items-center gap-2 text-forest/70 text-sm font-body">
                          <CheckCircle className="w-3.5 h-3.5 text-forest-mid shrink-0" aria-hidden="true" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                    <p className="text-forest/40 text-xs font-body mt-3 italic">
                      May be suitable for your selected concern. Results may vary.
                    </p>
                  </div>
                )}

                {/* Usage frequency */}
                <div className="flex items-center gap-2 text-forest/60 text-sm font-body mb-6">
                  <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold">Frequency:</strong>{" "}
                    {primary.product.usageFrequency}
                  </span>
                </div>

                {/* How to use steps */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <List className="w-4 h-4 text-forest" aria-hidden="true" />
                    <p className="font-body font-semibold text-forest text-sm">How to Use</p>
                  </div>
                  <ol className="space-y-2" aria-label="How to use">
                    {primary.product.usageSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="w-5 h-5 rounded-full bg-forest text-cream text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        <p className="text-forest/65 text-sm font-body">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Precautions */}
                <div className="p-3 rounded-lg bg-gold/10 border border-gold/20 mb-6">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-earth shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-earth text-xs font-body leading-relaxed">
                      <strong>Precautions: </strong>{primary.product.precautions}
                    </p>
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="font-display font-bold text-earth text-2xl">
                    {primary.product.price}
                  </span>
                  <Link
                    href={`/products/${primary.product.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-cream font-medium rounded-full hover:bg-forest-mid transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    Full Product Details
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Alternative products */}
        {alternatives.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display font-bold text-forest text-xl mb-6">
              You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {alternatives.map((alt) => (
                <div key={alt.product.id} className="card overflow-hidden rounded-card-lg">
                  {/* Product card content */}
                  <ProductCard product={alt.product} />
                  {/* Match reasons */}
                  {alt.matchReasons.length > 0 && (
                    <div className="px-4 pb-4">
                      <div className="pt-3 border-t border-beige">
                        {alt.matchReasons.slice(0, 2).map((r, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-forest/55 text-xs font-body mb-1">
                            <CheckCircle className="w-3 h-3 text-forest-pale shrink-0" aria-hidden="true" />
                            {r}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Complementary products */}
        {complementary.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display font-bold text-forest text-xl mb-2">
              Complete your routine
            </h2>
            <p className="text-forest/55 font-body text-sm mb-6">
              Products that pair well with your primary recommendation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {complementary.map((cp) => (
                <ProductCard key={cp.id} product={cp} variant="compact" />
              ))}
            </div>
          </div>
        )}

        {/* Bottom actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-beige">
          <Link
            href="/problem-finder"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-forest text-forest font-medium rounded-full hover:bg-forest/5 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Start Over
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-cream font-medium rounded-full hover:bg-forest-mid transition-colors focus-visible:ring-2 focus-visible:ring-gold"
          >
            Explore All Products
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
