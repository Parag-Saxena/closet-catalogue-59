
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				closet: {
					blue: '#26547c', // Updated from #1c3d5a to yinmn_blue
					teal: '#06d6a0', // Updated from #00796b to emerald
					gold: '#ffd166', // Updated from #ffb400 to sunglow
					coral: '#ef476f', // Updated from #ff6f61 to bright_pink
					gray: {
						light: '#fcfcfc', // Updated from #f5f5f5 to white
						medium: '#979797', // Updated from #8A898C to white.300
						dark: '#323232'  // Updated from #333333 to white.100
					}
				},
				yinmn_blue: {
					DEFAULT: '#26547c',
					100: '#081119',
					200: '#0f2232',
					300: '#17334b',
					400: '#1f4464',
					500: '#26547c',
					600: '#3778b2',
					700: '#609bce',
					800: '#95bcde',
					900: '#cadeef'
				},
				bright_pink: {
					DEFAULT: '#ef476f',
					100: '#390511',
					200: '#720a22',
					300: '#ac0f34',
					400: '#e51445',
					500: '#ef476f',
					600: '#f26d8c',
					700: '#f591a9',
					800: '#f9b6c5',
					900: '#fcdae2'
				},
				sunglow: {
					DEFAULT: '#ffd166',
					100: '#473200',
					200: '#8f6400',
					300: '#d69600',
					400: '#ffbc1f',
					500: '#ffd166',
					600: '#ffda85',
					700: '#ffe3a3',
					800: '#ffedc2',
					900: '#fff6e0'
				},
				emerald: {
					DEFAULT: '#06d6a0',
					100: '#012b20',
					200: '#02563f',
					300: '#03805f',
					400: '#04ab7f',
					500: '#06d6a0',
					600: '#1cf9be',
					700: '#55fbce',
					800: '#8efcdf',
					900: '#c6feef'
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
				'gradient-primary': 'linear-gradient(135deg, #26547c, #06d6a0)', // Updated from #1c3d5a, #00796b to yinmn_blue, emerald
				'gradient-accent': 'linear-gradient(135deg, #ef476f, #ffd166)', // Updated from #ff6f61, #ffb400 to bright_pink, sunglow
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
