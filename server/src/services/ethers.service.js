import { Contract, ContractFactory, providers, Wallet } from 'ethers';
import fs from 'fs';
import artifacts from '../../contracts/VaccinationLog.json' assert { type: 'json' };
import __dirname from '../../dirname.js';
import { alchemyKey, contractAddress, wallet } from '../config/config.js';

// Define the network to use
const network = 'goerli';

// Define an Alchemy Provider
const alchemyProvider = new providers.AlchemyProvider(network, alchemyKey);

// Create a signer
const signer = new Wallet(wallet.key, alchemyProvider);

// Define a network explorer link
export const networkExplorerLink = 'https://goerli.etherscan.io/tx/';

// Create a contract factory
export const contractFactory = new ContractFactory(
  artifacts.abi,
  artifacts.bytecode,
  signer
);

export const contractDeployer = async () => {
  const contract = await contractFactory.deploy();

  console.log(`Contract deployed at address: ${contract.address}`);

  const data = {
    contractAddress: contract.address,
    deployerAddress: signer.getAddress(),
  };

  fs.writeFileSync(__dirname + '/deploy.json', JSON.stringify(data));
  return contract;
};

// Create a contract instance
const contractInstance = new Contract(contractAddress, artifacts.abi, signer);

export default contractInstance;
