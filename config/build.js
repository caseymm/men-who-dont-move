// local
const { baker } = require('./core');

async function main() {
  await baker.bake();
}

main().catch(console.error);
