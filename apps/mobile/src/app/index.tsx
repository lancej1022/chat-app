import { SafeAreaView } from "react-native-safe-area-context";
// import { useQueryClient } from "@tanstack/react-query";

import { LoginScreen } from "@chat-app/features";

export default function Index() {
  // const queryClient = useQueryClient();

  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      {/* <Stack.Screen options={{ title: "Home Page" }} /> */}
      <LoginScreen />
    </SafeAreaView>
  );
}
