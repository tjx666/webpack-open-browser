const OFF = 0;

module.exports = {
    env: {
        es6: true,
        node: true,
        mocha: true,
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
        'func-names': OFF,
        'no-console': OFF,
        'no-unused-expressions': OFF,

        'import/no-extraneous-dependencies': OFF,

        '@typescript-eslint/no-explicit-any': OFF,
    },
    overrides: [
        {
            files: ['test/**/*.js'],
            rules: {
                'import/no-unresolved': OFF,

                '@typescript-eslint/explicit-function-return-type': OFF,
                '@typescript-eslint/no-unused-vars': OFF,
                '@typescript-eslint/no-var-requires': OFF,
            },
        },
    ],
};
