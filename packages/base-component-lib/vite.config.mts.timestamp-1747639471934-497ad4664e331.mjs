// vite.config.mts
import path from "path";
import react from "file:///Users/lancejeffers/code/chat-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig, transformWithEsbuild } from "file:///Users/lancejeffers/code/chat-app/node_modules/vite/dist/node/index.js";
import dtsPlugin from "file:///Users/lancejeffers/code/chat-app/node_modules/vite-plugin-dts/dist/index.mjs";
import noBundlePlugin from "file:///Users/lancejeffers/code/chat-app/node_modules/vite-plugin-no-bundle/dist/index.js";
import tsconfigPaths from "file:///Users/lancejeffers/code/chat-app/node_modules/vite-tsconfig-paths/dist/index.js";
var __vite_injected_original_dirname = "/Users/lancejeffers/code/chat-app/packages/base-component-lib";
var vite_config_default = defineConfig({
  build: {
    lib: {
      // entry: uiFiles,
      entry: "src/index.ts",
      formats: ["es", "cjs"]
    },
    minify: false,
    sourcemap: true,
    outDir: "dist",
    rollupOptions: {
      output: {
        // TODO: do I need this or nah
        preserveModules: true
      }
    }
  },
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "./src")}/`
    }
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
          jsx: "automatic"
        });
      }
    },
    react(),
    // TODO: do I actually want this, or will it cause the compiled output to be borked?
    dtsPlugin({
      compilerOptions: {
        tsBuildInfoFile: "tsconfig.build.tsbuildinfo",
        outDir: "dist",
        rootDir: "src",
        noEmit: false,
        sourceMap: true,
        declarationMap: true,
        declaration: true
      },
      include: ["src/**/*.ts", "src/**/*.tsx"]
    }),
    tsconfigPaths(),
    noBundlePlugin()
  ],
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".mjs": "jsx",
        ".web.mjs": "jsx"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2xhbmNlamVmZmVycy9jb2RlL2NoYXQtYXBwL3BhY2thZ2VzL2Jhc2UtY29tcG9uZW50LWxpYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2xhbmNlamVmZmVycy9jb2RlL2NoYXQtYXBwL3BhY2thZ2VzL2Jhc2UtY29tcG9uZW50LWxpYi92aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2xhbmNlamVmZmVycy9jb2RlL2NoYXQtYXBwL3BhY2thZ2VzL2Jhc2UtY29tcG9uZW50LWxpYi92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgeyByZWFkZGlyU3luYyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHBhdGgsIHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIHRyYW5zZm9ybVdpdGhFc2J1aWxkIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBkdHNQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xuaW1wb3J0IG5vQnVuZGxlUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1uby1idW5kbGVcIjtcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XG5cbi8vIFRPRE86IHdvdWxkIGFsc28gbmVlZCB0byBtYXAgb3ZlciB0aGUgYGxpYmAgZGlyZWN0b3J5IGFuZCBhZGQgYWxsIHRoZSBmaWxlcyBpbiB0aGVyZSB0b29cbi8vIGNvbnN0IHVpRGlyID0gam9pbihfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cy91aScpO1xuLy8gY29uc3QgdWlGaWxlcyA9IHJlYWRkaXJTeW5jKHVpRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuLy8gICAuZmlsdGVyKChmaWxlKSA9PiBmaWxlLnRvU3RyaW5nKCkuZW5kc1dpdGgoJy50c3gnKSlcbi8vICAgLm1hcCgoZmlsZSkgPT4gam9pbignLi9zcmMvY29tcG9uZW50cy91aScsIGZpbGUudG9TdHJpbmcoKSkpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgLy8gZW50cnk6IHVpRmlsZXMsXG4gICAgICBlbnRyeTogXCJzcmMvaW5kZXgudHNcIixcbiAgICAgIGZvcm1hdHM6IFtcImVzXCIsIFwiY2pzXCJdLFxuICAgIH0sXG4gICAgbWluaWZ5OiBmYWxzZSxcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgb3V0RGlyOiBcImRpc3RcIixcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgLy8gVE9ETzogZG8gSSBuZWVkIHRoaXMgb3IgbmFoXG4gICAgICAgIHByZXNlcnZlTW9kdWxlczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwifi9cIjogYCR7cGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKX0vYCxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAge1xuICAgICAgbmFtZTogXCJ0cmVhdC1qcy1maWxlcy1hcy1qc3hcIixcbiAgICAgIGFzeW5jIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgICAgICBpZiAoIWlkLm1hdGNoKC9ub2RlX21vZHVsZXNcXC8uKlxcLihqc3xtanN8d2ViXFwubWpzKSQvKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybVdpdGhFc2J1aWxkKGNvZGUsIGlkLCB7XG4gICAgICAgICAgbG9hZGVyOiBcImpzeFwiLFxuICAgICAgICAgIGpzeDogXCJhdXRvbWF0aWNcIixcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVhY3QoKSwgLy8gVE9ETzogZG8gSSBhY3R1YWxseSB3YW50IHRoaXMsIG9yIHdpbGwgaXQgY2F1c2UgdGhlIGNvbXBpbGVkIG91dHB1dCB0byBiZSBib3JrZWQ/XG4gICAgZHRzUGx1Z2luKHtcbiAgICAgIGNvbXBpbGVyT3B0aW9uczoge1xuICAgICAgICB0c0J1aWxkSW5mb0ZpbGU6IFwidHNjb25maWcuYnVpbGQudHNidWlsZGluZm9cIixcbiAgICAgICAgb3V0RGlyOiBcImRpc3RcIixcbiAgICAgICAgcm9vdERpcjogXCJzcmNcIixcbiAgICAgICAgbm9FbWl0OiBmYWxzZSxcbiAgICAgICAgc291cmNlTWFwOiB0cnVlLFxuICAgICAgICBkZWNsYXJhdGlvbk1hcDogdHJ1ZSxcbiAgICAgICAgZGVjbGFyYXRpb246IHRydWUsXG4gICAgICB9LFxuICAgICAgaW5jbHVkZTogW1wic3JjLyoqLyoudHNcIiwgXCJzcmMvKiovKi50c3hcIl0sXG4gICAgfSksXG4gICAgdHNjb25maWdQYXRocygpLFxuICAgIG5vQnVuZGxlUGx1Z2luKCksXG4gIF0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGZvcmNlOiB0cnVlLFxuICAgIGVzYnVpbGRPcHRpb25zOiB7XG4gICAgICBsb2FkZXI6IHtcbiAgICAgICAgXCIuanNcIjogXCJqc3hcIixcbiAgICAgICAgXCIubWpzXCI6IFwianN4XCIsXG4gICAgICAgIFwiLndlYi5tanNcIjogXCJqc3hcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sVUFBb0I7QUFDM0IsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsY0FBYyw0QkFBNEI7QUFDbkQsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sbUJBQW1CO0FBTjFCLElBQU0sbUNBQW1DO0FBY3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQTtBQUFBLE1BRUgsT0FBTztBQUFBLE1BQ1AsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUE7QUFBQSxRQUVOLGlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sR0FBRyxLQUFLLFFBQVEsa0NBQVcsT0FBTyxDQUFDO0FBQUEsSUFDM0M7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTSxVQUFVLE1BQU0sSUFBSTtBQUN4QixZQUFJLENBQUMsR0FBRyxNQUFNLHNDQUFzQyxHQUFHO0FBQ3JELGlCQUFPO0FBQUEsUUFDVDtBQUVBLGVBQU8scUJBQXFCLE1BQU0sSUFBSTtBQUFBLFVBQ3BDLFFBQVE7QUFBQSxVQUNSLEtBQUs7QUFBQSxRQUNQLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUEsSUFDTixVQUFVO0FBQUEsTUFDUixpQkFBaUI7QUFBQSxRQUNmLGlCQUFpQjtBQUFBLFFBQ2pCLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLFdBQVc7QUFBQSxRQUNYLGdCQUFnQjtBQUFBLFFBQ2hCLGFBQWE7QUFBQSxNQUNmO0FBQUEsTUFDQSxTQUFTLENBQUMsZUFBZSxjQUFjO0FBQUEsSUFDekMsQ0FBQztBQUFBLElBQ0QsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLEVBQ2pCO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixPQUFPO0FBQUEsSUFDUCxnQkFBZ0I7QUFBQSxNQUNkLFFBQVE7QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLFlBQVk7QUFBQSxNQUNkO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
