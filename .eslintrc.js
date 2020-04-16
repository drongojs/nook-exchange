  
module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "react",
    "jsx-control-statements",
  ],
  "env": {
    "browser": true,
    "es6": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    // "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:jsx-control-statements/recommended",
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  "rules": {
      "indent": [ "error", 2 ],
      "linebreak-style": [ "error", "unix" ],
      "quotes": [ "error", "single" ],
      "semi": [ "error", "always" ],
      "arrow-parens": 0,
      "comma-dangle": [ "error", "always-multiline" ],
      "curly": [ "error", "all" ],
      "no-invalid-this": "error",
      "no-param-reassign": [ "error", { "props": true } ],
      "array-bracket-spacing": [ "error", "always" ],
      "comma-dangle": [ "error", "always-multiline" ],
      "max-len": [ "error", {
        "code": 100,
        "ignoreComments": true,
        "ignoreTemplateLiterals": true,
      } ],
      "@typescript-eslint/no-unused-vars": "error",
      "react/jsx-no-undef": [2, { "allowGlobals": true }],
  },
  "settings": {
    "react": {
      "version": "16.8",
    },
    "import/resolver": {
      "node": {
        "extensions": [ ".ts", ".tsx", ".js" ],
        "moduleDirectory": [
          "node_modules",
          "src"
        ],
      },
      "extensions": [ ".ts", ".tsx", ".js" ],
    },
  },
};
