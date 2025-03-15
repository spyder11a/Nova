import React from "react";
import { BrowserProvider, Contract } from "ethers";
import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit-ethers-react-native";
import SimpleHotelReviewABI from "./ContractJson/HotelReviewABI.json";
import { useWalletStore } from "@/components/walletStore";

const CONTRACT_ADDRESS = "0xf17496625e0d602FF36e133C3B4CD1f5c0D3678a";

export function useHotelReview() {
  
  const { address, chainId, isConnected, walletProvider } = useWalletStore();
  
  async function getContract() {
    if (!walletProvider) {
      console.error("❌ No wallet provider available! Please connect your wallet.");
      return null;
    }
    try {
      console.log("🔗 Connecting to contract...");
      // Pass the chainId if required (e.g., 5201420)
      const provider = new BrowserProvider(walletProvider, 5201420);
      const signer = await provider.getSigner();
      console.log("✅ Connected to contract with signer:", signer);
      return new Contract(CONTRACT_ADDRESS, SimpleHotelReviewABI, signer);
    } catch (error) {
      console.error("⚠️ Contract connection failed:", error);
      return null;
    }
  }

  // Submit a hotel review
  const submitReview = async (
    hotelAddress: string,
    reviewText: string,
    ipfsHash: string,
    rating: string
  ) => {
    if (!isConnected) {
      console.error("🚫 Wallet not connected! Please connect first.");
      return;
    }
    if (!hotelAddress || !reviewText || !ipfsHash || !rating) {
      console.error("❌ Missing fields. Please provide all required review information.");
      return;
    }
    const ratingNum = parseInt(rating);
    if (ratingNum < 1 || ratingNum > 5) {
      console.error("⚠️ Invalid rating value. Rating must be between 1 and 5.");
      return;
    }
    const contract = await getContract();
    if (!contract) {
      console.error("❌ Contract not initialized! Cannot proceed.");
      return;
    }
    try {
      console.log("📝 Submitting review...");
      const tx = await contract.submitReview(hotelAddress, reviewText, ipfsHash, ratingNum);
      console.log("⏳ Waiting for transaction confirmation...");
      await tx.wait();
      console.log("🎉 Review submitted successfully! Tx:", tx.hash);
      return tx.hash;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("❌ Failed to submit review:", error.message);
      } else {
        console.error("❌ Unknown error occurred during review submission:", error);
      }
      throw error;
    }
  };

  return {
    submitReview,
    address,
    isConnected,
   
  };
}
