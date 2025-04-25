import baseConfig from "@acme/eslint-config/base";
import reactConfig from "@acme/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**", "src/api/generated/**"],
  },
  ...baseConfig,
  ...reactConfig,
];
