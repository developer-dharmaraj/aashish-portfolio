/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'font-display','font-body',
    'text-accent','text-accent-2','text-muted','text-cream',
    'bg-bg','bg-bg-2','bg-bg-3',
    'border-accent','border-accent-2',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-syne)', 'Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg:     { DEFAULT: '#080808', 2: '#0f0f0f', 3: '#141414' },
        accent: { DEFAULT: '#c8f060', 2: '#ff5c3a' },
        muted:  '#6b6763',
        cream:  '#f0ede8',
      },
      letterSpacing: {
        tighter2: '-0.03em',
        tighter3: '-0.04em',
        widest2:  '0.16em',
      },
      animation: {
        'orb-float':         'orbFloat 8s ease-in-out infinite alternate',
        'orb-float-reverse': 'orbFloat 10s ease-in-out infinite alternate-reverse',
        'blink':             'blink 2s ease-in-out infinite',
        'marquee':           'marquee 25s linear infinite',
      },
      keyframes: {
        orbFloat: {
          from: { transform: 'translateY(0) scale(1)' },
          to:   { transform: 'translateY(-40px) scale(1.05)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.3' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
