const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        bangers: ['Bangers', 'serif'],
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

