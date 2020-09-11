module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'react/jsx-filename-extension': 'off'
  },
};
