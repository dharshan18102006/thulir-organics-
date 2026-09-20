"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { products, CATEGORY_LABELS, Category, SkinType, Product } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

type SortOption = "featured" | "az" | "za" | "category";

const allCategories: Category[] = [
  "SKINCARE", "FACE_SERUMS", "OILS", "HAIRCARE", "ROSEWATER",
  "LIPCARE", "FACE_GELS", "SOAPS", "CREAMS_CLEANSERS", "BODYCARE",
];

const concernOptions = [
  { value: "dullness", label: "Dullness" },
  { value: "dryness", label: "Dryness" },
  { value: "excess-oil", label: "Excess Oil" },
  { value: "hydration", label: "Hydration" },
  { value: "cleansing", label: "Cleansing" },
  { value: "glow-routine", label: "Glow Routine" },
  { value: "general-skincare", label: "General Skincare" },
  { value: "tan-appearance", label: "Tan Appearance" },
  { value: "dry-hair", label: "Dry Hair" },
  { value: "hair-care-routine", label: "Hair Care Routine" },
  { value: "scalp-cleansing", label: "Scalp Cleansing" },
];

const skinTypeOptions: { value: SkinType; label: string }[] = [
  { value: "all", label: "All Skin Types" },
  { value: "oily", label: "Oily" },
  { value: "dry", label: "Dry" },
  { value: "combination", label: "Combination" },
  { value: "sensitive", label: "Sensitive" },
  { value: "normal", label: "Normal" },
];

export default function ProductsPageClient() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">(
    (searchParams.get("category") as Category) || ""
  );
  const [selectedConcern, setSelectedConcern] = useState(searchParams.get("concern") || "");
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | "">(
    (searchParams.get("skinType") as SkinType) || ""
  );
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [filtered, setFiltered] = useState<Product[]>([]);

  // Apply filters — computed from filter state, setState at end of effect is correct here
  useEffect(() => {
    let result = products.filter((p) => p.availability);

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.suitableConcerns.some((c) => c.includes(q))
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Concern
    if (selectedConcern) {
      result = result.filter((p) => p.suitableConcerns.includes(selectedConcern));
    }

    // Skin type
    if (selectedSkinType && selectedSkinType !== "all") {
      result = result.filter(
        (p) => p.skinTypes.includes(selectedSkinType) || p.skinTypes.includes("all")
      );
    }

    // Sort
    if (sortBy === "az") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "za") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "category") {
      result = [...result].sort((a, b) => a.categoryLabel.localeCompare(b.categoryLabel));
    } else {
      // Featured first
      result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFiltered(result);
  }, [searchQuery, selectedCategory, selectedConcern, selectedSkinType, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedConcern("");
    setSelectedSkinType("");
    setSortBy("featured");
  };

  const hasActiveFilters =
    searchQuery || selectedCategory || selectedConcern || selectedSkinType;

  return (
    <div className="min-h-screen bg-cream-light">
      {/* Page header */}
      <div
        className="pt-28 pb-12"
        style={{
          background: "linear-gradient(180deg, #1C3A2B 0%, #2D5A3D 100%)",
        }}
      >
        <div className="container-brand text-center">
          <p className="text-gold text-sm font-medium uppercase tracking-widest font-body mb-3">
            The Collection
          </p>
          <h1 className="text-display-xl font-display font-bold text-cream mb-4">
            All Products
          </h1>
          <p className="text-cream/60 font-body max-w-lg mx-auto">
            30 botanical personal-care products — skincare, haircare, and wellness.
          </p>
        </div>
      </div>

      <div className="container-brand py-10">
        {/* Search + Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40"
              aria-hidden="true"
            />
            <input
              id="products-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3 bg-white border-2 border-beige rounded-xl text-forest placeholder:text-forest/40 focus:outline-none focus:border-forest-mid transition-colors text-sm"
              aria-label="Search products"
            />
          </div>

          {/* Filter toggle (mobile) */}
          <button
            id="toggle-filters-btn"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-beige rounded-xl text-forest font-medium text-sm hover:border-forest/30 transition-colors md:hidden focus-visible:ring-2 focus-visible:ring-gold"
            aria-expanded={showFilters}
            aria-controls="filters-panel"
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-gold" aria-label="Filters active" />
            )}
          </button>

          {/* Sort */}
          <div className="relative hidden md:block">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none pl-4 pr-10 py-3 bg-white border-2 border-beige rounded-xl text-forest text-sm font-medium focus:outline-none focus:border-forest-mid transition-colors cursor-pointer"
              aria-label="Sort products"
            >
              <option value="featured">Featured First</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
              <option value="category">By Category</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/50 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Filters Panel */}
        <div
          id="filters-panel"
          className={`${showFilters || "hidden md:block"}`}
          aria-label="Product filters"
        >
          <div className="flex flex-wrap gap-3 mb-6 p-4 bg-white rounded-xl border border-beige">
            {/* Category filter */}
            <div className="relative">
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | "")}
                className="appearance-none pl-3 pr-8 py-2 bg-cream-light border border-beige rounded-lg text-forest text-sm focus:outline-none focus:border-forest-mid transition-colors cursor-pointer"
                aria-label="Filter by category"
              >
                <option value="">All Categories</option>
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-forest/50 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Concern filter */}
            <div className="relative">
              <select
                id="concern-filter"
                value={selectedConcern}
                onChange={(e) => setSelectedConcern(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 bg-cream-light border border-beige rounded-lg text-forest text-sm focus:outline-none focus:border-forest-mid transition-colors cursor-pointer"
                aria-label="Filter by concern"
              >
                <option value="">All Concerns</option>
                {concernOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-forest/50 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Skin type filter */}
            <div className="relative">
              <select
                id="skin-type-filter"
                value={selectedSkinType}
                onChange={(e) => setSelectedSkinType(e.target.value as SkinType | "")}
                className="appearance-none pl-3 pr-8 py-2 bg-cream-light border border-beige rounded-lg text-forest text-sm focus:outline-none focus:border-forest-mid transition-colors cursor-pointer"
                aria-label="Filter by skin type"
              >
                <option value="">All Skin Types</option>
                {skinTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-forest/50 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cream border border-beige text-forest/70 text-sm hover:text-forest hover:border-forest/30 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Clear all filters"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-forest/60 text-sm font-body">
            {filtered.length === 0
              ? "No products found"
              : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
            {hasActiveFilters ? " matching your filters" : ""}
          </p>
        </div>

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20">
            <div className="text-6xl mb-5" aria-hidden="true">🌿</div>
            <h3 className="font-display font-semibold text-forest text-xl mb-3">
              No products found
            </h3>
            <p className="text-forest/60 font-body mb-6">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-forest text-cream rounded-full font-medium hover:bg-forest-mid transition-colors focus-visible:ring-2 focus-visible:ring-gold"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
