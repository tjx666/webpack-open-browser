module.exports = {
    env: {
        es6: true,
        node: true,
        mocha: true
    },
    extends: [
        'airbnb-base',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'func-names': 0,
        'no-unused-expressions': 0,
        'no-console': 0,

        '@typescript-eslint/no-explicit-any': 0,

        'import/no-extraneous-dependencies': 0,
    },
};
