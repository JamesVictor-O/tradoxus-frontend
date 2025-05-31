// contexts/WalletContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
  ISupportedWallet,
} from "@creit.tech/stellar-wallets-kit";

// Types
interface WalletContextType {
  walletAddress: string | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  kit: StellarWalletsKit;
}

// Create context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Custom hook to use wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

// Provider component
interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Initialize Stellar Wallet Kit
  const kit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWalletId: XBULL_ID,
    modules: allowAllModules(),
  });

  // Connect wallet function
  const connectWallet = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      await kit.openModal({
        onWalletSelected: async (option: ISupportedWallet) => {
          try {
            // Set the selected wallet
            await kit.setWallet(option.id);
            // Get the public key
            const { address } = await kit.getAddress();
            setWalletAddress(address);
            console.log("Connected wallet address:", address);
            
            // Store in localStorage for persistence
            localStorage.setItem('stellar_wallet_address', address);
            localStorage.setItem('stellar_wallet_id', option.id);
          } catch (error) {
            console.error("Error setting wallet:", error);
          }
        },
        onClosed: (err?: Error) => {
          if (err) {
            console.error("Modal closed with error:", err);
          }
          setIsConnecting(false);
        },
        modalTitle: "Connect Your Stellar Wallet",
        notAvailableText: "Selected wallet is not available",
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setIsConnecting(false);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setWalletAddress(null);
    // Clear from localStorage
    localStorage.removeItem('stellar_wallet_address');
    localStorage.removeItem('stellar_wallet_id');
    console.log("Wallet disconnected");
  };

  // Check for previously connected wallet on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('stellar_wallet_address');
    const savedWalletId = localStorage.getItem('stellar_wallet_id');
    
    if (savedAddress && savedWalletId) {
      // Optionally verify the wallet is still connected
      setWalletAddress(savedAddress);
    }
  }, []);

  const value: WalletContextType = {
    walletAddress,
    isConnecting,
    connectWallet,
    disconnectWallet,
    kit,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};