/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "../../../libs/vue-ui/src/**/*.{vue,js,ts,jsx,tsx}",
    "../../../libs/styles/src/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        'primary-warm': 'var(--color-primary-warm)',
        'primary-warm-to': 'var(--color-primary-warm-to)',
        'primary-cool': 'var(--color-primary-cool)',
        'primary-cool-to': 'var(--color-primary-cool-to)',
        'secondary': '#6C757D',
        'danger': 'var(--color-danger)',
        'light': 'var(--color-light)',
        'dark-primary': 'var(--color-dark-primary)',
        'dark-secondary': 'var(--color-dark-secondary)',
        'dark-muted': 'var(--color-dark-muted)',
        'light-gray': 'var(--color-light-gray)',
        'danger-light': 'var(--color-danger-light)',
        'white': 'var(--color-white)',
      },
      fontFamily: {
        'sans': ['var(--font-sans)', 'sans-serif'],
      },
      animation: {
        'move-stripes': 'var(--animate-move-stripes)',
        'shake': 'var(--animate-shake)',
      },
      keyframes: {
        'move-stripes': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      grayscale: {
        '25': '25%',
      },
    },
  },
  plugins: [],
}
