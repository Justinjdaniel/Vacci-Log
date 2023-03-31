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
      accounts: [
        '0x0141d7f5c37eaea0df770b9ebd3da42c032243f94f4feb783c56638580e5cb55',
        '0xe7ca76989ee13dbe8bfc581eaebf38c4969099a0b6ddbf5068e6ddadda55fd6e',
      ],
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
