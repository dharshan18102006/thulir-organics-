"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Message is required.";
    if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters.";
    return newErrors;
  };

  const sanitize = (text: string) =>
    text.replace(/[<>]/g, "").trim().slice(0, 1000);

  // Thulir Organics WhatsApp number
  const WHATSAPP_NUMBER = "919585142753";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Sanitize all inputs before use
    const sanitized = {
      name: sanitize(form.name),
      email: sanitize(form.email),
      subject: sanitize(form.subject),
      message: sanitize(form.message),
    };

    // Compose WhatsApp message
    const subjectLine = sanitized.subject
      ? `*Subject:* ${sanitized.subject}\n`
      : "";
    const waMessage = encodeURIComponent(
      `Hi Thulir Organics! 🌿\n\n*Name:* ${sanitized.name}\n*Email:* ${sanitized.email}\n${subjectLine}\n*Message:*\n${sanitized.message}`
    );

    // Open WhatsApp in new tab
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-cream-light">
      {/* Hero */}
      <div
        className="pt-28 pb-14 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #1C3A2B 0%, #2D5A3D 100%)" }}
      >
        <div className="container-brand text-center relative z-10">
          <h1
            className="font-display font-bold text-cream mb-4"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)" }}
          >
            Contact Us
          </h1>
          <p className="text-cream/60 font-body max-w-md mx-auto">
            Questions about our products, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="container-brand py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-5xl mx-auto">
          {/* Left — Contact Info */}
          <div>
            <h2 className="font-display font-semibold text-forest text-2xl mb-6">
              Get in touch
            </h2>

            <div className="space-y-5 mb-10">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: "[ADDRESS], Tamil Nadu, India",
                  href: undefined,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "[PHONE]",
                  href: "tel:[PHONE]",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "[EMAIL]",
                  href: "mailto:[EMAIL]",
                },
                {
                  icon: InstagramIcon,
                  label: "Instagram",
                  value: "@[INSTAGRAM]",
                  href: "https://instagram.com/[INSTAGRAM]",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-forest" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-forest/50 text-xs font-body uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-forest font-body font-medium hover:text-forest-mid transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-forest font-body font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Problem Finder promo */}
            <div className="p-5 rounded-card-lg border border-beige bg-white">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-gold" aria-hidden="true" />
                <p className="font-body font-semibold text-forest text-sm">
                  Looking for a product recommendation?
                </p>
              </div>
              <p className="text-forest/60 text-sm font-body mb-4 leading-relaxed">
                Instead of reaching out to ask which product is right for you, try our free Problem Finder — it matches you with the right Thulir product in under 2 minutes.
              </p>
              <Link
                href="/problem-finder"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest text-cream text-sm font-medium rounded-full hover:bg-forest-mid transition-colors focus-visible:ring-2 focus-visible:ring-gold"
              >
                🌿 Try Problem Finder
              </Link>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-5">
                  <svg viewBox="0 0 24 24" fill="#25D366" className="w-9 h-9" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <h2 className="font-display font-bold text-forest text-2xl mb-3">
                  WhatsApp Opened!
                </h2>
                <p className="text-forest/60 font-body mb-6 leading-relaxed max-w-sm">
                  Your message has been pre-filled in WhatsApp. Just tap Send — and we&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="px-5 py-2.5 border-2 border-forest text-forest font-medium rounded-full hover:bg-forest/5 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="space-y-5"
              >
                <h2 className="font-display font-semibold text-forest text-xl mb-6">
                  Send us a message
                </h2>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-forest/70 text-sm font-body font-medium mb-1.5">
                    Your name <span aria-hidden="true" className="text-earth">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-forest placeholder:text-forest/35 focus:outline-none transition-colors font-body text-sm ${
                      errors.name ? "border-red-400 focus:border-red-500" : "border-beige focus:border-forest-mid"
                    }`}
                    placeholder="Your full name"
                    aria-required="true"
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-600 font-body flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-forest/70 text-sm font-body font-medium mb-1.5">
                    Email address <span aria-hidden="true" className="text-earth">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-forest placeholder:text-forest/35 focus:outline-none transition-colors font-body text-sm ${
                      errors.email ? "border-red-400 focus:border-red-500" : "border-beige focus:border-forest-mid"
                    }`}
                    placeholder="your@email.com"
                    aria-required="true"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-600 font-body flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-forest/70 text-sm font-body font-medium mb-1.5">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-beige rounded-xl text-forest focus:outline-none focus:border-forest-mid transition-colors font-body text-sm"
                  >
                    <option value="">Select a topic</option>
                    <option value="product-enquiry">Product Enquiry</option>
                    <option value="order">Order Question</option>
                    <option value="routine-advice">Routine Advice</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-forest/70 text-sm font-body font-medium mb-1.5">
                    Message <span aria-hidden="true" className="text-earth">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    maxLength={1000}
                    className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-forest placeholder:text-forest/35 focus:outline-none transition-colors font-body text-sm resize-none ${
                      errors.message ? "border-red-400 focus:border-red-500" : "border-beige focus:border-forest-mid"
                    }`}
                    placeholder="Tell us how we can help..."
                    aria-required="true"
                    aria-describedby={errors.message ? "message-error" : "message-hint"}
                    aria-invalid={!!errors.message}
                  />
                  <p id="message-hint" className="text-forest/35 text-xs font-body mt-1">
                    {form.message.length}/1000 characters
                  </p>
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-600 font-body flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Privacy notice */}
                <p className="text-forest/40 text-xs font-body leading-relaxed">
                  We use your information only to respond to your message. We do not store sensitive personal data or share your details with third parties.
                </p>

                {/* Submit */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#1fb05a] transition-all duration-300 hover:shadow-card focus-visible:ring-2 focus-visible:ring-[#25D366]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
