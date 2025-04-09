// import { Text, View } from "react-native";
// import { useState } from "react";

import {
  createFileRoute,
  // , Link
} from "@tanstack/react-router";

import { LoginScreen } from "~/components/login/login-screen";

// import { ThemeToggle } from "~/components/ThemeToggle";

// import { Button, Checkbox, Text } from '@chat-app/base-component-lib';
// import { LoginScreen } from '@chat-app/features';

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  // debugger;
  // const [checked, setChecked] = useState(false);
  return (
    <>
      {/* <Button>
        <Text>Yeet</Text>
      </Button>
      <Checkbox checked={checked} onCheckedChange={setChecked} /> */}
      <LoginScreen />
    </>
  );
}
