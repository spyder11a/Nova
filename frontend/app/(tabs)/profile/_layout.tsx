import { Stack } from 'expo-router';

export default function ReelLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
     
    </Stack>
  );
}
