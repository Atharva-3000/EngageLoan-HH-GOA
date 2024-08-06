require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
solidity: "0.8.9",
paths: {
    artifacts: "./src",
},
networks: {
    polygonAmoy: {
    url: "https://polygon-amoy.g.alchemy.com/v2/GDPZGLVRyXfR8mvXf5xi80OiOJx8oqX8",
    accounts: ,
    chainId:80002,
    },
},
};
