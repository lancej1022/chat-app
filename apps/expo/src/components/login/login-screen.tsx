import { Image, View } from "react-native";
import { Text } from "@chat-app/base-component-lib";
// import { LoginForm } from "~/components/login/login-form";
import { LoginForm } from "@chat-app/features";
import { GalleryVerticalEnd } from "lucide-react-native";

function Branding() {
  return (
    <View
      // TODO: when this is a `Text` w/ href, it causes the row to sit to the far left on mobile only for some reason
      // href="#"
      className="flex flex-row items-center justify-center gap-2 text-center font-medium"
    >
      <View className="flex h-6 w-6 flex-row items-center justify-center self-center rounded-md bg-primary text-primary-foreground">
        {/* TODO: this doesnt appear as white on mobile for some reason? Not sure if its a theme issue*/}
        <GalleryVerticalEnd className="size-4 text-primary-foreground" />
      </View>
      <Text>Chat app</Text>
    </View>
  );
}

export function LoginScreen() {
  return (
    <View className="min-h-screen items-center justify-center">
      <View className="flex flex-col gap-5">
        <Branding />

        <View
          data-testid="login-form-wrap"
          className="flex flex-shrink flex-grow basis-auto flex-row items-baseline justify-center"
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
