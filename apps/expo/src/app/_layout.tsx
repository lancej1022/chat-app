import { Stack } from "expo-router";

// import { StatusBar } from "expo-status-bar";
// import { useColorScheme } from "nativewind";

// import { queryClient } from "~/utils/api";

import "../styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  // const { colorScheme } = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
      <Stack
        screenOptions={{
          headerStyle: {
            // backgroundColor: "#f472b6",
          },
          contentStyle: {
            // backgroundColor: colorScheme == "dark" ? "#09090B" : "#FFFFFF",
          },
        }}
      />
      {/* <StatusBar /> */}
    </QueryClientProvider>
  );
}
