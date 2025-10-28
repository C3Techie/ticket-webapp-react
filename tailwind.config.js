// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
      screens: {
        DEFAULT: '100%',
        xl: '1440px',
      },
    },
    extend: {
      colors: {
        accent: "var(--color-accent)",
        "accent-light": "var(--color-accent-light)",
        "accent-dark": "var(--color-accent-dark)",
        "bg-primary": "var(--color-bg-primary)",
        "bg-card": "var(--color-bg-card)",
        "bg-hover": "var(--color-bg-hover)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        "status-open": "var(--status-open)",
        "status-in-progress": "var(--status-in-progress)",
        "status-closed": "var(--status-closed)",
        "color-border": "var(--color-border)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        xl: "var(--shadow-xl)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        xl: "var(--radius-xl)",
      },
    },
  },
  plugins: [],
}