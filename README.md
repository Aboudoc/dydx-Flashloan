# DyDx Solo Margin - flashloan

## Setup the project

```shell
npm init -y
npm install --save-dev hardhat
npx hardhat
```

```shell
npm i @openzeppelin/contracts@^4.3.2
```

### Built With

- [![Hardhat][Hardhat]][Hardhat-url]
- [![Ethers][Ethers.js]][Ethers-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

If you need testnet funds, use the [Alchemy testnet faucet](https://goerlifaucet.com/).

**This project shows how to swap, add and remove liquidity**

## Learn more about dydx

On DyDx the fees that you have to pay for flashloan is **2 wei**

## DyDxSoloMargin contract

First thing to do, set the address of the contract to call flashloan on dydx (`SOLO`)

Next, set up some state variable, event and struct: `flashUser`, `Log`, `MyCustomData`

## initiateFlashloan Function

- Initiate a `solo` contract at the address of `SOLO`
- We need the `marketId`
  Market ID's: 0 WETH; 1 SAI, 2 USDC, 3 DAI
- Calculate the amount that we will need to repay by using `_getRepaymentAmountInternal` provided by `DydxFlashloanBase.sol`
- Approve the SOLO contract to spend the repayment amount
- The way you request a flashloan on DyDx is by creating 3 actions:
  - Withdraw: using `_getWithdrawAction()`
  - Call callFunction(): using `_getCallAction()`
  - Deposit: back using `getDepositAction()`
- We also need `accountInfos[]` that we will get by calling `_getAccountInfo()`
- Once we created these 3 actions in `operations[]`, we submit it over to the `solo` contract by calling `operate()` and passing in the 3 actions and `accountInfos[]`

## callFunction Function

dydx will callback this function

- We only want the `solo` contract to be able to call this function, require it to restrict access
- Check that the initiator of the flashloan is `this` contract by requiring it
- Decode the `data` passed from the input
- From `MyCustomData` decoded get back the `repayAmount`
- Exctract also `bal` to make sure we ahve enough amount to repay back the flashloan
- Write custom code: Arbitrage. For the example we just set `flashUser` state variable and Log bal, repay and profit variables

## Test

## Forking mainnet

`hardhat.config.js`

```sh
  networks: {
        hardhat: {
          forking: {
            url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
       },
     },
  }
```

Note: Replace the `${}` component of the URL with your personal [Alchemy](https://www.alchemy.com/) API key.

```sh
npx hardhat test test/swapV3.test.js
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
