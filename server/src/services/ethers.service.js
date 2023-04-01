import { Contract, ContractFactory, providers, Wallet } from 'ethers';
import fs from 'fs';
import artifacts from '../../contracts/VaccinationLog.json' assert { type: 'json' };
import __dirname from '../../dirname.js';
import { alchemyKey, contractAddress, wallet } from '../config/config.js';

const NETWORK = 'maticmum';
const EXPLORER_URL = 'https://mumbai.polygonscan.com/tx/';
const DEPLOY_FILE = __dirname + '/deploy.json';

// Create a provider
const provider = new providers.AlchemyProvider(NETWORK, alchemyKey);

// Create a signer
const signer = new Wallet(wallet.key, provider);

// Define a network explorer link
export const networkExplorerLink = 'https://mumbai.polygonscan.com/tx/';

// Create a contract factory
export const contractFactory = new ContractFactory(
  artifacts.abi,
  artifacts.bytecode,
  signer
);

/**
 * Deploy a contract and save its address and deployer address to a file
 * @returns {Promise<Contract>} A promise that resolves to the deployed contract instance
 * @throws {Error} If the deployment fails
 */
export const deployContract = async () => {
  try {
    const contract = await contractFactory.deploy();
    console.log(`Contract deployed at address: ${contract.address}`);
    const data = {
      contractAddress: contract.address,
      deployerAddress: await signer.getAddress(),
    };
    fs.writeFileSync(DEPLOY_FILE, JSON.stringify(data));
    return contract;
  } catch (error) {
    console.error(`Failed to deploy contract: ${error.message}`);
    throw error;
  }
};

/**
 * Creates a new contract instance
 * @param {string} contractAddress - The address of the contract
 * @param {Array} abi - The ABI of the contract
 * @param {Signer} signer - The signer object
 * @returns {Contract} - The contract instance
 */
const contractInstance = new Contract(contractAddress, artifacts.abi, signer);

export default contractInstance;

// Export the explorer URL for convenience
export const explorerUrl = EXPLORER_URL;

const addPatient = async () => {
  // Define a filter for the PatientAdded event
  // const filter = contractInstance.filters.PatientAdded();

  // // Subscribe to the event using the filter
  // contractInstance.on(filter, (patientCount) => {
  //   // Do something with the patientCount
  //   console.log(patientCount);
  // });

  getEventValue(contractInstance, 'PatientAdded');

  console.log('function called');
  // Call the addPatientWithValidation function
  const patientTxn = await contractInstance.addPatientWithValidation(
    'John Doe',
    20,
    '123 Main St',
    0
  );
  const result = await patientTxn.wait();
};

async function getEventValue(contractInstance, eventName) {
  const filter = contractInstance.filters[eventName]();

  const events = await contractInstance.queryFilter(filter);
  console.log(events);
}

addPatient();
