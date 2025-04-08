import { Image, View } from "react-native";
import { Text } from "@chat-app/base-component-lib";
// import { LoginForm } from "~/components/login/login-form";
import { LoginForm } from "@chat-app/features";
import { GalleryVerticalEnd } from "lucide-react-native";

export function LoginScreen() {
  return (
    // <View className="grid min-h-screen lg:grid-cols-2">
    // <View className="flex min-h-screen flex-col justify-center lg:flex-row">
    // <View className="min-h-screen">
    // TODO: this component needs to vertically center the form! But `min-h-screen` causes things to stretch to the bottom on mobile? Yet it seems required for web...?
    // One potential solution would be having the Web app wrap a full-height view using flexbox around everything, probably on the body or #root.
    <View>
      <View className="flex h-full flex-col">
        <View
          // TODO: when this is a `Text` w/ link, it causes the row to sit to the far left on mobile only for some reason
          // href="#"
          className="flex flex-row items-center justify-center gap-2 text-center font-medium"
        >
          <View className="flex h-6 w-6 flex-row items-center justify-center self-center rounded-md bg-primary text-primary-foreground">
            {/* TODO: this doesnt appear as white on mobile for some reason? */}
            <GalleryVerticalEnd className="size-4 text-primary-foreground" />
          </View>
          <Text>Chat app</Text>
        </View>
        <View
          data-testid="login-form-wrap"
          className="flex flex-shrink flex-grow basis-auto flex-row items-center justify-center"
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
