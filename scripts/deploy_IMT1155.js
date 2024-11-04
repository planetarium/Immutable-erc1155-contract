const { ethers, upgrades } = require("hardhat");

async function main() {
    const contractName = "IMT1155";
    console.log("Deploying " + contractName + "...");

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const name = 'IMT1155'
    const symbol = 'IMT1155'
    const uri = "https://my-base-uri.com/";

    // const gasOverrides = {
    //     maxPriorityFeePerGas: ethers.utils.parseUnits('30', 'gwei'), // 15 gwei
    //     maxFeePerGas: ethers.utils.parseUnits('50', 'gwei'), // 30 gwei
    //     gasLimit: 5000000
    // };


    /**
     * Contract 의 Constructor 의 OperatorAllowList 의 인자로 들어가는 값은
     * 0x6b969fd89de634d8de3271ebe97734feffcd58ee (Immutable zkEvm Testnet ) 고정입니다.
     */

    const IMT1155Token = await ethers.getContractFactory(contractName);
    const iMT1155Token = await IMT1155Token.deploy(name, symbol, uri, '0x6b969fd89de634d8de3271ebe97734feffcd58ee');
    await iMT1155Token.deployed();

    console.log("erc1155Contract deployed to:", iMT1155Token.address);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
