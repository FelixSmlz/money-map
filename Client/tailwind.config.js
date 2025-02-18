/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideUpFade: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px) scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        warning: {
          "0%, 100%": { transform: "scale(1)" },
          "10%": { transform: "scale(0.9)" },
          "30%": { transform: "scale(1.1)" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-out forwards",
        slideUpFade: "slideUpFade 0.2s ease-out forwards",
        warning: "warning 2s ease-in-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      colors: {
        bg_black: "#1A1B1C",
        white: "#FFFFFF",
        red: "#FF0051",
        purple: "#C56EFF",
        my_gray: "#7E7E7E",
        light_gray: "#7e7e7e6f",
        turkois: "#80D9FF",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
      boxShadow: {
        card: "rgba(0, 0, 0, 0.3) 0 1px 3px",
      },
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.5rem",
      xl: "3rem",
    },
  },
  plugins: [],
};
