import type { FunctionComponent } from "react";
import { Sun } from "lucide-react-native";

import type { LucidePropsWithClassName } from "./iconWithClassName";
import { iconWithClassName } from "./iconWithClassName";

iconWithClassName(Sun);

const SunAlias: FunctionComponent<LucidePropsWithClassName> = Sun;
export { SunAlias as Sun };
