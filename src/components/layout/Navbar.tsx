"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Leaf, Search } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/problem-finder", label: "Problem Finder", highlight: true },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu and search on route change
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isHome = pathname === "/";

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled || !isHome
          ? "bg-cream-light/95 backdrop-blur-md shadow-card border-b border-beige"
          : "bg-transparent"
      }`}
    >
      <div className="container-brand">
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between h-16 md:h-20"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Thulir Organics — Home"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
                scrolled || !isHome
                  ? "bg-forest text-cream"
                  : "bg-cream/20 text-cream backdrop-blur-sm border border-cream/30"
              }`}
            >
              <Leaf className="w-4.5 h-4.5" aria-hidden="true" />
            </div>
            <span
              className={`font-display font-black tracking-widest text-base transition-colors duration-300`}
              style={{ letterSpacing: "0.18em" }}
            >
              <span className={scrolled || !isHome ? "text-forest" : "text-cream"}>THULIR </span>
              <span className="text-gold">ORGANICS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              if (link.highlight) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="ml-2 px-4 py-2 rounded-full bg-forest text-cream text-sm font-medium hover:bg-forest-mid transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold ${
                    isActive
                      ? scrolled || !isHome
                        ? "text-forest bg-beige"
                        : "text-cream bg-cream/20"
                      : scrolled || !isHome
                      ? "text-forest/80 hover:text-forest hover:bg-beige/60"
                      : "text-cream/85 hover:text-cream hover:bg-cream/15"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              id="navbar-search-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2.5 rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold ${
                scrolled || !isHome
                  ? "text-forest/70 hover:text-forest hover:bg-beige/60"
                  : "text-cream/80 hover:text-cream hover:bg-cream/15"
              }`}
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-btn"
              className={`md:hidden p-2.5 rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-gold ${
                scrolled || !isHome
                  ? "text-forest/70 hover:text-forest hover:bg-beige/60"
                  : "text-cream/80 hover:text-cream hover:bg-cream/15"
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4 animate-fade-in">
            <form onSubmit={handleSearchSubmit} role="search">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40"
                  aria-hidden="true"
                />
                <input
                  ref={searchRef}
                  id="navbar-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products — Nalangu Maavu, Shikakai..."
                  className="w-full pl-11 pr-4 py-3 bg-white border-2 border-beige rounded-xl text-forest placeholder:text-forest/40 focus:outline-none focus:border-forest-mid transition-colors text-sm"
                  aria-label="Search products"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-forest text-cream text-sm rounded-lg hover:bg-forest-mid transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation menu"
          aria-modal="true"
          className="md:hidden bg-cream-light border-t border-beige animate-fade-in"
        >
          <nav className="container-brand py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              if (link.highlight) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-full px-4 py-3 rounded-xl bg-forest text-cream font-medium text-center transition-colors hover:bg-forest-mid focus-visible:ring-2 focus-visible:ring-gold"
                    aria-current={isActive ? "page" : undefined}
                  >
                    🌿 {link.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl font-medium text-sm transition-colors focus-visible:ring-2 focus-visible:ring-gold ${
                    isActive
                      ? "bg-beige text-forest font-semibold"
                      : "text-forest/80 hover:bg-beige/50 hover:text-forest"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
