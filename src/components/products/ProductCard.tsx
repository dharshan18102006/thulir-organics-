import { Product } from "@/data/products";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "featured" | "compact";
}

export default function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/products/${product.id}`}
        className="group flex items-center gap-4 p-3 rounded-xl border border-beige bg-white hover:border-forest/30 hover:shadow-card transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold"
        aria-label={`View ${product.name}`}
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
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
              size="sm"
            />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-forest/50 font-body font-medium uppercase tracking-wide mb-0.5">
            {product.categoryLabel}
          </p>
          <h3 className="font-display font-semibold text-forest text-sm leading-tight group-hover:text-forest-mid transition-colors truncate">
            {product.name}
          </h3>
          <p className="text-xs text-gold font-medium mt-0.5">{product.price}</p>
        </div>
        <ArrowRight
          className="w-4 h-4 text-forest/30 group-hover:text-forest-mid shrink-0 transition-all group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/products/${product.id}`}
        className="group card overflow-hidden block focus-visible:ring-2 focus-visible:ring-gold"
        aria-label={`View ${product.name} — ${product.categoryLabel}`}
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-t-card h-52">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <ImagePlaceholder
              productName={product.name}
              category={product.category}
              size="full"
              className="group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-forest/80 text-cream text-xs font-medium backdrop-blur-sm">
              {product.categoryLabel}
            </span>
          </div>
          {product.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 rounded-full bg-gold/90 text-forest text-xs font-semibold backdrop-blur-sm">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display font-semibold text-forest text-lg leading-tight group-hover:text-forest-mid transition-colors mb-2">
            {product.name}
          </h3>
          <p className="text-forest/60 text-sm leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-earth font-semibold text-base">{product.price}</span>
            <span className="flex items-center gap-1 text-forest text-sm font-medium group-hover:gap-2 transition-all">
              View
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/products/${product.id}`}
      className="group card overflow-hidden block focus-visible:ring-2 focus-visible:ring-gold"
      aria-label={`View ${product.name} — ${product.categoryLabel}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-card h-44">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <ImagePlaceholder
            productName={product.name}
            category={product.category}
            size="full"
            className="group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 rounded-full bg-forest/75 text-cream text-xs font-medium backdrop-blur-sm">
            {product.categoryLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-forest text-base leading-tight group-hover:text-forest-mid transition-colors mb-1.5">
          {product.name}
        </h3>
        <p className="text-forest/55 text-xs leading-relaxed line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Concerns chips */}
        {product.suitableConcerns.slice(0, 2).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.suitableConcerns.slice(0, 2).map((concern) => (
              <span
                key={concern}
                className="px-2 py-0.5 rounded-full bg-cream-dark text-forest/60 text-xs capitalize"
              >
                {concern.replace(/-/g, " ")}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-earth font-semibold text-sm">{product.price}</span>
          <span className="flex items-center gap-1 text-xs text-forest/60 group-hover:text-forest-mid transition-colors">
            Details
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
