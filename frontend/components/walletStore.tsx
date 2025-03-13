import { create } from "zustand";

// Define the state type
type WalletState = {
  walletProvider: any | null;
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  setWalletProvider: (provider: any | null) => void;
  setWalletInfo: (address: string | null, chainId: number | null, isConnected: boolean) => void;
};

// Create Zustand store
export const useWalletStore = create<WalletState>((set) => ({
  walletProvider: null,
  address: null,
  chainId: null,
  isConnected: false,
  setWalletProvider: (provider) => set({ walletProvider: provider }),
  setWalletInfo: (address, chainId, isConnected) =>
    set({
      address: address ?? null, // ✅ Convert undefined to null
      chainId: chainId ?? null,
      isConnected,
    }),
}));
