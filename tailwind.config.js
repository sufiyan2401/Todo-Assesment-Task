/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./app/**/*.{js,jsx,ts,tsx}"],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    // "./src/screens/*.{js,jsx,ts,tsx}",
    // "./src/components/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}

