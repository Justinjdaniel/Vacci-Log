import { Contract, providers, Wallet } from 'ethers';
import { alchemyKey, contractAddress, wallet } from '../config/config';
import abi from '../contract/abi.json';

const network = 'goerli';

// Define an Alchemy Provider
const alchemyProvider = new providers.AlchemyProvider(network, alchemyKey);

// Create a signer
const signer = new Wallet(wallet.key, alchemyProvider);

const networkExplorerLink = 'https://goerli.etherscan.io/tx/';

// Create a contract instance
const contractInstance = new Contract(contractAddress, abi, signer);

export default { contractInstance, networkExplorerLink };
