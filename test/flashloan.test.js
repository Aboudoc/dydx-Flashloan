const { ethers } = require("hardhat");
const { expect } = require("chai");
require("dotenv").config();

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const SOLO = "0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e";

describe("dydx", function () {
  describe("dydx flashloan", function () {
    let accounts,
      dydxSoloMargin,
      usdc,
      weth,
      borrowAmount,
      fundAmount,
      fundAmountWeth;

    beforeEach(async function () {
      fundAmount = 2000000n * 10n ** 6n;
      borrowAmount = 800000n * 10n ** 6n;
      fundAmountWeth = 3000n * 10n ** 18n;
      borrowAmountWeth = 1500n * 10n ** 18n;

      accounts = await ethers.getSigners();

      usdc = await ethers.getContractAt("IERC20", USDC);
      weth = await ethers.getContractAt("IWETH", WETH);

      const DydxSoloMargin = await ethers.getContractFactory(
        "TestDydxFlashloan"
      );

      dydxSoloMargin = await DydxSoloMargin.deploy();
      await dydxSoloMargin.deployed();

      await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [process.env.USDC_WHALE],
      });

      await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [process.env.WETH_WHALE],
      });

      const usdcWhale = await ethers.getSigner(process.env.USDC_WHALE);
      const wethWhale = await ethers.getSigner(process.env.WETH_WHALE);

      await usdc
        .connect(usdcWhale)
        .transfer(dydxSoloMargin.address, fundAmount);

      usdcBalance = await usdc.balanceOf(dydxSoloMargin.address);

      await weth
        .connect(wethWhale)
        .transfer(dydxSoloMargin.address, fundAmountWeth);

      wethBalance = await weth.balanceOf(dydxSoloMargin.address);
    });

    it("flashloan", async function () {
      console.log(
        `WETH  balance after funding: ${ethers.utils.formatEther(
          wethBalance
        )} WETH`
      );
      soloBalance = await weth.balanceOf(SOLO);
      console.log(
        `Solo contract balance before the flashloan: ${ethers.utils.formatEther(
          soloBalance
        )} WETH`
      );

      await dydxSoloMargin.initiateFlashloan(WETH, borrowAmountWeth);
    });
  });
});
