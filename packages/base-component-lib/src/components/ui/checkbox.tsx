import * as React from "react";
import { Platform } from "react-native";

import type { RootProps, RootRef } from "../primitives/checkbox/types";
// import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import { Indicator, Root } from "~/components/primitives/checkbox/checkbox";
import { Check } from "~/lib/icons/Check";
import { cn } from "~/lib/utils";

const Checkbox = React.forwardRef<RootRef, RootProps>(
  ({ className, ...props }, ref) => {
    const rootClassName = cn(
      "web:peer native:h-[20] native:w-[20] native:rounded h-4 w-4 shrink-0 rounded-sm border border-primary disabled:cursor-not-allowed disabled:opacity-50 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
      props.checked && "bg-primary",
      className,
    );

    return (
      <Root className={rootClassName} ref={ref} {...props}>
        <Indicator className={cn("h-full w-full items-center justify-center")}>
          <Check
            className="text-primary-foreground"
            size={12}
            strokeWidth={Platform.OS === "web" ? 2.5 : 3.5}
          />
        </Indicator>
      </Root>
    );
  },
);
Checkbox.displayName = Root.displayName;

export { Checkbox };
