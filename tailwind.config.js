/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Inter",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow:
          "0 0 25px rgba(99, 102, 241, 0.45), 0 0 50px rgba(236, 72, 153, 0.35)",
        soft:
          "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(1200px 600px at 50% -20%, rgba(99,102,241,0.35), transparent), radial-gradient(1000px 500px at 100% 0%, rgba(236,72,153,0.25), transparent)",
        "hero-gradient":
          "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.85))",
      },
      colors: {
        netflixRed: "#E50914",
        netflixDark: "#141414",
        netflixGray: "#333333",
        netflixLightGray: "#BBBBBB",
      },
      transitionTimingFunction: {
        'ease-netflix': 'cubic-bezier(0.86, 0, 0.07, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-10px)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out forwards',
        slideUp: 'slideUp 0.3s ease-in forwards',
      },
    },
  },
  plugins: [],
};
