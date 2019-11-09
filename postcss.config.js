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
    require('tailwindcss'),
    require('postcss-preset-env')({
      stage: 2,
      autoprefixer: {
        flexbox: 'no-2009',
      },
      features: {
        'nesting-rules': true,
      },
    }),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
