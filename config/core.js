// packages
const { Baker } = require('@datagraphics/baker');

const baker = new Baker({
  assets: 'assets',
  data: '_data',
  domain: 'https://github.com/caseymm/men-who-dont-move/_dist',
  entrypoints: 'scripts/app.js',
  input: process.cwd(),
  layouts: '_layouts',
  output: '_dist',
  pathPrefix: 'caseymm/men-who-dont-move/_dist' || '/',
});

module.exports = { baker };
