import { useColorScheme as useNativewindColorScheme } from "nativewind";

export function useColorScheme() {
  // eslint-disable-next-line @typescript-eslint/unbound-method -- TODO: fix this
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();
  return {
    colorScheme: colorScheme ?? "dark",
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
