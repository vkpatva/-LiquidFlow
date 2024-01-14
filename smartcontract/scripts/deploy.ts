import { ethers } from "hardhat";

async function main() {
  const GHOTokenAddress = '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60'
  const liquidityFlow = await ethers.deployContract("LiquidFlow", [GHOTokenAddress]);

  await liquidityFlow.waitForDeployment();

  console.log(
    `Liquidity Contract is deployed at ${liquidityFlow.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
