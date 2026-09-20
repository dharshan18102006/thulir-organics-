import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsPageClient from "@/components/products/ProductsPageClient";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse all 30 Thulir Organics botanical personal-care products — skincare, face serums, oils, haircare, soaps, gels and more.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-light flex items-center justify-center"><div className="text-forest/50 font-body">Loading products...</div></div>}>
      <ProductsPageClient />
    </Suspense>
  );
}
