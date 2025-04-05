import { useState } from "react";
import {
  Button,
  // Checkbox,
  Text,
} from "@chat-app/base-component-lib";
import { createFileRoute } from "@tanstack/react-router";

import { Checkbox } from "../components/checkbox";
import logo from "../logo.svg";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="text-center">
      <header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-[calc(10px+2vmin)] text-white">
        <img
          src={logo}
          className="pointer-events-none h-[40vmin] animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <Button className="yeet">
          <Text>Click me</Text>
        </Button>
        <Checkbox
          checked={checked}
          onCheckedChange={() => setChecked((prev) => !prev)}
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header>
    </div>
  );
}
