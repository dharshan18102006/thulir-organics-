import Link from "next/link";
import { Leaf, Home, Search, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-light flex items-center justify-center">
      <div className="container-brand py-20 text-center">
        {/* Botanical icon */}
        <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-8">
          <Leaf className="w-9 h-9 text-forest" aria-hidden="true" />
        </div>

        <h1 className="font-display font-bold text-forest text-5xl mb-4">404</h1>
        <h2 className="font-display font-semibold text-forest text-xl mb-4">
          Page not found
        </h2>
        <p className="text-forest/60 font-body max-w-sm mx-auto mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist. It may have moved, or the URL might be incorrect.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-cream font-medium rounded-full hover:bg-forest-mid transition-colors focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Go Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-forest text-forest font-medium rounded-full hover:bg-forest/5 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            Browse Products
          </Link>
          <Link
            href="/problem-finder"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold text-earth font-medium rounded-full hover:bg-gold/5 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Problem Finder
          </Link>
        </div>
      </div>
    </div>
  );
}
