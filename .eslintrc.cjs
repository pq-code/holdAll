/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-prettier",
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
};


// module.exports = {
//     env: {
//         browser: true,
//         es2021: true,
//         node: true
//     },
//     extends: ['standard', 'eslint-config-standard-with-typescript'],
//     parser: '@typescript-eslint/parser',
//     parserOptions: {
//         ecmaVersion: 12,
//         sourceType: 'module',
//         project: './tsconfig.json'
//     },
//     plugins: ['@typescript-eslint'],
//     rules: {}

// };
