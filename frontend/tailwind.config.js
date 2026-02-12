/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        olx: {
          teal: "#23e5db",
          dark: "#002f34",
        },
      },
    },
  },
  plugins: [],
};
