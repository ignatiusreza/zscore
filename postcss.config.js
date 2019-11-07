const path = require('path');

const src = path.resolve(__dirname, 'app/javascript/**/*.{js,jsx,ts,tsx}');
const views = path.resolve(__dirname, 'app/views/**/*.html.erb');
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [src, views],

  // custom extractor to match tailwind classes
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    require('tailwindcss'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
