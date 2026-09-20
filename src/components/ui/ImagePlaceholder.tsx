import { Category } from "@/data/products";

interface ImagePlaceholderProps {
  productName?: string;
  category?: Category;
  className?: string;
  size?: "sm" | "md" | "lg" | "full";
}

const categoryIcons: Partial<Record<Category, string>> = {
  SKINCARE: "🌿",
  FACE_SERUMS: "✨",
  OILS: "🌸",
  HAIRCARE: "🌾",
  ROSEWATER: "🌹",
  LIPCARE: "💧",
  FACE_GELS: "🌱",
  SOAPS: "🍃",
  CREAMS_CLEANSERS: "🌼",
  BODYCARE: "🌿",
};

export default function ImagePlaceholder({
  productName,
  category,
  className = "",
  size = "md",
}: ImagePlaceholderProps) {
  const icon = category ? categoryIcons[category] || "🌿" : "🌿";

  const sizeClasses = {
    sm: "h-32",
    md: "h-48",
    lg: "h-72",
    full: "h-full min-h-[280px]",
  };

  return (
    <div
      className={`product-img-placeholder w-full ${sizeClasses[size]} ${className}`}
      role="img"
      aria-label={
        productName
          ? `Product image placeholder for ${productName}`
          : "Product image placeholder"
      }
    >
      <div className="text-4xl" aria-hidden="true">
        {icon}
      </div>
      <div className="text-center px-4">
        {productName && (
          <p className="text-xs font-medium text-earth/70 font-body leading-tight">
            {productName}
          </p>
        )}
        <p className="text-xs text-earth/40 font-body mt-1">
          [PRODUCT IMAGE]
        </p>
      </div>
    </div>
  );
}
