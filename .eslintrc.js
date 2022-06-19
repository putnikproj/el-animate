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
  rules: {
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  },
  root: true,
};
