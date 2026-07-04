/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fffaf0",
        mist: "#eef3e8",
        sage: "#dce8d2",
        forest: "#173f35",
        leaf: "#3f745d",
        citrus: "#f6b83f",
      },
      fontFamily: {
        display: ["Georgia", "Cambria", '"Times New Roman"', "serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(23, 63, 53, 0.12)",
      },
    },
  },
  plugins: [],
};
