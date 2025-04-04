// import { defineConfig } from "vite";
// TODO: convert this file to TS -- unclear why TSR CLI generated it as JS

// import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";
// TODO: does this work with Tailwind@3.x ?
// import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import react from "@vitejs/plugin-react";
import { defineConfig, transformWithEsbuild } from "vite";
import reactNativeWeb from "vite-plugin-react-native-web";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // TODO: enable SSG / SSR for initial page load
    TanStackRouterVite({ autoCodeSplitting: true }),
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
    viteReact(),
    reactNativeWeb(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
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
});

// https://vite.dev/config/
// export default defineConfig({
//   build: {
//     sourcemap: true,
//     outDir: "dist",
//   },
//   resolve: {
//     alias: {
//       "~": resolve(__dirname, "src"),
//       "@": resolve(__dirname, "./src"),
//     },
//   },
//   plugins: [
//     {
//       name: "treat-js-files-as-jsx",
//       async transform(code, id) {
//         if (!id.match(/node_modules\/.*\.(js|mjs|web\.mjs)$/)) {
//           return null;
//         }

//         return transformWithEsbuild(code, id, {
//           loader: "jsx",
//           jsx: "automatic",
//         });
//       },
//     },
//     TanStackRouterVite({ autoCodeSplitting: true }),
//     // TanStackRouterVite({ target: 'react', autoCodeSplitting: true }), // TODO: working version from `chat-app`
//     react(),
//     reactNativeWeb(),
//   ],
//   optimizeDeps: {
//     force: true,
//     esbuildOptions: {
//       loader: {
//         ".js": "jsx",
//         ".mjs": "jsx",
//         ".web.mjs": "jsx",
//       },
//     },
//   },
// });
