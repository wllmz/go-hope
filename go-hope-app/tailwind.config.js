/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Utiliser Poppins pour la police de base
      },
      screens: {
        sm: "640px", // Équivalent de @media (min-width: 640px)
        md: "950px", // Équivalent de @media (min-width: 768px)
        lg: "1024px", // Équivalent de @media (min-width: 1024px)
        xl: "1280px", // Équivalent de @media (min-width: 1280px)
        "2xl": "1536px", // Équivalent de @media (min-width: 1536px)
      },
    },
  },
  plugins: [],
};
