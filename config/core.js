// packages
const { Baker } = require('@datagraphics/baker');

const baker = new Baker({
  assets: 'assets',
  data: '_data',
  domain: 'https://github.com/caseymm/men-who-dont-move/',
  entrypoints: 'scripts/app.js',
  input: process.cwd(),
  layouts: '_layouts',
  output: '_dist',
  pathPrefix: process.env.DELIVERY_BASE_PATH || '/',
});

module.exports = { baker };
