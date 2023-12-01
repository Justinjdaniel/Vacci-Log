const { writeFileSync } = require('fs');
const { join, resolve } = require('path');
const { updateEnv } = require('./updateEnv/index.cjs');
require('dotenv').config({ path: resolve(__dirname, '../.env') });

async function deploy() {
  try {
    const VaccinationLog = await ethers.getContractFactory('VaccinationLog');
    const contractInstance = await VaccinationLog.deploy();

    console.info('\u001b[42;1m %s \u001b[0m', 'Contract deployed successfully');

    // get deployed network name
    const networkName = contractInstance?.runner?.provider._networkName;

    const contractDetails = `{
    "contractAddress":"${contractInstance?.target}",
    "deployer address":"${contractInstance?.runner?.address}",
    "network":"${networkName}"
  }`;

    // Write the contract address to a file in the same folder
    writeFileSync(join(__dirname, 'deploy.json'), contractDetails);

    const envKey =
      networkName === 'localhost'
        ? 'GANACHE_CONTRACT_ADDRESS'
        : 'CONTRACT_ADDRESS';

    // update the env file with newly deployed contract address
    updateEnv(envKey, contractInstance.target);

    process.exit(0);
  } catch (error) {
    console.error(
      '\u001b[41;1m %s \u001b[0m',
      'Contract deployment failed:',
      error
    );
    process.exit(1);
  }
}

deploy();
