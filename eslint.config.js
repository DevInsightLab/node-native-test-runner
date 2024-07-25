import js from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        node: true,
        es6: true,
        process: true,
      },
    },
  },
  js.configs.recommended,
  {
    ignores: ['**/coverage/']
  }
];
