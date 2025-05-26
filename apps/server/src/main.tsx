import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.css";

import { Zero } from "@rocicorp/zero";
import { ZeroProvider } from "@rocicorp/zero/react";
import { decodeJwt } from "jose";
import Cookies from "js-cookie";

import { schema } from "./schema.ts";

const encodedJWT = Cookies.get("jwt");
const decodedJWT = encodedJWT && decodeJwt(encodedJWT);
const userID = decodedJWT?.sub ? (decodedJWT.sub as string) : "anon";

const z = new Zero({
  userID,
  auth: () => encodedJWT,
  server: import.meta.env.VITE_PUBLIC_SERVER as string, // TODO: make the env var type safe
  schema,
  kvStore: "idb",
});

const root = document.getElementById("root");
if (!root) {
  throw new Error("#root element not found in DOM, crashing app");
}
createRoot(root).render(
  <StrictMode>
    <ZeroProvider zero={z}>
      <App />
    </ZeroProvider>
  </StrictMode>,
);
