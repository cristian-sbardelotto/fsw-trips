/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        primary: '#590BD8',
        'primary-dark': '#312A4F',
        'primary-light': '#DDD5EA',
        'gray-primary': '#717171',
        'gray-light': '#BBBFBF',
      },

      textColor: {
        dark: '#717171',
      },
    },
  },
  plugins: [],
};
