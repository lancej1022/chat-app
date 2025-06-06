import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, transformWithEsbuild } from "vite";
import reactNativeWeb from "vite-plugin-react-native-web";

// https://vite.dev/config/
export default defineConfig({
  build: {
    minify: false,
    sourcemap: true,
    outDir: "dist",
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/node_modules\/.*\.(js|mjs|web\.mjs)$/)) {
          return null;
        }

        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    // TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    reactNativeWeb(),
  ],
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".mjs": "jsx",
        ".web.mjs": "jsx",
      },
    },
  },
  // doesnt quite work
  //   esbuild: {
  //     jsxFactory: "_jsx",
  //     jsxFragment: "_jsxFragment",
  //     jsxInject: `import { jsx } from "nativewind/jsx-runtime"`,
  //   },
});
