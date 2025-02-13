const { ethers, upgrades } = require("hardhat");

async function main() {
    const contractName = "IR2SBT1155";
    console.log("Deploying " + contractName + "...");

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const name = 'IR2SBT1155'
    const symbol = 'IR2SBT'

    /*
     * Base Uri 주소 확인
     * Testnet = https://ir2-resourece-dev.s3.us-east-2.amazonaws.com/sbt-metadata/
     * Mainnet = https://ir2-sbt.com/sbt-metadata/
     */
    // dev
    const uri = "https://ir2-resourece.s3.us-east-2.amazonaws.com/sbt-metadata/";

    // prod
    // const uri = "https://ir2-sbt.com/sbt-metadata/"

    /*
     * OAL Address Check
     * https://docs.immutable.com/tutorials/zkEVM/deploy-contracts/operator-allowlist#operator-allowlist-values
     * Testnet = 0x6b969fd89de634d8de3271ebe97734feffcd58ee
     * Mainnet = 0x5f5eba8133f68ea22d712b0926e2803e78d89221
     */

    // testnet
    const OalAddress = '0x6b969fd89de634d8de3271ebe97734feffcd58ee'

    // Mainnnet
    // const OalAddress = '0x5f5eba8133f68ea22d712b0926e2803e78d89221'

    const IR2SBT1155Token = await ethers.getContractFactory(contractName);

    const IR2SBT1155T = await IR2SBT1155Token.deploy(name, symbol, uri, OalAddress);
    await IR2SBT1155T.deployed();

    console.log("erc1155Contract deployed to:", IR2SBT1155T.address);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
