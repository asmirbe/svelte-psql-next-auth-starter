import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...fontFamily.sans],
				// mono: ['Victor Mono', ...tailwind_theme.fontFamily.mono],
				// or name them
				// 'victor-mono': ['Victor Mono'],
				// poppins: ['Poppins'],
			},
		},
	},

	plugins: [],
};
