// packages
const { Baker } = require('@datagraphics/baker');

const baker = new Baker({
  assets: 'assets',
  data: '_data',
  domain: 'https://caseymm.github.io/men-who-dont-move/_dist',
  entrypoints: 'scripts/app.js',
  input: process.cwd(),
  layouts: '_layouts',
  output: '_dist',
  pathPrefix: 'men-who-dont-move/' || '/',
});

module.exports = { baker };
