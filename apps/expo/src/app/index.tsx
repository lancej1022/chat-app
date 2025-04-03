import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { LoginForm } from "~/components/login/login-form";
import { LoginScreen } from "~/components/login/login-screen";
// import { Button, Checkbox, Text } from "@chat-app/base-component-lib";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Text } from "~/components/ui/text";

export default function Index() {
  const queryClient = useQueryClient();

  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      {/* <Stack.Screen options={{ title: "Home Page" }} /> */}
      <LoginScreen />
    </SafeAreaView>
  );
}
