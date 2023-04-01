const VaccinationLog = artifacts.require('VaccinationLog');
const fs = require('fs');
const path = require('path');
const { ethers } = require('hardhat');

module.exports = async function (deployer) {
  // Use deployer to state migration tasks.
  await deployer.deploy(VaccinationLog);
  // Get the deployed instance
  const vaccinationLog = await VaccinationLog.deployed();
  // Get the contract address
  const contractAddress = vaccinationLog.address;
  // Get the deployer address
  const deployerAddress = deployer.networks[deployer.network].from;
  // Get the deployment time
  const deploymentTime = (await ethers.provider.getBlock('latest')).timestamp;
  // Create an object with the addresses
  const addresses = {
    contractAddress,
    deployerAddress,
    deploymentTime,
  };
  // Get the path to the parent folder
  const parentPath = path.join(__dirname, '.');
  // Check if the path exists
  if (fs.existsSync(parentPath)) {
    // Write the object to a json file in the parent folder
    const filePath = path.join(parentPath, 'addresses.json');
    fs.writeFileSync(filePath, JSON.stringify(addresses));
  }
};
