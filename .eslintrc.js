const jsRules = {
  'no-underscore-dangle': 0,
  'import/prefer-default-export': 0,
  'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }],
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: ['airbnb-base', 'prettier'],
  rules: jsRules,
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
      rules: { ...jsRules },
    },
  ],
};
