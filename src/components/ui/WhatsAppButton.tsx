"use client";

import { useState, useEffect } from "react";

// Thulir Organics WhatsApp — India number
const WHATSAPP_NUMBER = "919585142753";
const WHATSAPP_DEFAULT_MESSAGE = encodeURIComponent(
  "Hi Thulir Organics! I'd like to know more about your products. 🌿"
);

function WhatsAppIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  // Appear after 2s with a bounce-in entrance
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 2000);
    // Show the "Chat with us" label pill after 3.5s automatically, then hide
    const t2 = setTimeout(() => setShowLabel(true), 3500);
    const t3 = setTimeout(() => setShowLabel(false), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Also show label on hover
  const labelVisible = showLabel || hovered;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MESSAGE}`;

  if (!visible) return null;

  return (
    <>
      {/* Keyframe styles injected inline */}
      <style>{`
        @keyframes wa-bounce-in {
          0%   { opacity: 0; transform: scale(0.3) translateY(40px); }
          60%  { opacity: 1; transform: scale(1.15) translateY(-6px); }
          80%  { transform: scale(0.95) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes wa-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes wa-pulse-outer {
          0%   { transform: scale(1);   opacity: 0.5; }
          70%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes wa-pulse-mid {
          0%   { transform: scale(1);   opacity: 0.35; }
          70%  { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes wa-wiggle {
          0%, 100% { transform: rotate(0deg); }
          20%       { transform: rotate(-12deg); }
          40%       { transform: rotate(12deg); }
          60%       { transform: rotate(-8deg); }
          80%       { transform: rotate(8deg); }
        }
        @keyframes wa-label-in {
          from { opacity: 0; transform: translateX(12px) scale(0.9); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes wa-label-out {
          from { opacity: 1; transform: translateX(0) scale(1); }
          to   { opacity: 0; transform: translateX(12px) scale(0.9); }
        }
      `}</style>

      <div
        className="fixed bottom-6 right-6 z-50 flex items-center justify-end gap-3"
        style={{ animation: "wa-bounce-in 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
      >
        {/* Chat label pill */}
        {labelVisible && (
          <div
            className="px-4 py-2 rounded-full bg-forest text-cream text-sm font-body font-semibold shadow-premium whitespace-nowrap select-none"
            style={{
              animation: `${showLabel && !hovered ? "wa-label-in 0.35s ease forwards" : hovered ? "wa-label-in 0.25s ease forwards" : "wa-label-out 0.3s ease forwards"}`,
              boxShadow: "0 8px 24px rgba(28,58,43,0.3)",
            }}
            role="tooltip"
            id="whatsapp-tooltip"
          >
            💬 Chat with us!
          </div>
        )}

        {/* Button wrapper */}
        <div className="relative flex items-center justify-center">

          {/* Outer slow-pulse ring */}
          <span
            className="absolute inset-0 rounded-full bg-[#25D366]"
            style={{
              animation: "wa-pulse-outer 2.2s ease-out infinite",
              animationDelay: "0s",
            }}
            aria-hidden="true"
          />
          {/* Mid pulse ring */}
          <span
            className="absolute inset-0 rounded-full bg-[#25D366]"
            style={{
              animation: "wa-pulse-mid 2.2s ease-out infinite",
              animationDelay: "0.4s",
            }}
            aria-hidden="true"
          />

          {/* Rotating orbit ring — only shows on hover */}
          {hovered && (
            <span
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: "-6px",
                border: "2px dashed rgba(37,211,102,0.5)",
                borderRadius: "9999px",
                animation: "wa-orbit 3s linear infinite",
              }}
              aria-hidden="true"
            />
          )}

          {/* Main button */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            id="whatsapp-float-btn"
            aria-label="Chat with Thulir Organics on WhatsApp"
            aria-describedby="whatsapp-tooltip"
            className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center focus-visible:ring-4 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #1aad52 100%)",
              boxShadow: hovered
                ? "0 12px 36px rgba(37,211,102,0.55), 0 4px 12px rgba(37,211,102,0.3)"
                : "0 6px 20px rgba(37,211,102,0.4)",
              transform: hovered ? "scale(1.12)" : "scale(1)",
              transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
            }}
            onMouseEnter={() => { setHovered(true); setShowLabel(false); }}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
          >
            <WhatsAppIcon
              className="w-7 h-7 text-white"
              style={{
                animation: hovered ? "wa-wiggle 0.6s ease" : "none",
              } as React.CSSProperties}
            />
          </a>
        </div>
      </div>
    </>
  );
}
