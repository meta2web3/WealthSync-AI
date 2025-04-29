const hre = require('hardhat');

async function main() {
  const TradeExecutor = await hre.ethers.getContractFactory('TradeExecutor');
  const tradeExecutor = await TradeExecutor.deploy();
  await tradeExecutor.deployed();
  console.log('TradeExecutor deployed to:', tradeExecutor.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});