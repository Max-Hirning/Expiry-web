import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ["class", 'class'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
  	extend: {
  		fontFamily: {
  			urbanist: [
  				'var(--font-urbanist)',
  				'sans-serif'
  			]
  		},
  		animation: {
  			'spin-slow': 'spin-slow 2s infinite',
  			'spin-infinite': 'spin 1s linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		}
  	}
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        /* 100vh is a fallback for Opera, IE and etc. */
        '.h-full-screen': {
          height: ['100vh', '100dvh'],
        },
        '.min-h-full-screen': {
          minHeight: ['100vh', '100dvh'],
        },
		'.main-position': {
          position: 'fixed',
          right: '0',
          bottom: '0',
		  backgroundColor: 'white',
          height: 'calc(100% - 80px)',
          width: 'calc(100% - 192px)',
        },
		'.header-position': {
          position: 'fixed',
          right: '0',
		  height: '80px',
		  backgroundColor: 'white',
          top: '0',
          width: 'calc(100% - 192px)',
        },
      });
    }),
      require("tailwindcss-animate")
],
};

export default config;
