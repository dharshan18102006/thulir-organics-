import Link from "next/link";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { CATEGORY_LABELS, Category } from "@/data/products";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const categories: Category[] = [
  "SKINCARE",
  "FACE_SERUMS",
  "OILS",
  "HAIRCARE",
  "ROSEWATER",
  "LIPCARE",
  "FACE_GELS",
  "SOAPS",
  "CREAMS_CLEANSERS",
  "BODYCARE",
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-forest text-cream/80"
      aria-label="Site footer"
    >
      {/* Main Footer */}
      <div className="container-brand py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-4 group w-fit"
              aria-label="Thulir Organics — Home"
            >
              <div className="w-9 h-9 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center">
                <Leaf className="w-4.5 h-4.5 text-gold" aria-hidden="true" />
              </div>
              <span className="font-display font-black text-base tracking-widest" style={{ letterSpacing: "0.18em" }}>
                <span className="text-cream">THULIR </span>
                <span className="text-gold">ORGANICS</span>
              </span>
            </Link>
            <p className="text-cream/60 text-sm leading-relaxed mb-6">
              Nature was never the problem. Convenience was. We bring natural goodness into your everyday routine.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/[INSTAGRAM]"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center hover:bg-cream/20 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Thulir Organics on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:[EMAIL]"
                className="w-9 h-9 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center hover:bg-cream/20 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Email Thulir Organics"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-semibold text-cream text-sm tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5" role="list">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/products", label: "All Products" },
                { href: "/problem-finder", label: "Problem Finder" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-display font-semibold text-cream text-sm tracking-wider uppercase mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5" role="list">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${cat}`}
                    className="text-sm text-cream/60 hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {CATEGORY_LABELS[cat]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-cream text-sm tracking-wider uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-3" role="list">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-sm text-cream/60">
                  [ADDRESS]<br />
                  Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                <a
                  href="tel:[PHONE]"
                  className="text-sm text-cream/60 hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  [PHONE]
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                <a
                  href="mailto:[EMAIL]"
                  className="text-sm text-cream/60 hover:text-cream transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  [EMAIL]
                </a>
              </li>
            </ul>

            {/* Problem Finder CTA */}
            <div className="mt-6 p-4 rounded-xl bg-cream/5 border border-cream/10">
              <p className="text-xs text-cream/50 mb-2">Not sure what to choose?</p>
              <Link
                href="/problem-finder"
                className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-light font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded"
              >
                🌿 Use Problem Finder
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-cream/10">
        <div className="container-brand py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40">
            <p>© {new Date().getFullYear()} Thulir Organics. All rights reserved.</p>
            <div className="flex items-center gap-5 flex-wrap justify-center">
              <Link href="/privacy" className="hover:text-cream/70 transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-cream/70 transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded">
                Terms of Use
              </Link>
              <Link href="/disclaimer" className="hover:text-cream/70 transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded">
                Disclaimer
              </Link>
            </div>
            <p className="text-cream/30 text-center md:text-right">
              All products are for cosmetic/personal-care use only. Not intended to diagnose, treat, or cure any condition.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
