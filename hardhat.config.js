require('@nomiclabs/hardhat-waffle');
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require('hardhat-contract-sizer');
require('hardhat-docgen');
require('solidity-coverage')
require("dotenv").config({ path: "./.env" })
require('hardhat-abi-exporter');

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

function getPrivateKey(networkName) {
  if (networkName) {
    const privateKey = process.env['PRIVATE_KEY_' + networkName.toUpperCase()];
    if (privateKey && privateKey !== '') {
      return privateKey;
    }
  }

  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey === '') {
    return 'notsecureprivatekey'
  }

  return privateKey;
}

module.exports = {
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yul: true
        }
      },
      viaIR : false
    },
  },
  networks: {
    immutableZkevmTestnet: {
      url: "https://rpc.testnet.immutable.com",
      accounts: [getPrivateKey('immutableZkevmTestnet')],
    },
    immutableZkevmMainnet: {
      url: "https://rpc.immutable.com",
      accounts: [getPrivateKey('immutableZkevmMainnet')],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: 'immutableZkevmTestnet',
        chainId: 13473,
        urls: {
          apiURL: 'https://explorer.testnet.immutable.com/api',
          browserURL: 'https://explorer.testnet.immutable.com',
        },
      },
      {
        network: 'immutableZkevmMainnet',
        chainId: 13371,
        urls: {
          apiURL: 'https://explorer.immutable.com/api',
          browserURL: 'https://explorer.immutable.com',
        },
      },
    ],
  },
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: true,
  },
  abiExporter: [
    {
      path: './abi/json',
      format: "json",
    },
    {
      path: './abi/minimal',
      format: "minimal",
    },
    {
      path: './abi/fullName',
      format: "fullName",
    },
  ]
};
