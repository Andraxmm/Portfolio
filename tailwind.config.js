/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6366F1", // indigo-500
          dark: "#4F46E5"     // indigo-600
        }
      },
      // 👇 añade las familias para usar font-sans y font-display
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial'],
        display: ['Outfit', 'Inter', 'ui-sans-serif']
      },
      // (opcional) por si usas rounded-2xl = 16px en todo
      borderRadius: {
        '2xl': '16px'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')],

}
