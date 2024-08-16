import { Stack } from 'expo-router/stack';
import Login from './screens/loginScreens/Login'; 
export default function Layout() {
  return (
    <Stack>

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="./components/loginScreens/Login.tsx" options={{ headerShown: false }} />
    </Stack>
  );
}
