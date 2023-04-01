require('@nomiclabs/hardhat-ethers');
require('dotenv/config');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'ganache',
  networks: {
    hardhat: {},
    ganache: {
      // url:
      //   'https://eth-ganache.alchemyapi.io/v2/' + process.env.ALCHEMY_API_KEY,
      url: 'http://127.0.0.1:8545',
      chainId: 1337,
      accounts: [process.env.GANACHE_PRIVATE_KEY],
    },
    polygon_mumbai: {
      url:
        'https://polygon-mumbai.g.alchemy.com/v2/' +
        process.env.ALCHEMY_API_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
