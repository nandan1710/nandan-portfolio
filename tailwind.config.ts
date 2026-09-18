import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          DEFAULT: "var(--surface)",
          muted: "var(--surface-muted)",
          border: "var(--surface-border)",
        },
        brand: {
          cyan: "#aed9e0",
          mint: "#b8f2e6",
          darkMint: "#5e9ca8",
          charcoal: "#1c1c1c",
          slate: "#5e6472",
          deep: "#121316",
        },
        circuit: {
          node: "#00f0ff",
          trace: "#1e3a5f",
          active: "#10b981",
          signal: "#f59e0b",
        }
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'signal-flow': 'signal-flow 2s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(174, 217, 224, 0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 16px rgba(184, 242, 230, 0.8))' },
        },
        'signal-flow': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
