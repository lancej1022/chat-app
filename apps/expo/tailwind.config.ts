import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@acme/tailwind-config/native";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/base-component-lib/dist/**/*.{ts,tsx}",
  ],
  presets: [baseConfig, nativewind],
} satisfies Config;
