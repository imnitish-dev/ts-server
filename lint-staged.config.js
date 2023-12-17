module.exports = {
  'package.json': ['sort-package-json'],
  '*.{ts,tsx}': ['npm run lint'],
  '*.{ts,tsx}': ['npm run format'],
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json',
};
