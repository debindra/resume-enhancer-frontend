import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2C9ACE", // Brand Blue
          dark: "#1F6F94",
          light: "#6ABBE3",
          muted: "#E3F2FB"
        },
        accent: {
          DEFAULT: "#FF6347", // Vibrant Orange
          dark: "#CC4F39",
          light: "#FF8566",
          muted: "#FFE5E0"
        },
        secondary: {
          DEFAULT: "#BEDC37", // Brand Green
          dark: "#8AA32A",
          light: "#D8EC7A",
          muted: "#F3F8CF"
        },
        neutral: {
          DEFAULT: "#333333", // Dark Gray
          light: "#666666",
          lighter: "#999999",
          lightest: "#CCCCCC",
          white: "#FFFFFF"
        },
        error: {
          DEFAULT: "#DC2626", // Red-600 - Distinct red for errors
          dark: "#B91C1C",     // Red-700
          light: "#EF4444",   // Red-500
          muted: "#FEE2E2"    // Red-100
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-button': 'pulseButton 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'border-rotate': 'borderRotate 3s linear infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'button-glow': 'buttonGlow 2s ease-in-out infinite',
        'icon-pulse': 'iconPulse 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 127, 255, 0.5), 0 0 10px rgba(0, 127, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 127, 255, 0.8), 0 0 30px rgba(0, 127, 255, 0.5)' },
        },
        pulseButton: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.95', transform: 'scale(1.01)' },
        },
        borderRotate: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        buttonGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 25px rgba(255, 99, 71, 0.5), 0 0 50px rgba(255, 99, 71, 0.3), 0 0 75px rgba(0, 127, 255, 0.2), 0 10px 30px rgba(0, 0, 0, 0.25)',
          },
          '50%': { 
            boxShadow: '0 0 35px rgba(255, 99, 71, 0.7), 0 0 70px rgba(255, 99, 71, 0.4), 0 0 100px rgba(0, 127, 255, 0.3), 0 15px 45px rgba(0, 0, 0, 0.35)',
          },
        },
        iconPulse: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(5deg)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    }
  },
  plugins: []
};

export default config;

