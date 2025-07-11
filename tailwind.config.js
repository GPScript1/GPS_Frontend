/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        'mono': ['var(--font-montserrat)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      colors: {
        'insecap': {
          'primary': '#485CC7',      // PANTON 2726 C
          'secondary': '#00B8DE',    // Cian corporativo
          'primary-dark': '#3a4ba5', // Versión más oscura
          'secondary-dark': '#0097b8', // Versión más oscura
        }
      }
    },
  },
  plugins: [],
}
