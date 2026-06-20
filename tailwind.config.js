/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050403",
        charcoal: "#11100e",
        smoke: "#d8cfbf",
        gold: "#d9a441",
        champagne: "#f6dfaa",
        burgundy: "#4b1019",
        mahogany: "#2a130c",
        copper: "#b96f3d"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(217, 164, 65, 0.28)",
        burgundy: "0 18px 70px rgba(75, 16, 25, 0.38)"
      },
      backgroundImage: {
        "liquid-gold": "radial-gradient(circle at 20% 20%, rgba(217,164,65,.18), transparent 28%), linear-gradient(135deg, #050403 0%, #1a0c07 55%, #4b1019 100%)"
      }
    }
  },
  plugins: []
};
