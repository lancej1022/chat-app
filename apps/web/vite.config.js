// TODO: convert this file to TS -- need to remove the vitest stuff
import { resolve } from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
// import tailwindcss from "tailwindcss";
import { defineConfig, transformWithEsbuild } from "vite";
import reactNativeWeb from "vite-plugin-react-native-web";

export default defineConfig({
  build: {
    minify: false,
  },
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
  // css: {
  //   postcss: {
  //     plugins: [tailwindcss()],
  //   },
  // },
  // TODO: this is probably why the file is `.js` instead of `.ts`
  test: {
    globals: true,
    environment: "jsdom",
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
