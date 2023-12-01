import { AlchemyProvider, Contract, Wallet } from 'ethers';
import artifacts from '../../contracts/VaccinationLog.json' assert { type: 'json' };
import { alchemyKey, contractAddress, wallet } from '../config/config.js';

const isGanache = false;
const NETWORK = 'maticmum';

// Create a provider
const provider = isGanache
  ? new ethers.JsonRpcProvider()
  : new AlchemyProvider(NETWORK, alchemyKey);

// Create a signer
const signer = new Wallet(wallet.key, provider);

// Define a network explorer link
export const networkExplorerLink = 'https://mumbai.polygonscan.com/tx/';

/**
 * Creates a new contract instance
 * @param {string} contractAddress - The address of the contract
 * @param {Array} abi - The ABI of the contract
 * @param {signer} signer - The signer object
 * @returns {Contract} - The contract instance
 */
const contractInstance = new Contract(contractAddress, artifacts.abi, signer);

export default contractInstance;
