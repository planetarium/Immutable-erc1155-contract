[![codecov](https://codecov.io/gh/planetarium/single-staking-contract/graph/badge.svg?token=gONOYfxaLw)](https://codecov.io/gh/planetarium/single-staking-contract)

# Immutable zkEvm ERC-1155 Contract

Try running some of the following tasks:
- How to set up Immutable Contract Guide : https://docs.immutable.com/tutorials/zkEVM/deploy-contracts/setup
- ERC1155 Example: https://docs.immutable.com/tutorials/zkevm/deploy-contracts/setup/?sample-contracts-with-oal=erc1155

How to setup dev environment

```
$ node --version
v20.4.0

# solidity version
v0.8.19
```

1. Create `.env` file with these keys
```shell
ETHERSCAN_API_KEY=
PRIVATE_KEY_IMMUTABLEZKEVMTESTNET=
PRIVATE_KEY_IMMUTABLEZKEVMMAINNET=
```

2. Clean Cache & Install npm packages
```shell
# If these are already exist, Clean cache
rm -rf node_modules;
rm -f package-lock.json;
npm cache clean --force;

# Install npm packages
npm i
```

3. Compile contracts
```shell
# Compile
npx hardhat compile
```

4. deploy
```shell
npx hardhat run scripts/deploy_IR2SBT1155.js --network immutableZkevmMainnet
```

5. run test & coverage
```shell
npx hardhat test
npx hardhat coverage
```

Additional Information
- NFT ( ERC-721 & ERC-1155) Contract should implement OAL ( Operator Allowlist ) - Link(https://docs.immutable.com/tutorials/zkEVM/deploy-contracts/operator-allowlist)
- Have to override some functions for OAL - Link ( https://docs.immutable.com/tutorials/zkEVM/deploy-contracts/setup#immutable-zkevm-collection-requirements )
- Have to Request Verification at Immutable hub ( https://hub.immutable.com/ )
