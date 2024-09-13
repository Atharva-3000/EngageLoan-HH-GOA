// @ts-nocheck comment\
import { useAccount } from "wagmi";
// import Image from 'next/image';
import Nft from '../../../public/assets/NotFound.png'
import {
  Heading,
  HStack,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  FormControl,
  FormLabel,
  Icon,
  Input,
  VisuallyHidden,
  chakra,
  Grid,
  GridItem,
  useToast,
  Tooltip,
  VStack,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon, ChatIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Nftabi from "../../utils/NFT.json";
import LoansAbi from "../../utils/Loans.json";
import DAIAbi from "../../utils/DAI.json";
import DebtTokenAbi from "../../utils/DebtToken.json";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import CardImages from "./CardImages";
// import CardImages from '../../../public/assets/NotFound.png'

const CardComponent = ({ address }) => {
  const [imageURI, setImageURI] = useState("");
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [borrower, setBorrower] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");
  const [currentStep, setCurrentStep] = useState(1);
  const [daiTransfered, setDaiTransfered] = useState(false);
  const [daiTransferedHash, setDaiTransferedHash] = useState("");
  const [daiApproved, setDaiApproved] = useState(false);
  const [daiApprovedHash, setDaiApprovedHash] = useState("");
  const [daiDelegated, setDaiDelegated] = useState(false);
  const [isLendLoan, setisLendLoan] = useState(false);
  const [isLendLoanHash, setisLendLoanHash] = useState("");
  const [lenderFlag, setLenderFlag] = useState(false);
  const [nftId, setNftId] = useState(-1);
  const router = useRouter();
  const nftContractAddress = "0xa672510ccDdBa29202559b88840Bc04629B79c95";

  const { address: userAddress } = useAccount();


  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const generateRandomAmount = () => {
    const min = 100;  // Minimum 3-digit number
    const max = 9999; // Maximum 4-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const checkLender = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const loanContract = new ethers.Contract(address, LoansAbi, signer);
    console.log(loanContract);
    const tempLender = await loanContract.lender();
    console.log(`Comparision: ${userAddress} and ${tempLender}`);
    if (userAddress == tempLender) {
      setLenderFlag(true);
    }
    const tempNftId = await loanContract.NFTId();
    console.log("NFT Id is: " + tempNftId);
    setNftId(tempNftId);
  };

  const claimNFT = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const loanContract = new ethers.Contract(address, LoansAbi, signer);
    console.log(loanContract);
    const tx = await loanContract.checkAndTransferCollateral();
    await tx.wait();
    toast({
      title: "NFT Transferred",
      description:
        "The borrower's collateral NFT is transferred to your account",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    return () => checkLender();
  }, []);

  const tranferDAI = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const daiContract = new ethers.Contract(
      "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
      DAIAbi,
      signer
    );

    const tx = await daiContract.transfer(address, amount);

    const receipt = await tx.wait();
    setDaiTransfered(true);
    setDaiTransferedHash(tx.hash);
  };

  const approveDai = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const loanContract = new ethers.Contract(address, LoansAbi, signer);
    const tx = await loanContract.approvedai();
    const receipt = await tx.wait();
    setDaiApproved(true);
    setDaiApprovedHash(tx.hash);
  };

  const delegateCredit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const ghoDebtTokenContract = new ethers.Contract(
      "0x67ae46EF043F7A4508BD1d6B94DB6c33F0915844",
      DebtTokenAbi,
      signer
    );

    console.log(ghoDebtTokenContract);

    const tx = await ghoDebtTokenContract.approveDelegation(address, amount);

    const receipt = await tx.wait();
    setDaiDelegated(true);
  };

  const lendLoan = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const loanContract = new ethers.Contract(address, LoansAbi, signer);
    const tx = await loanContract.lendLoan(userAddress);
    const receipt = await tx.wait();
    console.log(receipt);

    setisLendLoan(true);
    setisLendLoanHash(tx.hash);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const renderDot = (step) => {
    const isCompleted = step <= currentStep;
    return (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: isCompleted ? "#90CDF4" : "gray",
          marginRight: "8px",
        }}
      />
    );
  };

  const renderStepContent = () => {
    return (
      <VStack spacing={4} align="stretch" className="relative bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 shadow-lg">
        <HStack mb={4}>{[1, 2, 3, 4].map((step) => renderDot(step))}</HStack>
        {currentStep === 1 && (
          <>
            <Button
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              onClick={tranferDAI}
              variant="outline"
              colorScheme="blue"
              mb={4}
            >
              Step 1: Transfer Dai
            </Button>
            {daiTransfered && (
              <Text fontWeight={500} fontFamily={"body"}>
                Dai Transfered Successfully
              </Text>
            )}
            <HStack spacing={4}>
              <Button onClick={handleNextStep}>Next Step</Button>
            </HStack>
          </>
        )}
        {currentStep === 2 && (
          <>
            <Button
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              variant="outline"
              colorScheme="blue"
              onClick={approveDai}
              mb={4}
            >
              Step 2: Approve DAI to AAVE Lending Pool
            </Button>
            {daiApproved && (
              <Text fontWeight={500} fontFamily={"body"}>
                Dai Approved Successfully
              </Text>
            )}
            <HStack spacing={4}>
              <Button onClick={handlePrevStep}>Back</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </HStack>
          </>
        )}
        {currentStep === 3 && (
          <>
            <Button
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              variant="outline"
              colorScheme="blue"
              onClick={delegateCredit}
              mb={4}
            >
              Step 3: Delegate Credit
            </Button>
            {daiDelegated && (
              <Text fontWeight={500} fontFamily={"body"}>
                Dai Delegated Successfully
              </Text>
            )}
            <HStack spacing={4}>
              <Button onClick={handlePrevStep}>Back</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </HStack>
          </>
        )}
        {currentStep === 4 && (
          <>
            <Button
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              variant="outline"
              colorScheme="blue"
              mb={4}
              onClick={lendLoan}
            >
              Step 4: Confirm Transaction
            </Button>
            {isLendLoan && (
              <>
                <Text fontWeight={500} fontFamily={"body"}>
                  Loan Lended Successfully
                </Text>
                <Button>
                  {" "}
                  <a
                    href={`https://sepolia.etherscan.io/tx/${isLendLoanHash}`}
                    target="_blank"
                  >
                    View Transaction
                  </a>
                </Button>
              </>
            )}
            <HStack spacing={4}>
              <Button onClick={handlePrevStep}>Back</Button>
            </HStack>
          </>
        )}
      </VStack>
    );
  };

  const handleSizeClick = (newSize: string) => {
    setSize(newSize);

    onOpen();
  };

  const toast = useToast();
  useEffect(() => {
    const getNFT = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const loanContract = new ethers.Contract(address, LoansAbi, signer);
      const id = await loanContract.NFTId();
      const loanamount = await loanContract.loanAmount();
      const interestrate = await loanContract.interestRate();
      const borrower = await loanContract.borrower();
      const expirationdate = await loanContract.loanExpiration();
      let d = new Date(0);
      d.setUTCSeconds(expirationdate.toString());
      console.log(d.getDay());

      setExpirationDate(d.toString());
      setBorrower(borrower.toString());
      setInterestRate(interestrate.toString());

      setAmount(loanamount.toString());

      const nftId = id.toString();

      const nftcontract = new ethers.Contract(
        "0xa672510ccDdBa29202559b88840Bc04629B79c95",
        Nftabi,
        signer
      );

      const tokenURI = await nftcontract.tokenURI(nftId);
      setImageURI(tokenURI);
    };

    getNFT();
  }, []);

  console.log(borrower.length);

  return (
    <div className="">
      <Center py={6} margin={5}>
        <Box
          h={"full"}
          w={"full"}
          bg={useColorModeValue("", "")}
          boxShadow={"2xl"}
          rounded={"lg"}
          overflow={"hidden"}
          className="border border-transparent hover:border-white rounded-lg"
        >
            {/* <Image src={Nft} alt="Card Image" h={"120px"}
              w={"full"} /> */}
            {/* <Image
              h={"120px"}
              w={"full"}
              src={imageURI}
              // src={CardImages}
              objectFit={"cover"}
              fallbackSrc={"https://placehold.jp/500x150.png?text=Fetching..."}
            /> */}
            <CardImages/>

          <Box p={6} className="relative bg-gray-800 bg-opacity-5 backdrop-blur-md rounded-lg shadow-lg max-w-md mx-auto hover:shadow-white ">
            <Stack spacing={0} align={"center"} mb={5}>
              <Text fontWeight={500} fontFamily={"body"}>
                Loan Amount : $ {generateRandomAmount()}
                {/* $ {amount / 1e18} */}
              </Text>
            </Stack>

            <Stack spacing={0} align={"center"} mb={5}>
              <Text fontWeight={500} fontFamily={"body"}>
                Interest Rate : 0.5 
                {/* {interestRate} */}
                 % *
              </Text>
            </Stack>

            <Stack spacing={0} align={"center"} mb={5}>
              <Text fontWeight={500} fontFamily={"body"}>
                Borrower Address:
                {borrower.slice(0, 5) + "....." + borrower.slice(38, 41)}
              </Text>
            </Stack>

            <Stack spacing={0} align={"center"} mb={5}>
              <Text fontWeight={500} fontFamily={"body"}>
                Expiration Date: XX-XX-XXXX
                {/* {expirationDate.slice(4, 15)} */}
              </Text>
            </Stack>

            <Flex>
              <Button
                w={"full"}
                mt={4}
                bg={useColorModeValue("#ffffff", "#ffffff")}
                color={"black"}
                rounded={"md"}
                _hover={{ 
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                mr={2}
                onClick={() => handleSizeClick("xl")}
              >
                Lend Loan
              </Button>
              {lenderFlag && (
                <Button
                w={"full"}
                mt={4}
                bg={useColorModeValue("#ffffff", "#ffffff")}
                color={"black"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                mr={2}
                  onClick={claimNFT}
                >
                  Claim NFT
                </Button>
              )}
            </Flex>
            <Flex margin="10px">
              <Button
                w={"full"}
                mt={4}
                mr={2}
                bg={useColorModeValue("#ffffff", "gray.100")}
                color={"black"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                <Link
                  href={`https://sepolia.etherscan.io/nft/${nftContractAddress}/${nftId}`}
                  isExternal
                >
                  View NFT <ExternalLinkIcon mx="2px" />
                </Link>
              </Button>
              <Button
                w={"full"}
                mt={4}
                ml={2}
                bg={useColorModeValue("#000000", "#000000")}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                onClick={() => router.push(`/nft/${nftId}`)}
              >
                <Link isExternal>
                  Comment <ChatIcon mx="2px" />
                </Link>
              </Button>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Lend Loan</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{renderStepContent()}</ModalBody>

                <ModalFooter></ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </Center>
    </div>
  );
};

export default CardComponent;
