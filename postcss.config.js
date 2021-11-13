const purgecss = require("@fullhuman/postcss-purgecss")({
    content: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx", "./src/**/*.css"],

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[\w-/:\\.]+(?<!:)/g) || []
});

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require("postcss-preset-env"),
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
    ]
};
