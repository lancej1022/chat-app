import { defineConfig } from "orval";

export default defineConfig({
  "backend-api": {
    input: {
      target: "../../backend/openapi.yaml",
      validation: true,
    },
    output: {
      baseUrl: "http://localhost:8080",
      mode: "split",
      target: "./src/api/generated",
      schemas: "./src/api/models",
      mock: true,
      packageJson: "fake", // TODO: this is a temporary hack to avoid `catalog:` errors -- https://github.com/orval-labs/orval/issues/1965#issuecomment-2719074991
      client: "react-query",
      prettier: true,
      override: {
        mutator: {
          path: "./src/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
  },
  "backend-api-zod": {
    input: {
      target: "../../backend/openapi.yaml",
    },
    output: {
      packageJson: "fake",
      mode: "split",
      client: "zod",
      target: "src/api/generated",
      fileExtension: ".zod.ts",
    },
  },
});
