require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.9", // Existing version
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
            {
                version: "0.8.20", // Add this version for your contracts
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
        ],
    },
    paths: {
        artifacts: "./src",
    },
    networks: {
        polygonAmoy: {
            url: "https://polygon-amoy.g.alchemy.com/v2/GDPZGLVRyXfR8mvXf5xi80OiOJx8oqX8",
            accounts: [""], // Use environment variable for the private key
            chainId: 80002,
        },
    },
};
