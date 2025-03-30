// Learn more: https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require("expo/metro-config");
const { FileStore } = require("metro-cache");
const { withNativeWind } = require("nativewind/metro");

const path = require("node:path");

const config = withTurborepoManagedCache(
  withNativeWind(getDefaultConfig(__dirname), {
    input: "./src/styles.css",
    configPath: "./tailwind.config.ts",
  }),
);

// Resolve our `exports` in workspace package.jsons
// https://github.com/expo/expo/issues/26926
config.resolver.unstable_enablePackageExports = true;

// Magic fix for `SyntaxError: 269919:10:'import.meta' is currently unsupported, js engine: hermes`
// https://github.com/pmndrs/zustand/discussions/1967#discussioncomment-9578159
config.resolver.unstable_conditionNames = [
  "browser",
  "require",
  "react-native",
];

module.exports = config;

/**
 * Move the Metro cache to the `.cache/metro` folder.
 * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
 *
 * @see https://turbo.build/repo/docs/reference/configuration#env
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withTurborepoManagedCache(config) {
  config.cacheStores = [
    new FileStore({ root: path.join(__dirname, ".cache/metro") }),
  ];
  return config;
}
