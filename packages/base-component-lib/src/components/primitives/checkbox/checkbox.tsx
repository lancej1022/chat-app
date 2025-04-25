import type {
  PressableRef,
  SlottablePressableProps,
} from "@rn-primitives/types";
import type { GestureResponderEvent } from "react-native";
import { createContext, forwardRef, useContext } from "react";
import { Pressable, View } from "react-native";
import * as Slot from "@rn-primitives/slot";

import type { IndicatorProps, IndicatorRef, RootProps, RootRef } from "./types";

interface RootContext extends RootProps {
  nativeID?: string;
}

const CheckboxContext = createContext<RootContext | null>(null);

const Root = forwardRef<RootRef, RootProps>(
  (
    {
      asChild: _asChild,
      disabled = false,
      checked,
      onCheckedChange,
      nativeID,
      ...props
    },
    ref,
  ) => {
    return (
      <CheckboxContext.Provider
        value={{
          disabled,
          checked,
          onCheckedChange,
          nativeID,
        }}
      >
        <Trigger ref={ref} {...props} />
      </CheckboxContext.Provider>
    );
  },
);

Root.displayName = "RootNativeCheckbox";

function useCheckboxContext() {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error(
      "Checkbox compound components cannot be rendered outside the Checkbox component",
    );
  }
  return context;
}

const Trigger = forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, ...props }, ref) => {
    const { disabled, checked, onCheckedChange, nativeID } =
      useCheckboxContext();

    // TODO: add proper keyboard handling!
    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      const newValue = !checked;
      onCheckedChange(newValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        accessibilityState={{
          checked,
          disabled,
        }}
        aria-checked={checked}
        aria-disabled={disabled}
        disabled={disabled}
        nativeID={nativeID}
        onPress={onPress}
        ref={ref}
        role="checkbox"
        {...props}
      />
    );
  },
);

Trigger.displayName = "TriggerNativeCheckbox";

const Indicator = forwardRef<IndicatorRef, IndicatorProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const { checked, disabled } = useCheckboxContext();

    if (!forceMount) {
      if (!checked) {
        return null;
      }
    }

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        aria-disabled={disabled}
        aria-hidden={!(forceMount || checked)}
        ref={ref}
        role={"presentation"}
        {...props}
      />
    );
  },
);

Indicator.displayName = "IndicatorNativeCheckbox";

export { Indicator, Root };
