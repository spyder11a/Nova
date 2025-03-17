import React from "react";
import { BrowserProvider, parseEther, Contract } from "ethers";
import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit-ethers-react-native";
import HotelBookingABI from "./ContractJson/HotelBookingABI.json";
import { useWalletStore } from "@/components/walletStore";

const CONTRACT_ADDRESS = "0xe1b4137756CeBF4f3dD81f49E1e2C555B215f3a9";

export function useHotelBooking() {
    const { address, chainId, isConnected, walletProvider } = useWalletStore();


    async function getContract() {
        if (!walletProvider) {
            console.error("❌ No wallet provider available! Please connect your wallet.");
            return null;
        }

        try {
            console.log("🔗 Connecting to contract...");
            const provider = new BrowserProvider(walletProvider);
            const signer = await provider.getSigner();
            console.log("✅ Connected to contract with signer:", signer);
            return new Contract(CONTRACT_ADDRESS, HotelBookingABI, signer);
        } catch (error) {
            console.error("⚠️ Failed to connect to contract:", error);
            return null;
        }
    }

    const claimInfluencerRewards = async (creditScore: number) => {
        if (!isConnected) {
            console.error("🚫 Wallet not connected! Please connect first.");
            return;
        }
        if (creditScore <= 0 ) {
            console.error("❌ Invalid credit score! Must be between 1 and 100.");
            return;
        }

        const contract = await getContract();
        if (!contract) {
            console.error("❌ Contract not initialized! Cannot proceed.");
            return;
        }

        if (typeof contract.claimInfluencerRewards !== "function") {
            console.error("🚨 claimInfluencerRewards function not found in contract!");
            return;
        }

        try {
            console.log("🎁 Claiming influencer rewards...");
            const tx = await contract.claimInfluencerRewards(creditScore);
            console.log("⏳ Waiting for transaction confirmation...");
            await tx.wait();
            console.log("🎉 Claim successful! Tx:", tx.hash);
            return tx.hash;
        } catch (error: unknown) {
            if (error instanceof Error) {
                const err = error as any;
                if (err.code === "CALL_EXCEPTION") {
                    // Handle specific contract errors
                    if (err.message.includes("InvalidCreditScore")) {
                        console.error("❌ Invalid credit score provided!");
                    } else if (err.message.includes("RewardClaimTooSoon")) {
                        console.error("⏰ Too soon to claim rewards! Please wait 24 hours between claims.");
                    } else if (err.message.includes("InsufficientRewardPool")) {
                        console.error("💰 Insufficient rewards in pool!");
                    } else {
                        console.error("🚨 Contract call failed:", err.message);
                    }
                } else {
                    console.error("❌ Transaction failed:", err.message || err);
                }
            } else {
                console.error("❌ Unknown error occurred:", error);
            }
            throw error;
        }
    };

    return { 
      
        claimInfluencerRewards,
        address, 
        isConnected, 
    };
}