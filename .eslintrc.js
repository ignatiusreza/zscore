let noUnusedVars = ['error', { argsIgnorePattern: '^_' }];

module.exports = {
  plugins: ['react'],
  extends: ['eslint:recommended', 'prettier', 'plugin:react/recommended'],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      parser: 'babel-eslint',
      rules: {
        'no-unused-vars': noUnusedVars,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': noUnusedVars,
      },
    },
  ],
};
