[![codecov](https://codecov.io/gh/planetarium/single-staking-contract/graph/badge.svg?token=gONOYfxaLw)](https://codecov.io/gh/planetarium/single-staking-contract)

# Immutable zkEvm ERC-1155 Contract

Try running some of the following tasks:

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
PRIVATE_KEY=

```

2. Clean Cache & Install npm packages
```shell
# Clean cache
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
npx hardhat run scripts/deploy_IMT1155.js --network immutableZkevmTestnet
```

4. run test & coverage
```shell
npx hardhat test
npx hardhat coverage
```
