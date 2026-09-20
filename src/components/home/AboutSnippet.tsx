import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function AboutSnippet() {
  return (
    <section
      aria-labelledby="about-snippet-heading"
      className="section bg-cream-light"
    >
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Visual side */}
          <div className="relative order-2 lg:order-1">
            {/* Large botanical shape */}
            <div
              className="relative w-full rounded-card-xl overflow-hidden"
              style={{ aspectRatio: "4/3" }}
              aria-hidden="true"
            >
              <div
                className="w-full h-full flex flex-col items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #1C3A2B 0%, #2D5A3D 60%, #3D7A52 100%)",
                }}
              >
                {/* Large decorative leaf SVG */}
                <svg
                  className="w-48 h-48 text-cream/20 animate-leaf-sway"
                  viewBox="0 0 200 200"
                  fill="currentColor"
                >
                  <path d="M100 10 C140 30, 180 80, 160 130 C140 180, 60 190, 40 150 C20 110, 50 40, 100 10 Z" />
                </svg>
                <p className="text-cream/40 text-sm font-body mt-4 text-center px-8">
                  [Brand photography will be placed here]
                </p>
              </div>

              {/* Floating info card */}
              <div className="absolute bottom-5 left-5 right-5 glass p-4 rounded-xl border border-cream/60">
                <div className="flex items-center gap-2 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-forest" aria-hidden="true" />
                  <span className="text-forest text-xs font-body font-medium">
                    Tamil Nadu, India
                  </span>
                </div>
                <p className="text-forest/60 text-xs font-body">
                  A Tamil Nadu-based organic personal-care brand rooted in botanical tradition.
                </p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            <p className="text-forest/50 text-sm font-medium uppercase tracking-widest font-body mb-4">
              Our story
            </p>

            <h2
              id="about-snippet-heading"
              className="text-display-md font-display font-bold text-forest mb-5"
            >
              Nature was never
              <br />
              the problem.
              <br />
              <span className="italic text-forest-pale">Convenience was.</span>
            </h2>

            <div className="space-y-4 text-forest/65 font-body leading-relaxed mb-8">
              <p>
                Thulir Organics was born from a simple idea: the ingredients
                that nature provides are genuinely good for skin and hair — but
                sourcing them, preparing them, and using them every single day
                isn&apos;t always practical for a modern life.
              </p>
              <p>
                So we took that goodness and made it convenient. Each Thulir
                product is built around natural, traditional, and botanically
                inspired ingredients — and designed to be easy enough to
                actually use every day.
              </p>
              <p className="font-medium text-forest/80">
                [COMPANY STORY — to be updated with the actual Thulir Organics story]
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-forest font-semibold font-body hover:text-forest-mid transition-colors group focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              Discover Our Story
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
