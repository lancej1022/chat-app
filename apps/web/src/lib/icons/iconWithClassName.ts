import type { LucideIcon, LucideProps } from "lucide-react-native";
import { cssInterop } from "nativewind";

export type LucidePropsWithClassName = LucideProps & {
  className?: string;
};

// export function iconWithClassName(icon: LucideIcon): FunctionComponent<LucidePropsWithClassName> {
export function iconWithClassName(icon: LucideIcon) {
  return cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}
