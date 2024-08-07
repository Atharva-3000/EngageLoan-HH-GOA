import {
  connectorsForWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import {
  argentWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { ParticleNetwork } from "@particle-network/auth";
import { sepolia } from "wagmi/chains";

import { particleWallet } from "@particle-network/rainbowkit-ext";

new ParticleNetwork({
  projectId: "6fe283fe-78b9-41d2-8e11-d99e5871cfe4",
  clientKey: "cUoriLQH0RaYN15dMVDrLYHOGaTqrCnqMSafLmHd",
  appId: "185180a6-11d8-48be-8ac2-eb13940d9e25",
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()]
);

const particleWallets = [
  particleWallet({ chains, authType: "google" }),
  particleWallet({ chains, authType: "facebook" }),
  particleWallet({ chains, authType: "discord" }),
  particleWallet({ chains }),
];

const popularWallets = {
  groupName: "Popular",
  wallets: [
    ...particleWallets,
    injectedWallet({ chains }),
    rainbowWallet({
      chains,
      projectId: "d74dd91cc8a2addfc474452004462b0f",
    }),
    coinbaseWallet({ appName: "RainbowKit demo", chains }),
    metaMaskWallet({
      chains,
      projectId: "d74dd91cc8a2addfc474452004462b0f",
    }),
    walletConnectWallet({
      chains,
      projectId: "d74dd91cc8a2addfc474452004462b0f",
    }),
  ],
};

const connectors = connectorsForWallets([
  popularWallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({
        chains,
        projectId: "d74dd91cc8a2addfc474452004462b0f",
      }),
      trustWallet({
        chains,
        projectId: "d74dd91cc8a2addfc474452004462b0f",
      }),
      omniWallet({
        chains,
        projectId: "d74dd91cc8a2addfc474452004462b0f",
      }),
      imTokenWallet({
        chains,
        projectId: "d74dd91cc8a2addfc474452004462b0f",
      }),
      ledgerWallet({
        chains,
        projectId: "d74dd91cc8a2addfc474452004462b0f",
      }),
    ],
  },
]);

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function WagmiProvider(props: any) {
  return (
    <>
      {config && (
        <WagmiConfig config={config}>
          <RainbowKitProvider
            chains={chains}
            theme={darkTheme({
              accentColor: "#000000",
              borderRadius: "large",
              overlayBlur: "small",
            })}
            coolMode
          >
            {props.children}
          </RainbowKitProvider>
        </WagmiConfig>
      )}
    </>
  );
}

export default WagmiProvider;
