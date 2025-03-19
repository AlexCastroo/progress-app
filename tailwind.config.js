import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx',
        "./resources/js/theme/**/*.js",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: "#B497D6",
                secondary: "#05204A",
                background: "#E1E2EF",
                textPrimary: "#02020A",
                textSecondary: "#05204A",
                dark: {
                    primary: "#05204A",
                    secondary: "#B497D6",
                    background: "#02020A",
                    textPrimary: "#E1E2EF",
                    textSecondary: "#BFACAA",
                },
            },
        },
    },
    plugins: [],
};
