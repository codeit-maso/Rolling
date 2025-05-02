import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

const config = [
  { ignores: ['dist', 'eslint.config.js'] },

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,

      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,

      prettier: prettier,
      import: importPlugin,

    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,


      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
      'no-console': 'warn',
      'prefer-const': 'warn',


      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'react-hooks/rules-of-hooks': 'warn',

      'prettier/prettier': ['warn', {}, { usePrettierrc: true }],

      'import/no-anonymous-default-export': [
        'error',
        {
          allowArrowFunction: true,
          allowAnonymousFunction: false,
          allowAnonymousClass: false,
        },
      ],

      'func-style': ['warn', 'declaration', { allowArrowFunctions: true }],
    },
    settings: {
      react: {
        version: '18.2.0',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },
  },
];

export default config;
