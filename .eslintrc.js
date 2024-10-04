module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "max-len": ["error", { "code": 90, "ignoreTemplateLiterals": true }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "_"
      }
    ],
    "semi": [
      "error",
      "never"
    ],
    "comma-dangle": [
      "error",
      "never"
    ],
    "object-curly-newline": [
      "error",
      {
        "multiline": true,
        "consistent": true
      }
    ],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "no-console": "warn",
    "object-curly-spacing": [
      "warn",
      "always",
      {
        "objectsInObjects": false,
      }
    ],
    "quotes": [
      "warn",
      "single"
    ],
    'indent': [
      'error',
      2
    ]
  },
};
