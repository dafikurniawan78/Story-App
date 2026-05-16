import js from '@eslint/js';
import globals from 'globals';
import lit from 'eslint-plugin-lit';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['src/js/generated/**/*'],
  },
  js.configs.recommended,
  lit.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      lit,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'lit/no-invalid-html': 'error',
      'lit/binding-positions': 'error',
    },
  },
  prettier,
];
