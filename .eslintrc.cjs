module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": ["error"],           // Prettier como error
    "react/react-in-jsx-scope": "off",        // No es necesario importar React en React 17+
    "react/prop-types": "off",                // Ignorar validación PropTypes
    "no-unused-vars": "warn",                 // Variables no usadas solo como warning
    "no-undef": "error"                       // Variables no definidas siguen como error
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
