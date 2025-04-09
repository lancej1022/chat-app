import type { FunctionComponent } from "react";
import { MoonStar } from "lucide-react-native";

import type { LucidePropsWithClassName } from "./iconWithClassName";
import { iconWithClassName } from "./iconWithClassName";

iconWithClassName(MoonStar);
const MoonStarAlias: FunctionComponent<LucidePropsWithClassName> = MoonStar;
export { MoonStarAlias as MoonStar };
