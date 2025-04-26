// import { Text, View } from "react-native";
// import { useState } from "react";

import { LoginScreen } from "@chat-app/features";
import {
  createFileRoute,
  // , Link
} from "@tanstack/react-router";

// import { ThemeToggle } from "~/components/ThemeToggle";

// import { Button, Checkbox, Text } from '@chat-app/base-component-lib';

export const Route = createFileRoute("/")({
  component: App,
});

// TODO: add theme toggle, etc -- although maybe that should happen in `_layout.tsx`?
function App() {
  return (
    <>
      <LoginScreen />
    </>
  );
}
