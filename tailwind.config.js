/** @type {import('tailwindcss').Config} */
export default{
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      screens: {
        'xsm': '380px',
        'sm': '640px',
        'xmd':'786px',
        'md': '991px',
        'lg': '1280px',
        'xl': '1440px',
        '2xl': '1536px',
        '3xl': '1600px'
      },
    },
  },
  plugins: [],
}