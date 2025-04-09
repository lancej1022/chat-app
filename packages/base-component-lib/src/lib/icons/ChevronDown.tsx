import type { FunctionComponent } from "react";
import { ChevronDown } from "lucide-react-native";

import type { LucidePropsWithClassName } from "./iconWithClassName";
import { iconWithClassName } from "./iconWithClassName";

iconWithClassName(ChevronDown);
// TODO: need to just add this everywhere until I can figure out why tf `className` isnt being picked up by TS after adding the other package
const ChevronDownAlias: FunctionComponent<LucidePropsWithClassName> =
  ChevronDown;
export { ChevronDownAlias as ChevronDown };
