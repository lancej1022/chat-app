import type { FunctionComponent } from "react";
import { X } from "lucide-react-native";

import type { LucidePropsWithClassName } from "./iconWithClassName";
import { iconWithClassName } from "./iconWithClassName";

iconWithClassName(X);
const XAlias: FunctionComponent<LucidePropsWithClassName> = X;
export { XAlias as X };
