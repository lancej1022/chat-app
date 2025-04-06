import { Image, View } from "react-native";
import { Text } from "@chat-app/base-component-lib";
import { GalleryVerticalEnd } from "lucide-react-native";

import { LoginForm } from "~/components/login/login-form";

export function LoginScreen() {
  return (
    <View className="grid min-h-svh lg:grid-cols-2">
      <View className="flex flex-col gap-4 p-6 md:p-10">
        <View className="flex flex-row justify-center gap-2 md:justify-start">
          <Text
            //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //  @ts-ignore -- the `href` definitely works as expected when used in react-native-web, so im not sure why it errors here?
            href="#"
            className="flex flex-row items-center gap-2 font-medium"
          >
            <View className="flex h-6 w-6 flex-row items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </View>
            <Text>Acme Inc.</Text>
            {/* <ThemeToggle /> */}
          </Text>
        </View>
        <View
          data-testid="login-form-wrap"
          className="flex flex-1 flex-row items-center justify-center"
        >
          <View className="w-full max-w-xs">
            <LoginForm />
          </View>
        </View>
      </View>
      <View className="relative hidden bg-muted lg:block">
        <Image
          // source={require('@chat-app/assets/placeholder.svg')} TODO: add placeholder image
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </View>
    </View>
  );
}
