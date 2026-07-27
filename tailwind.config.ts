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
      },
      fontFamily: {
        reader: "var(--reader-font)",
      },
    },
  },
  plugins: [],
} satisfies Config;
