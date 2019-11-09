module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['extends', 'apply', 'tailwind', 'components', 'utilities', 'screen'] }, // tailwind
    ],
  },
};
