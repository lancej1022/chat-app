import { View } from "react-native";
// import Svg, { Path } from "react-native-svg";
import {
  Button,
  cn,
  Input,
  Label,
  P,
  Text,
} from "@chat-app/base-component-lib";

function HorizontalBar() {
  return <View className="h-[1px] flex-1 bg-border" />;
}

// TODO: attempting to consume icons that rely on `react-native-svg` doesnt work
// for some reason. Need to investigate.

// function GitHubIcon({ className }: { className?: string }) {
//   return (
//     <Svg
//       data-testid="github-icon"
//       width={24}
//       height={24}
//       viewBox="0 0 24 24"
//       className={className}
//     >
//       <Path
//         d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
//         fill="currentColor"
//       />
//     </Svg>
//   );
// }

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <View
      // @ts-expect-error -- TODO: idk why this is throwing an error, but it works fine on web
      role="form"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <View className="flex flex-col items-center gap-2 text-center">
        <Text role="heading" aria-level={1} className="text-2xl font-bold">
          Login to your account
        </Text>
        <P className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </P>
      </View>
      <View className="grid gap-6">
        <View className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" />
        </View>
        <View className="grid gap-2">
          <View className="flex flex-row items-center">
            <Label htmlFor="password">Password</Label>
            <Text
              // @ts-expect-error -- the `href` definitely works as expected when used in react-native-web, so im not sure why it errors here?
              href="#yeet"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Text>
          </View>
          <Input id="password" secureTextEntry={true} />
        </View>
        <Button
          // @ts-expect-error -- TODO: not sure if `type` is valid or not
          type="submit"
          className="w-full"
        >
          <Text>Login</Text>
        </Button>
        <View className="z-10 flex flex-row items-center justify-around gap-2 bg-background">
          <HorizontalBar />
          <Text className="relative z-10 bg-background px-2 text-center text-sm text-muted-foreground">
            Or continue with
          </Text>
          <HorizontalBar />
        </View>
        <Button variant="outline" className="flex w-full flex-row">
          {/* <GitHubIcon /> */}
          <Text className="ml-2">Login with GitHub</Text>
        </Button>
      </View>
      <View
        data-testid="login-form-footer"
        // className="block text-center text-sm"
        className="flex flex-row items-center justify-center text-center text-sm"
      >
        <Text>Don&apos;t have an account? </Text>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore -- the `href` definitely works as expected when used in react-native-web, so im not sure why it errors here? */}
        <Text href="#" className="underline underline-offset-4">
          Sign up
        </Text>
      </View>
    </View>
  );
}
