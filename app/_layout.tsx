import { Stack } from 'expo-router';
import login from "./screens/loginScreens/Login"
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} component={Login} />
    </Stack>
  );
}
