import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@acme/tailwind-config/native";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    // "../../packages/base-component-lib/dist/**/*.{ts,tsx}",
    "../../packages/base-component-lib/dist/**/*.{js,cjs}",
    // "../../packages/features/dist/**/*.{ts,tsx}",
    "../../packages/features/dist/**/*.{js,cjs}",
  ],
  presets: [baseConfig, nativewind],
} satisfies Config;
