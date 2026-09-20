import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Leaf, Heart, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Thulir Organics — a Tamil Nadu-based organic personal-care brand bringing botanical skincare, haircare and wellness into modern everyday routines.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-light">
      {/* Hero */}
      <div
        className="pt-28 pb-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #122519 0%, #1C3A2B 60%, #2D5A3D 100%)",
        }}
      >
        {/* Decorative botanical */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute -top-10 -right-10 w-72 h-72 text-forest-light opacity-15 animate-leaf-sway" viewBox="0 0 200 200" fill="currentColor">
            <path d="M100 10 C140 30, 180 80, 160 130 C140 180, 60 190, 40 150 C20 110, 50 40, 100 10 Z" />
          </svg>
          <svg className="absolute bottom-0 left-10 w-48 h-48 text-gold opacity-5" viewBox="0 0 200 200" fill="currentColor">
            <circle cx="100" cy="100" r="90" />
          </svg>
        </div>

        <div className="container-brand relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 mb-6">
            <Leaf className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
            <span className="text-gold text-xs font-medium uppercase tracking-wider font-body">
              Our Story
            </span>
          </div>
          <h1 className="font-display font-bold text-cream mb-5 leading-tight"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}>
            About Thulir Organics
          </h1>
          <p className="text-cream/60 font-body max-w-lg mx-auto leading-relaxed">
            A Tamil Nadu-based organic personal-care brand rooted in botanical tradition and built for modern everyday life.
          </p>
        </div>
      </div>

      {/* Brand Introduction */}
      <section aria-labelledby="brand-intro-heading" className="section bg-cream-light">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Visual */}
            <div
              className="relative rounded-card-xl overflow-hidden shadow-premium"
              style={{ aspectRatio: "4/3" }}
              aria-hidden="true"
            >
              <div
                className="w-full h-full flex flex-col items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1C3A2B 0%, #3D7A52 100%)" }}
              >
                <svg className="w-40 h-40 text-cream/20 animate-leaf-sway" viewBox="0 0 200 200" fill="currentColor">
                  <path d="M100 10 C140 30, 180 80, 160 130 C140 180, 60 190, 40 150 C20 110, 50 40, 100 10 Z" />
                </svg>
                <p className="text-cream/30 text-xs font-body mt-4 text-center px-8">[Brand photography placeholder]</p>
              </div>
              {/* Location card */}
              <div className="absolute bottom-5 left-5 right-5 glass p-3 rounded-xl border border-cream/50">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-forest" aria-hidden="true" />
                  <span className="text-forest text-xs font-body font-medium">[BRAND LOCATION], Tamil Nadu, India</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <h2 id="brand-intro-heading" className="text-display-md font-display font-bold text-forest mb-6">
                Nature was never the problem.
                <br />
                <span className="italic text-forest-pale">Convenience was.</span>
              </h2>
              <div className="space-y-4 text-forest/65 font-body leading-relaxed">
                <p>
                  Thulir Organics was founded on a simple but powerful idea: the ingredients that nature has always provided are genuinely good for skin, hair and wellness. The problem was never with nature itself — it was with how difficult it can be to source natural ingredients, prepare them correctly, and use them consistently in a busy modern life.
                </p>
                <p>
                  So we set out to change that. Every Thulir Organics product brings together botanical, Ayurvedic, and traditional South Indian ingredients — and packages them into convenient, easy-to-use formats designed for real everyday routines.
                </p>
                <p className="font-medium text-forest border-l-4 border-gold pl-4 py-1">
                  [COMPANY STORY — Replace this with the actual Thulir Organics founding story]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section
        aria-labelledby="founder-heading"
        className="section"
        style={{ background: "linear-gradient(135deg, #F5F0E8 0%, #EDE6D8 100%)" }}
      >
        <div className="container-brand">
          <div className="max-w-3xl mx-auto">
            <p className="text-forest/50 text-sm font-medium uppercase tracking-widest font-body mb-3 text-center">
              The founder
            </p>
            <h2 id="founder-heading" className="text-display-md font-display font-bold text-forest mb-8 text-center">
              Behind Thulir
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Founder image placeholder */}
              <div
                className="rounded-card-xl overflow-hidden aspect-square shadow-card"
                aria-label="Founder photograph placeholder"
              >
                <div
                  className="w-full h-full flex flex-col items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #E8DFD0, #D4C9B5)" }}
                >
                  <span className="text-5xl" aria-hidden="true">🌿</span>
                  <p className="text-earth/60 text-xs font-body mt-3 text-center px-4">[Founder photograph]</p>
                </div>
              </div>

              {/* Founder story */}
              <div className="md:col-span-2 space-y-4 text-forest/65 font-body leading-relaxed">
                <h3 className="font-display font-bold text-forest text-xl">[OWNER NAME]</h3>
                <p className="italic text-forest/50 text-sm">Founder, Thulir Organics</p>
                <div className="space-y-3">
                  <p>[FOUNDER STORY — Replace with the actual founder&apos;s story, background, and motivation for starting Thulir Organics.]</p>
                  <p>This section should describe:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-forest/60 ml-2">
                    <li>The founder&apos;s personal journey with natural ingredients</li>
                    <li>What inspired them to start Thulir Organics</li>
                    <li>Their connection to Tamil Nadu and traditional wellness</li>
                    <li>Their vision for making natural care accessible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section
        aria-labelledby="philosophy-heading"
        className="section"
        style={{ background: "linear-gradient(135deg, #1C3A2B 0%, #2D5A3D 100%)" }}
      >
        <div className="container-brand">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8" aria-hidden="true">
              <div className="h-px flex-1 bg-gold/30" />
              <div className="text-gold text-xl">✦</div>
              <div className="h-px flex-1 bg-gold/30" />
            </div>
            <h2 id="philosophy-heading" className="font-display font-bold text-cream mb-6"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              Our Philosophy
            </h2>
            <blockquote className="font-display italic text-cream/80 leading-relaxed mb-8"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>
              &ldquo;Raw ingredients can be beautiful. But finding them, preparing them and using them every day isn&apos;t always easy. Thulir Organics brings nature closer to your everyday routine.&rdquo;
            </blockquote>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-left">
              {[
                { icon: "🌿", label: "Nature", desc: "Every product is built around botanical, traditional, and Ayurvedic ingredients." },
                { icon: "⚡", label: "Convenience", desc: "Natural ingredients in formats that are practical to use every single day." },
                { icon: "✨", label: "Modern Lifestyle", desc: "Designed for the modern Indian — busy, informed, and nature-aware." },
              ].map((item) => (
                <div key={item.label} className="p-5 rounded-xl bg-cream/5 border border-cream/10">
                  <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
                  <h3 className="font-display font-semibold text-cream text-lg mb-2">{item.label}</h3>
                  <p className="text-cream/60 text-sm font-body leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three Focus Areas */}
      <section aria-labelledby="focus-areas-heading" className="section bg-cream-light">
        <div className="container-brand">
          <div className="text-center mb-12">
            <h2 id="focus-areas-heading" className="text-display-md font-display font-bold text-forest">
              What we focus on
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "✨",
                title: "Skincare",
                color: "from-forest-mid/80 to-forest-dark/90",
                points: [
                  "Face packs using traditional ingredients like Nalangu Maavu and Multani Mitti",
                  "Botanical serums featuring papaya, orange, manjishta and sangupoo",
                  "Oils and creams inspired by Ayurvedic formulations like Kumkumadi",
                  "Soaps made with traditional herbs like Ulundhu, Neem and Kuppaimeni",
                ],
              },
              {
                emoji: "🌾",
                title: "Haircare",
                color: "from-earth/80 to-earth-dark/90",
                points: [
                  "Shikakai Powder — a traditional South Indian hair cleansing ritual",
                  "Botanical Hair Oil for scalp and hair nourishment",
                  "Hair Pack for deep conditioning as part of a weekly routine",
                  "Natural Hair Dye for those seeking a plant-based colouring option",
                ],
              },
              {
                emoji: "🌸",
                title: "Wellness",
                color: "from-forest/80 to-forest-dark/90",
                points: [
                  "Rosewater — a versatile everyday essential for skin and mixing",
                  "Beetroot & Strawberry Lip Balm for natural lip care",
                  "Natural Waxing Powder for hands and legs",
                  "Aloe Vera Gel — a multi-use botanical for everyday skin care",
                ],
              },
            ].map((area) => (
              <div
                key={area.title}
                className="relative overflow-hidden rounded-card-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${area.color}`} />
                <div className="relative z-10 p-7">
                  <div className="text-4xl mb-4" aria-hidden="true">{area.emoji}</div>
                  <h3 className="font-display font-bold text-cream text-xl mb-4">{area.title}</h3>
                  <ul className="space-y-2">
                    {area.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" aria-hidden="true" />
                        <p className="text-cream/70 text-sm font-body leading-snug">{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Philosophy */}
      <section
        aria-labelledby="quality-heading"
        className="section"
        style={{ background: "linear-gradient(180deg, #F5F0E8 0%, #EDE6D8 100%)" }}
      >
        <div className="container-brand max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 id="quality-heading" className="text-display-md font-display font-bold text-forest">
              Our quality philosophy
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: <Leaf className="w-5 h-5" />, title: "Ingredient Transparency", desc: "We believe you should know what goes on your skin and hair. Every Thulir product is built around ingredients we can name and explain." },
              { icon: <Heart className="w-5 h-5" />, title: "Gentle Formulations", desc: "Our products are designed to be used regularly as part of a routine, not as harsh treatments. We prioritise everyday comfort." },
              { icon: <Star className="w-5 h-5" />, title: "Traditional Roots", desc: "Many of our ingredients have been used in South Indian households for generations. We respect that heritage." },
              { icon: <Leaf className="w-5 h-5" />, title: "No Unsupported Claims", desc: "We don't make medical claims. Our products are for personal care and cosmetic use — and we're clear about that." },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-card-lg border border-beige">
                <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center mb-4 text-forest">
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-forest text-base mb-2">{item.title}</h3>
                <p className="text-forest/60 text-sm font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section aria-labelledby="vision-heading" className="section bg-cream-light">
        <div className="container-brand max-w-2xl mx-auto text-center">
          <h2 id="vision-heading" className="text-display-md font-display font-bold text-forest mb-5">
            Where we&apos;re going
          </h2>
          <p className="text-forest/65 font-body leading-relaxed mb-6">
            [FUTURE VISION — Replace with the brand&apos;s actual vision for growth, new products, partnerships, or community initiatives.]
          </p>
          <p className="text-forest/65 font-body leading-relaxed">
            Thulir Organics is built to grow. Our product architecture is designed to scale, and our commitment to nature-inspired, convenient personal care stays constant as we expand.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        aria-labelledby="about-cta-heading"
        className="section"
        style={{ background: "linear-gradient(135deg, #1C3A2B, #2D5A3D)" }}
      >
        <div className="container-brand text-center">
          <h2 id="about-cta-heading" className="font-display font-bold text-cream mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Get in touch
          </h2>
          <p className="text-cream/60 font-body mb-8 max-w-md mx-auto">
            Have questions about Thulir Organics? We&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-forest font-semibold rounded-full hover:bg-gold-light transition-all hover:-translate-y-0.5 hover:shadow-premium focus-visible:ring-2 focus-visible:ring-cream"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-cream/40 text-cream font-medium rounded-full hover:border-cream/70 hover:bg-cream/10 transition-all focus-visible:ring-2 focus-visible:ring-gold"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
