/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          light: 'rgba(240, 240, 245, 0.95)',
          dark: 'rgba(30, 30, 35, 0.95)',
        },
      },
    },
  },
  plugins: [],
}
