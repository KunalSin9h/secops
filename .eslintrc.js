module.exports = {
  env: {
    node: true,
    es2021: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier", "react"],
  rules: {
    "prettier/prettier": "error",
    "import/extensions": "off",
    "typescript/no-var-requires": 0,
    "on-console": "off",
    "import/order": [
      "error",
      {
        "newlines-between": "never",
        groups: [
          ["builtin", "external"],
          ["internal", "parent", "sibling", "index"],
        ],
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
};
