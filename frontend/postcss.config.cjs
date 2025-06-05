// postcss.config.cjs
module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(), // ✅ New plugin for Tailwind v4+
    require('autoprefixer'),
  ],
};
