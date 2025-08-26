/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b0b",
        surface: "#111111",
        brand: "#d4af37",
        accent: "#f1c40f"
      },
      boxShadow: {
        soft: "0 8px 20px rgba(0,0,0,0.3)"
      },
      borderRadius: {
        xl2: "1rem"
      }
    }
  },
  plugins: [],
};
