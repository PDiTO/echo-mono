module.exports = {
  root: true,
  extends: [
    '@eslint/js/configs/recommended',
    '@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.next/',
    '*.js',
    '*.mjs',
  ],
};
