
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				thulian_pink: {
					DEFAULT: '#e56399',
					100: '#38091d',
					200: '#70133a',
					300: '#a71c56',
					400: '#db2a74',
					500: '#e56399',
					600: '#ea81ad',
					700: '#efa1c1',
					800: '#f4c0d6',
					900: '#fae0ea'
				},
				champagne_pink: {
					DEFAULT: '#e5d4ce',
					100: '#39251e',
					200: '#724a3c',
					300: '#a9705b',
					400: '#c7a294',
					500: '#e5d4ce',
					600: '#eadcd7',
					700: '#efe5e1',
					800: '#f4edeb',
					900: '#faf6f5'
				},
				burnt_sienna: {
					DEFAULT: '#de6e4b',
					100: '#321309',
					200: '#642512',
					300: '#96381c',
					400: '#c84b25',
					500: '#de6e4b',
					600: '#e48a6e',
					700: '#eba792',
					800: '#f2c4b7',
					900: '#f8e2db'
				},
				tiffany_blue: {
					DEFAULT: '#7fd1b9',
					100: '#123128',
					200: '#246350',
					300: '#369478',
					400: '#4ebf9d',
					500: '#7fd1b9',
					600: '#99dac7',
					700: '#b3e3d5',
					800: '#ccede3',
					900: '#e6f6f1'
				},
				wenge: {
					DEFAULT: '#7a6563',
					100: '#181414',
					200: '#302827',
					300: '#483c3b',
					400: '#60504f',
					500: '#7a6563',
					600: '#96817f',
					700: '#b1a19f',
					800: '#cbc0bf',
					900: '#e5e0df'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-out': {
					'0%': { transform: 'translateY(0)', opacity: '1' },
					'100%': { transform: 'translateY(20px)', opacity: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'slide-out': 'slide-out 0.3s ease-out',
				'enter': 'fade-in 0.3s ease-out, scale-in 0.2s ease-out',
				'exit': 'fade-out 0.3s ease-out, scale-out 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite'
			},
			boxShadow: {
				'card-hover': '0 10px 20px rgba(0, 0, 0, 0.1)',
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(135deg, #e56399, #7fd1b9)', // Thulian Pink to Tiffany Blue
				'gradient-accent': 'linear-gradient(135deg, #de6e4b, #e5d4ce)', // Burnt Sienna to Champagne Pink
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
