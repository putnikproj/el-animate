module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'no-underscore-dangle': 0,
    'prettier/prettier': 2,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  },
  root: true,
};
