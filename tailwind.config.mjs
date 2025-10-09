/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                "dark-space": "#222831",
                "dark-slate": "#31363F",
                accent: "#76ABAE",
                "light-text": "#EEEEEE",
            },
        },
    },
    plugins: [],
};
