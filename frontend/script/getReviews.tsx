import React from "react";
import { BrowserProvider, Contract } from "ethers";
import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit-ethers-react-native";
import SimpleHotelReviewABI from "./ContractJson/HotelReviewABI.json";
import { useWalletStore } from "@/components/walletStore";
const CONTRACT_ADDRESS = "0x602E7B42515d3E93A04e176C09a24eaF9F617c88";

export function useHotelReview() {
  const { address, chainId, isConnected, walletProvider } = useWalletStore();
  

  async function getContract() {
    if (!walletProvider) {
      console.error("❌ No wallet provider available! Please connect your wallet.");
      return null;
    }
    try {
      console.log("🔗 Connecting to contract...");
      const provider = new BrowserProvider(walletProvider, 534351);
      const signer = await provider.getSigner();
      console.log("✅ Connected to contract with signer:", signer);
      return new Contract(CONTRACT_ADDRESS, SimpleHotelReviewABI, signer);
    } catch (error) {
      console.error("⚠️ Contract connection failed:", error);
      return null;
    }
  }

  // Fetch all reviews from all hotels
  const getAllReviews = async () => {
    const contract = await getContract();
    if (!contract) {
      console.error("❌ Contract not initialized! Cannot fetch reviews.");
      return [];
    }
    try {
      console.log("📖 Fetching all reviews...");
      const reviews = await contract.getAllReviews(); // Assuming this returns an array of review objects
  
      console.log("✅ Raw reviews from contract:", reviews);
  
      return reviews.map((review: any, index: number) => ({
        id: index, // Adding an ID to avoid keyExtractor errors in FlatList
        hotelAddress: review.hotel || "Unknown Hotel",
        reviewer: review.reviewer || "Unknown",
        reviewText: review.reviewText || "No review text",
        ipfsHash: review.ipfsHash || "No IPFS hash",
        rating: review.rating ? Number(review.rating) : 0, // Ensure rating is a number
        likes: review.likes ? Number(review.likes) : 0, // Ensure likes is a number
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("❌ Failed to fetch all reviews:", error.message);
      } else {
        console.error("❌ Unknown error occurred during review fetch:", error);
      }
      return [];
    }
  };
  

  return {
    getAllReviews,
    address,
    isConnected,
  };
}
