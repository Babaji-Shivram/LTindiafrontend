/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    // If Nx or libs:
    "./apps/**/*.{html,ts}",
    "./libs/**/*.{html,ts}"
  ],
  theme: { extend: {} },
  plugins: [],
};