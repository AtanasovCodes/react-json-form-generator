import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
    {
        ignores: ['dist'],
    },
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            '@typescript-eslint': tseslint,
            import: importPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...prettier.rules,

            indent: ['error', 4, { SwitchCase: 1 }],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],

            // TS-aware unused vars
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',

            // React 17+ / Vite
            'react/react-in-jsx-scope': 'off',
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin', // Node.js built-ins
                        'external', // 3rd-party libraries
                        'type', // Type imports (TS)
                        'internal', // Absolute imports from your src
                        'parent', // ../ imports
                        'sibling', // ./ imports
                        'index', // ./index
                    ],
                    pathGroups: [
                        {
                            pattern: '**/*.d.ts',
                            group: 'type',
                            position: 'after',
                        },
                        {
                            pattern: 'src/components/**',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin', 'external'],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                    'newlines-between': 'always',
                },
            ],
        },
    },
];
