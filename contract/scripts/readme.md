# Usage

To compile your contracts, run:

```bash
npx hardhat compile
```

To test your contracts with Ganache, run:

```bash
npx hardhat test --network ganache
```

To deploy your contracts to Mumbai network, run:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

```bash
npx hardhat run --network localhost scripts/deploy.js
```

To verify your contracts on Polygonscan, run:

```bash
npx hardhat verify --network polygon_mumbai <contract_address>
```
