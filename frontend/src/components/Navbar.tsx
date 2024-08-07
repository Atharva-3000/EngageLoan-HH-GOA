// @ts-nocheck comment
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
// import { ethers } from "ethers";
import { Link } from "@chakra-ui/next-js";
import { useAccount } from "wagmi";
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import Logo from '../../public/assets/Logo4.png'

export default function Navbar() {
  const [anonAadhaar] = useAnonAadhaar();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const account = useAccount();

  return (
    <>
      <Box bg={useColorModeValue("white", "")} px={10} className="relative bg-white bg-opacity-5 backdrop-blur-md shadow-lg">
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems={"center"}
            fontSize="26px"
            fontWeight="0"
            ml="2"
            color="brand.004"
          >
            <Link href="/" mt={1}>
              <Image
                  src={Logo}
                  alt="Logo"
                  width={150}
                  height={150}
                />
            </Link>
          </HStack>
          <Flex alignItems={"center"}>
            <div style={{ display: "flex" }}>
              {account.isConnected && (
                <>
                  <HStack
                    as={"nav"}
                    spacing={4}
                    display={{ base: "none", md: "flex" }}
                    marginRight={4}
                  >
                    <Link href="/aadhaar-login">
                      <Button w="full" variant="ghost">
                        Aadhaar Login
                      </Button>
                    </Link>
                  </HStack>

                  <HStack
                    as={"nav"}
                    spacing={4}
                    display={{ base: "none", md: "flex" }}
                    marginRight={4}
                  >
                    <Link href="/mint-nft">
                      <Button w="full" variant="ghost">
                        Mint NFT
                      </Button>
                    </Link>
                  </HStack>
                  <HStack
                    as={"nav"}
                    spacing={4}
                    display={{ base: "none", md: "flex" }}
                    marginRight={4}
                  >
                    <Link href="/create-loan">
                      <Button w="full" variant="ghost">
                        Create Loan
                      </Button>
                    </Link>
                  </HStack>
                  <HStack
                    as={"nav"}
                    spacing={4}
                    display={{ base: "none", md: "flex" }}
                    marginRight={4}
                  >
                    <Link href="/loans">
                      <Button w="full" variant="ghost">
                        Loans
                      </Button>
                    </Link>
                  </HStack>

                  <HStack
                    as={"nav"}
                    spacing={4}
                    display={{ base: "none", md: "flex" }}
                    marginRight={4}
                  >
                    <Link href="/profile">
                      <Button w="full" variant="ghost">
                        Profile
                      </Button>
                    </Link>
                  </HStack>
                </>
              )}

              <HStack className="text-black">
                <ConnectButton
                    w='100%'
                    h='200px'
                    bgGradient='linear(red.100 0%, orange.100 25%, yellow.100 50%)'
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                  }}
                />
              </HStack>
            </div>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            {account.isConnected && (
              <>
                <Stack as={"nav"} spacing={4}>
                  <Link href="/aadhaar-login">
                    <Button w="full" variant="ghost">
                      Aadhaar Login
                    </Button>
                  </Link>
                </Stack>
                <Stack as={"nav"} spacing={4}>
                  <Link href="/mint-nft">
                    <Button w="full" variant="ghost">
                      Mint NFT
                    </Button>
                  </Link>
                </Stack>
                <Stack as={"nav"} spacing={4}>
                  <Link href="/create-loan">
                    <Button w="full" variant="ghost">
                      Create Loan
                    </Button>
                  </Link>
                </Stack>
                <Stack as={"nav"} spacing={4}>
                  <Link href="/loans">
                    <Button w="full" variant="ghost">
                      Loans
                    </Button>
                  </Link>
                </Stack>

                <Stack as={"nav"} spacing={4}>
                  <Link href="/profile">
                    <Button w="full" variant="ghost">
                      Profile
                    </Button>
                  </Link>
                </Stack>
              </>
            )}
          </Box>
        ) : null}
      </Box>
    </>
  );
}
