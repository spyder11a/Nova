import React from 'react';
import { Stack } from 'expo-router';

import '@walletconnect/react-native-compat';

import { createAppKit, defaultConfig, AppKit } from '@reown/appkit-ethers-react-native';
import { ThemeProvider } from "./context/ThemeContext";

// 1. Get projectId from https://cloud.reown.com
const projectId = '601f223af2ea9581e48d6141eef1ecab';

// 2. Create config
const metadata = {
  name: 'AppKit RN',
  description: 'AppKit RN Example',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
  },
};

const config = defaultConfig({ metadata });

// 3. Define your chains
const Electroneum = {
  chainId: 5201420, // Converted from hex (0x4f5e0c) to decimal
  name: 'Electroneum Testnet',
  currency: 'ETN',
  explorerUrl: '', // Add explorer URL if available
  rpcUrl: 'https://rpc.ankr.com/electroneum_testnet',
};

const chains = [Electroneum];

// 4. Create modal
createAppKit({
  projectId,
  chains,
  config,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

function App() {
  return (
    <>
      <Stack
        initialRouteName="(tabs)"
        screenOptions={{
          headerStyle: { backgroundColor: '#f4511e' },
          animation: "none", // Disables animations
          contentStyle: { backgroundColor: "black" },
          headerTintColor: '#000000',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShown: false, // Hide the header
        }}
      />
      <AppKit />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
