import { Stack } from "expo-router";

export default function ReelLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "none", // Disables animations
        contentStyle: { backgroundColor: "black" }, // Ensures proper background
        headerShown: false, // Hides the header
       
      }}
    >
      <Stack.Screen name="index" options={{ gestureEnabled: false }} />
      <Stack.Screen name="booking" options={{ gestureEnabled: false }} />
    </Stack>
  );
}
