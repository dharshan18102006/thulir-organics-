import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Clock,
  List,
  Package,
} from "lucide-react";
import { getProductById, getComplementaryProducts, products } from "@/data/products";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import ProductCard from "@/components/products/ProductCard";
import ProductActions from "@/components/products/ProductActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: `${product.description} | Thulir Organics — ${product.categoryLabel}`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const complementary = getComplementaryProducts(product.id);

  return (
    <div className="min-h-screen bg-cream-light">
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-cream border-b border-beige">
        <div className="container-brand">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-forest/50 font-body">
              <li>
                <Link href="/" className="hover:text-forest transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/products" className="hover:text-forest transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/products?category=${product.category}`}
                  className="hover:text-forest transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  {product.categoryLabel}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-forest font-medium" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-brand py-10">
        {/* Main product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left — Image */}
          <div>
            <div className="rounded-card-xl overflow-hidden shadow-card aspect-square">
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImagePlaceholder
                  productName={product.name}
                  category={product.category}
                  size="full"
                  className="aspect-square"
                />
              )}
            </div>

            {/* Availability */}
            <div className="mt-4 flex items-center gap-2">
              {product.availability ? (
                <>
                  <CheckCircle className="w-4 h-4 text-forest-mid" aria-hidden="true" />
                  <span className="text-forest-mid text-sm font-body font-medium">
                    Available
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-earth" aria-hidden="true" />
                  <span className="text-earth text-sm font-body">Currently unavailable</span>
                </>
              )}
            </div>
          </div>

          {/* Right — Details */}
          <div>
            {/* Category */}
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-medium font-body">
                {product.categoryLabel}
              </span>
              {product.featured && (
                <span className="px-3 py-1 rounded-full bg-gold/20 text-earth text-xs font-medium font-body">
                  ⭐ Featured
                </span>
              )}
            </div>

            <h1 className="font-display font-bold text-forest text-display-md mb-3">
              {product.name}
            </h1>

            <p className="text-forest/65 font-body leading-relaxed mb-4">
              {product.longDescription}
            </p>

            {/* Price */}
            <div className="text-2xl font-display font-bold text-earth mb-6">
              {product.price}
            </div>

            {/* Tags */}
            {product.suitableConcerns.length > 0 && (
              <div className="mb-6">
                <p className="text-forest/50 text-xs font-body font-medium uppercase tracking-wider mb-2">
                  Suitable for
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.suitableConcerns.map((concern) => (
                    <span
                      key={concern}
                      className="px-2.5 py-1 rounded-full bg-cream-dark text-forest/70 text-xs capitalize font-body"
                    >
                      {concern.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skin / hair types */}
            {product.skinTypes.length > 0 && (
              <div className="mb-6">
                <p className="text-forest/50 text-xs font-body font-medium uppercase tracking-wider mb-2">
                  Skin types
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.skinTypes.map((st) => (
                    <span
                      key={st}
                      className="px-2.5 py-1 rounded-full bg-beige text-forest/70 text-xs capitalize font-body"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.hairTypes.length > 0 && (
              <div className="mb-6">
                <p className="text-forest/50 text-xs font-body font-medium uppercase tracking-wider mb-2">
                  Hair types
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.hairTypes.map((ht) => (
                    <span
                      key={ht}
                      className="px-2.5 py-1 rounded-full bg-beige text-forest/70 text-xs capitalize font-body"
                    >
                      {ht}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <ProductActions productName={product.name} priceStr={product.price} />
              
              <Link
                href="/problem-finder"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 border-2 border-forest text-forest font-semibold rounded-full hover:bg-forest/5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Sparkles className="w-4.5 h-4.5" aria-hidden="true" />
                Problem Finder
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="text-forest/35 text-xs font-body mt-4 leading-relaxed">
              This product is for cosmetic and personal-care use only. Not intended to diagnose,
              treat, cure, or prevent any condition. Consult a professional if you have skin
              concerns.
            </p>
          </div>
        </div>

        {/* Product info tabs section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {/* How to Use */}
          <div className="p-6 rounded-card-lg border border-beige bg-white">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-forest/10 flex items-center justify-center">
                <List className="w-4.5 h-4.5 text-forest" aria-hidden="true" />
              </div>
              <h2 className="font-display font-semibold text-forest text-lg">
                How to Use
              </h2>
            </div>
            <ol className="space-y-3" aria-label="Usage steps">
              {product.usageSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-full bg-forest text-cream text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="text-forest/70 text-sm font-body leading-relaxed">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-4 pt-4 border-t border-beige flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-forest/50 mt-0.5 shrink-0" aria-hidden="true" />
              <p className="text-forest/50 text-xs font-body">
                <span className="font-medium">Frequency: </span>
                {product.usageFrequency}
              </p>
            </div>
          </div>

          {/* Ingredients + Precautions */}
          <div className="space-y-4">
            {/* Ingredients */}
            <div className="p-6 rounded-card-lg border border-beige bg-white">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-lg bg-forest/10 flex items-center justify-center">
                  <Package className="w-4.5 h-4.5 text-forest" aria-hidden="true" />
                </div>
                <h2 className="font-display font-semibold text-forest text-lg">
                  Key Ingredients
                </h2>
              </div>
              <ul className="space-y-1.5" aria-label="Ingredients list">
                {product.ingredients.map((ingredient, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-forest/70 text-sm font-body"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Precautions */}
            <div className="p-6 rounded-card-lg border border-gold/20 bg-gold/5">
              <div className="flex items-center gap-2.5 mb-4">
                <AlertCircle
                  className="w-4.5 h-4.5 text-earth shrink-0"
                  aria-hidden="true"
                />
                <h2 className="font-display font-semibold text-forest text-base">
                  Precautions
                </h2>
              </div>
              <p className="text-forest/65 text-sm font-body leading-relaxed">
                {product.precautions}
              </p>
            </div>
          </div>
        </div>

        {/* Benefits section */}
        {product.benefits.length > 0 && !product.benefits[0].startsWith('[') && (
          <div className="mb-14">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-earth" aria-hidden="true" />
              </div>
              <h2 className="font-display font-semibold text-forest text-lg">
                Key Benefits
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {product.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-white border border-beige rounded-xl hover:border-gold/40 hover:shadow-sm transition-all duration-200"
                >
                  <div
                    className="w-5 h-5 rounded-full bg-forest/10 flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <CheckCircle className="w-3 h-3 text-forest-mid" />
                  </div>
                  <p className="text-forest/70 text-sm font-body leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Complementary products */}
        {complementary.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-forest text-xl">
                You may also like
              </h2>
              <Link
                href="/products"
                className="flex items-center gap-1 text-sm text-forest/60 hover:text-forest transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded"
              >
                View all
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {complementary.map((cp) => (
                <ProductCard key={cp.id} product={cp} />
              ))}
            </div>
          </div>
        )}

        {/* Problem Finder nudge */}
        <div className="p-8 rounded-card-xl border-2 border-dashed border-forest/20 text-center">
          <p className="text-forest/50 font-body mb-3">
            Want to check if this product fits your routine?
          </p>
          <Link
            href="/problem-finder"
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-cream font-medium rounded-full hover:bg-forest-mid transition-colors focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Use Problem Finder
          </Link>
        </div>
      </div>
    </div>
  );
}
