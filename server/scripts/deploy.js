import fs from 'fs';
import __dirname from '../dirname.js';

async function main() {
  const VaccinationLog = await ethers.getContractFactory('VaccinationLog');
  const contractInstance = await VaccinationLog.deploy();

  console.log(
    'Contract deployed to:',
    contractInstance.address,
    'Deployer address:',
    contractInstance.deployTransaction.from
  );
  const data = {
    contractAddress: contractInstance.address,
    deployerAddress: contractInstance.deployTransaction.from,
    deploymentTime: contractInstance.deployTransaction.timestamp,
  };
  fs.writeFileSync(__dirname + '/scripts/deploy.json', JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
