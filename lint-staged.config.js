module.exports = {
  '**/*.+(js|ts)': [
    'eslint --fix',
    'prettier --write',
    'jest --findRelatedTests',
  ],
};