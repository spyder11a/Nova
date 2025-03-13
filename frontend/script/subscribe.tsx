import React from "react";
import { BrowserProvider, parseEther, Contract } from "ethers";
import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit-ethers-react-native";
import HotelBookingABI from "./ContractJson/HotelBookingABI.json"; // Import the contract ABI
import { useWalletStore } from "../components/walletStore";
import { Alert } from "react-native";

// Replace with your deployed smart contract address
const CONTRACT_ADDRESS = "0xe373E2112Fa19Af18910818386Fe113834bA2dbA";

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

    const subscribeToPlatform = async () => {
        if (!isConnected) {
            console.error("🚫 Wallet not connected! Please connect first.");
            return;
        }

        const contract = await getContract();
        if (!contract) {
            console.error("❌ Contract not initialized! Cannot proceed.");
            return;
        }

        if (typeof contract.subscribeToPlatform !== "function") {
            console.error("🚨 subscribeToPlatform function not found in contract!");
            return;
        }

        try {
            console.log("📝 Subscribing to platform...");
            const tx = await contract.subscribeToPlatform({
                value: parseEther("0.1"), // Minimum subscription fee
            });
            console.log("⏳ Waiting for transaction confirmation...");
            await tx.wait();
            console.log("🎉 Subscription successful! Tx:", tx.hash);
            Alert.alert("🎉 Subscription successful! Tx:", tx.hash);
            return tx.hash;
        } catch (error: unknown) {
            if (error instanceof Error) {
                const err = error as any;
                if (err.code === "INSUFFICIENT_FUNDS") {
                    console.error("💰 Not enough funds! Please check your balance.");
                } else if (err.code === "CALL_EXCEPTION") {
                    console.error("🚨 Contract call failed! Please check the contract.");
                } else {
                    console.error("❌ Subscription failed:", err.message || err);
                }
            } else {
                console.error("❌ Unknown error occurred:", error);
            }
            throw error;

        }
    };

    return { subscribeToPlatform, address, isConnected };
}
