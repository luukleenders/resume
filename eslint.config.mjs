import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import esPrettierPlugin from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';

import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/** @type {import("eslint").Config[]} */
const config = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^react$', '^next/(.*)$', '^@?\\w'],
            ['^@', '^'],
            ['^@components/', '^@context/', '^@db', '^@provider', '^@store'],
            ['^\\./'],
            ['^.+\\.(module.css|module.scss)$'],
            ['^.+\\.(gif|png|svg|jpg)$'],
          ],
        },
      ],
    },
  },

  ...compat.config({
    extends: ['next'],
    settings: {
      next: {
        rootDir: '.',
      },
    },
  }),

  reactPlugin.configs.flat.recommended,

  {
    plugins: {
      'react-compiler': reactCompiler,
      'react-hooks': reactHooks,
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          name: 'react',
          importNames: ['default'],
          message: 'Destructure imports instead of using `React.`',
        },
      ],
      'react-compiler/react-compiler': 'error',
      'react/destructuring-assignment': ['warn', 'always'],
      'react/function-component-definition': ['error', { namedComponents: 'function-declaration' }],
      'react/hook-use-state': ['error', { allowDestructuredState: true }],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/jsx-key': 'warn',
      'react/jsx-max-depth': ['warn', { max: 5 }],
      'react/jsx-no-constructed-context-values': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-uses-react': 'off',
      'react/no-multi-comp': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react-hooks/exhaustive-deps': 'warn',
      ...reactHooks.configs.recommended.rules,
    },
    ignores: ['*.test.tsx'],
  },

  esPrettierPlugin,
];

export default config;
