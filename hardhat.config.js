require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: '0.8.0',
  networks: {
    apothem: {
      url: process.env.XDC_RPC_URL || 'https://rpc.apothem.network',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};