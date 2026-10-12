import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        xs: ["calc(0.75rem + 3px)", { lineHeight: "calc(1rem + 3px)" }],
        sm: ["calc(0.875rem + 3px)", { lineHeight: "calc(1.25rem + 3px)" }],
        base: ["calc(1rem + 3px)", { lineHeight: "calc(1.5rem + 3px)" }],
        lg: ["calc(1.125rem + 3px)", { lineHeight: "calc(1.75rem + 3px)" }],
        xl: ["calc(1.25rem + 3px)", { lineHeight: "calc(1.75rem + 3px)" }],
        "2xl": ["calc(1.5rem + 3px)", { lineHeight: "calc(2rem + 3px)" }],
        "3xl": ["calc(1.875rem + 3px)", { lineHeight: "calc(2.25rem + 3px)" }],
        "4xl": ["calc(2.25rem + 3px)", { lineHeight: "calc(2.5rem + 3px)" }],
        "5xl": ["calc(3rem + 3px)", { lineHeight: "1" }],
        "6xl": ["calc(3.75rem + 3px)", { lineHeight: "1" }],
        "7xl": ["calc(4.5rem + 3px)", { lineHeight: "1" }],
        "8xl": ["calc(6rem + 3px)", { lineHeight: "1" }],
        "9xl": ["calc(8rem + 3px)", { lineHeight: "1" }],
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        lumex: {
          blue: "hsl(var(--lumex-blue))",
          green: "hsl(var(--lumex-green))",
          gold: "hsl(var(--lumex-gold))",
          dark: "hsl(var(--lumex-dark))",
          light: "hsl(var(--lumex-light))",
        },
        whatsapp: "hsl(var(--whatsapp))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'lumex-sm': 'var(--shadow-sm)',
        'lumex-md': 'var(--shadow-md)',
        'lumex-lg': 'var(--shadow-lg)',
        'lumex-xl': 'var(--shadow-xl)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsla(142, 70%, 49%, 0.4)" },
          "50%": { boxShadow: "0 0 30px hsla(142, 70%, 49%, 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
