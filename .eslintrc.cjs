module.exports = {
  overrides: [
    {
      files: [".js", ".jsx", ".ts", ".tsx"],
      extends: "standard-with-typescript",
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        "@typescript-eslint/no-extraneous-class": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-misused-promises": "off",
      },
    },
  ],
};
