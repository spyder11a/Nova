import { Stack } from 'expo-router';

export default function home() {
  return (
    <Stack screenOptions={{ 
      headerShown: false ,
      animation: "none", // Removes animation

      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="hotel" />
    </Stack>
  );
}
