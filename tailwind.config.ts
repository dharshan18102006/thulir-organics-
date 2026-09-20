import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1C3A2B",
          dark: "#122519",
          mid: "#2D5A3D",
          light: "#3D7A52",
          pale: "#6A9E7A",
        },
        cream: {
          DEFAULT: "#F5F0E8",
          light: "#FAFAF7",
          dark: "#EDE6D8",
        },
        earth: {
          DEFAULT: "#6B4C2A",
          light: "#8B6540",
          dark: "#4A3319",
        },
        beige: {
          DEFAULT: "#E8DFD0",
          dark: "#D4C9B5",
        },
        gold: {
          DEFAULT: "#C9A96E",
          light: "#DFC08A",
          dark: "#A88848",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.1" }],
        "display-xl": ["clamp(2rem, 5vw, 3.75rem)", { lineHeight: "1.1" }],
        "display-lg": ["clamp(1.75rem, 4vw, 3rem)", { lineHeight: "1.15" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2" }],
      },
      spacing: {
        "section": "5rem",
        "section-sm": "3rem",
      },
      borderRadius: {
        "card": "1rem",
        "card-lg": "1.5rem",
        "card-xl": "2rem",
      },
      boxShadow: {
        "card": "0 4px 24px -4px rgba(28, 58, 43, 0.12)",
        "card-hover": "0 12px 40px -8px rgba(28, 58, 43, 0.22)",
        "premium": "0 24px 64px -12px rgba(28, 58, 43, 0.2)",
        "glass": "0 8px 32px 0 rgba(28, 58, 43, 0.1)",
      },
      backgroundImage: {
        "forest-gradient": "linear-gradient(135deg, #1C3A2B 0%, #2D5A3D 50%, #3D7A52 100%)",
        "cream-gradient": "linear-gradient(180deg, #FAFAF7 0%, #F5F0E8 100%)",
        "hero-gradient": "linear-gradient(180deg, rgba(18, 37, 25, 0.75) 0%, rgba(28, 58, 43, 0.4) 60%, transparent 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,240,232,0.8) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "leaf-sway": "leafSway 6s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        leafSway: {
          "0%, 100%": { transform: "rotate(-3deg) translateY(0px)" },
          "50%": { transform: "rotate(3deg) translateY(-8px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
};

export default config;
