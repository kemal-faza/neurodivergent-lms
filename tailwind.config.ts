import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens driven by CSS variables (see globals.css).
        // Use these so theme switching (contrast modes) just works.
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-fg": "var(--accent-fg)",
        card: "var(--card)",
        border: "var(--border)",
        // Profile accent colors (calm pastel, not harsh)
        "profile-dyslexia": "#fffbeb",
        "profile-dyslexia-border": "#fde68a",
        "profile-adhd": "#fff7ed",
        "profile-adhd-border": "#fed7aa",
        "profile-umum": "#f0fdf4",
        "profile-umum-border": "#bbf7d0",
      },
      fontFamily: {
        reader: "var(--reader-font)",
        // Lexend already loaded via next/font as --font-lexend;
        // body uses font-sans which resolves to Lexend via globals.css.
        // Add explicit lexend family for hero/headline overrides.
        lexend: ["var(--font-lexend)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "card-lift": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-2px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out forwards",
        "card-lift": "card-lift 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
