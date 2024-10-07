module.exports = {
  env: {
    node: true, 
    es2021: true, 
  },
  extends: [
    "eslint:recommended", 
    "plugin:node/recommended", 
    "plugin:promise/recommended", 
    "prettier", 
  ],
  plugins: [
    "prettier",
    "promise", 
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module", 
  },
  rules: {
    "prettier/prettier": "error", 
    "no-console": "off", 
    "eqeqeq": ["error", "always"], 
    "no-var": "error", 
    "prefer-const": "error", 
    "arrow-body-style": ["error", "as-needed"], 
    "promise/always-return": "warn", 
    "promise/catch-or-return": "warn", 
    "node/no-unsupported-features/es-syntax": [
      "error",
      {
        ignores: ["modules"], 
      },
    ],
    "no-unused-vars": "warn", 
    "consistent-return": "error", 
    "no-process-exit": "error", 
  },
  settings: {
    node: {
      tryExtensions: [".js", ".json", ".node"], 
    },
  },
};
