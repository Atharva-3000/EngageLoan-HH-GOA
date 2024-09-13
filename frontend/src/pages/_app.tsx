import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { background, Card, ChakraProvider, extendTheme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/utils/apollo/client";
import BgImage from "../../public/assets/landing7.png"
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

import WagmiProvider from "../utils/wagmiprovider";
import Head from "next/head";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import Icon from "../../public/next.svg"

const colors = {
  brand: {
    50: "#ff6442",
    100: "#ff6442",
    200: "#ff6442",
    300: "#ff6442",
    400: "#ff6442",
    500: "#ff6442",
    600: "#ff6442",
    700: "#ff6442",
    800: "#ff6442",
    900: '#ff6442',
  },
};
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ colors, config });

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState<boolean>(false);
  const [useTestAadhaar, setUseTestAadhaar] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      <Head>
        <title>Engage Loan</title>
        <meta
          name="description"
          content="Embrace the Journey and Unlock Your NFT Potential!"
        />
        <link rel={Icon} href="/next.svg" />
      </Head>
      <WagmiProvider>
        <ChakraProvider theme={theme}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              backgroundImage: `url(${BgImage.src})`,
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            
            backgroundImage={BgImage.src} className=""
            // image ya add ki ha 
          >
            <Navbar />
            <ApolloProvider client={apolloClient}>
              {ready ? (
                <AnonAadhaarProvider
                  _useTestAadhaar={useTestAadhaar}
                  _appName="Anon Aadhaar"
                >
                  <Component
                    {...pageProps}
                    setUseTestAadhaar={setUseTestAadhaar}
                    useTestAadhaar={useTestAadhaar}
                  />
                </AnonAadhaarProvider>
              ) : null}
            </ApolloProvider>
            {/* <Footer /> */}
          </Card>
        </ChakraProvider>
      </WagmiProvider>
    </>
  );
}