/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "nu-purple": "#4E2A84",
        "nu-purple-light": "#6F4CA5",
        "lab-bg": "#FFFFFF",
        "lab-section": "#F7F6F9",
        "lab-text": "#111111",
        "lab-muted": "#555555",
        "lab-border": "#E5E5E5",
      },
    },
  },
  plugins: [],
};

