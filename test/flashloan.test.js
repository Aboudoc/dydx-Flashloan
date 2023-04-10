const { ethers } = require("hardhat");
const { expect } = require("chai");
require("dotenv").config();

const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const SOLO = "0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e";

describe("dydx", function () {
  describe("dydx flashloan", function () {
    let accounts, dydxSoloMargin, usdc, borrowAmount, fundAmount;

    beforeEach(async function () {
      fundAmount = 2000000n * 10n ** 6n;
      borrowAmount = 800000n * 10n ** 6n;

      accounts = await ethers.getSigners();

      usdc = await ethers.getContractAt("IERC20", USDC);

      const DydxSoloMargin = await ethers.getContractFactory(
        "TestDydxFlashloan"
      );

      dydxSoloMargin = await DydxSoloMargin.deploy();
      await dydxSoloMargin.deployed();

      await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [process.env.USDC_WHALE],
      });

      const usdcWhale = await ethers.getSigner(process.env.USDC_WHALE);

      await usdc
        .connect(usdcWhale)
        .transfer(dydxSoloMargin.address, fundAmount);

      usdcBalance = await usdc.balanceOf(dydxSoloMargin.address);
    });

    it("flashloan", async function () {
      console.log(`USDC  balance after funding: ${usdcBalance}`);
      soloBalance = await usdc.balanceOf(SOLO);
      console.log(`Solo contract balance before the flashloan: ${soloBalance}`);

      // await dydxSoloMargin.initiateFlashloan(USDC, borrowAmount);

      //   const usdcBalance = await usdc.balanceOf(accounts[0].address);
      //   console.log("USDC balance after", usdcBalance);
    });
  });
});
