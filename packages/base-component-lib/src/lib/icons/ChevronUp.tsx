import type { FunctionComponent } from "react";
import { ChevronUp } from "lucide-react-native";

import type { LucidePropsWithClassName } from "./iconWithClassName";
import { iconWithClassName } from "./iconWithClassName";

iconWithClassName(ChevronUp);
const ChevronUpAlias: FunctionComponent<LucidePropsWithClassName> = ChevronUp;
export { ChevronUpAlias as ChevronUp };
