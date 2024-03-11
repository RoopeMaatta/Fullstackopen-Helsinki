module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    'jest/globals': true,
    'cypress/globals': true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'react', 'jest', 'cypress', 'node'],
  rules: {
    // indent: ['error', 2],
    // 'linebreak-style': ['error', 'unix'],
    // quotes: ['error', 'single'],
    // semi: ['error', 'never'],
    eqeqeq: 'error',
    // 'no-trailing-spaces': 'error',
    // 'object-curly-spacing': ['error', 'always'],
    // 'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'no-unused-vars': 0,
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        indent: ['error', 2], // Example: enforce 2-space indentation for JavaScript and JSX files
        'linebreak-style': ['error', 'unix'], // Example: enforce Unix line endings for JavaScript and JSX files
        quotes: ['error', 'single'], // Example: enforce single quotes for JavaScript and JSX files
        semi: ['error', 'never'], // Example: enforce no semicolons for JavaScript and JSX files
        'no-trailing-spaces': 'error', // Example: Report trailing spaces for JavaScript and JSX files
        'object-curly-spacing': ['error', 'always'], // Example: enforce spacing inside curly braces for JavaScript and JSX files
        'arrow-spacing': ['error', { before: true, after: true }], // Example: enforce spacing around arrows for JavaScript and JSX files
      },
    },
  ],
}
