module.exports = {
  plugins: [
    "react",
    "jsx-a11y",
    "import",
  ],
  env: {
    browser: true,
  },
  rules: {
    "comma-dangle": ["error", {
      "arrays": "only-multiline",
      "objects": "only-multiline",
      "imports": "only-multiline",
      "exports": "only-multiline",
      "functions": "ignore"
    }],
  }
}
