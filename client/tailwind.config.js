/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('https://img.freepik.com/free-vector/white-monochrome-background-gradient_23-2149000736.jpg')",
      },
    },
  },
  plugins: [],
}

