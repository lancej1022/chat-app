import { readdirSync } from "fs";
import path, { join } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, transformWithEsbuild } from "vite";
import dtsPlugin from "vite-plugin-dts";
import noBundlePlugin from "vite-plugin-no-bundle";
import tsconfigPaths from "vite-tsconfig-paths";

// TODO: would also need to map over the `lib` directory and add all the files in there too
// const uiDir = join(__dirname, 'src/components/ui');
// const uiFiles = readdirSync(uiDir, { recursive: true })
//   .filter((file) => file.toString().endsWith('.tsx'))
//   .map((file) => join('./src/components/ui', file.toString()));

export default defineConfig({
  build: {
    lib: {
      // entry: uiFiles,
      entry: "src/index.ts",
      formats: ["es", "cjs"],
    },
    minify: false,
    sourcemap: true,
    outDir: "dist",
    rollupOptions: {
      output: {
        // TODO: do I need this or nah
        preserveModules: true,
      },
    },
  },

  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "./src")}/`,
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
    react(), // TODO: do I actually want this, or will it cause the compiled output to be borked?
    dtsPlugin({
      compilerOptions: {
        tsBuildInfoFile: "tsconfig.build.tsbuildinfo",
        outDir: "dist",
        rootDir: "src",
        noEmit: false,
        sourceMap: true,
        declarationMap: true,
        declaration: true,
      },
      include: ["src/**/*.ts", "src/**/*.tsx"],
    }),
    tsconfigPaths(),
    noBundlePlugin(),
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
});
