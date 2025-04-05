import type { FunctionComponent } from "react";
import { Check } from "lucide-react-native";

import type { LucidePropsWithClassName } from "./iconWithClassName";
import { iconWithClassName } from "./iconWithClassName";

iconWithClassName(Check);
const CheckAlias: FunctionComponent<LucidePropsWithClassName> = Check;
export { CheckAlias as Check };
