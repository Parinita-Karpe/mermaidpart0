const js = require('@eslint/js')

module.exports = [
  // 1. This replaces your .eslintignore file
  {
    // Add app.js here to keep backend linting strictly on backend files
    ignores: ['dist/**', 'build/**', 'node_modules/**', 'app.js', 'src/**']
  },

  // 2. Load the recommended configurations
  js.configs.recommended,

  // 3. Define your rules and environment settings
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 0,
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^next$' }]
    }
  }
]