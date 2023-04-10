# DyDx Solo Margin - flashloan

## Setup the project

```shell
npm init -y
npm install --save-dev hardhat
npx hardhat
```

```shell
npm i @openzeppelin/contracts@^4.3.2
```

## Learn more about DyDx

## DyDxSoloMargin contract

First thing to do, set the address of the contract to call flashloan on dydx (`SOLO`)

Next, set up some state variable, event and struct: `flashUser`, `Log`, `MyCustomData`

## initiateFlashloan() Function

Market ID's
0 WETH
1 SAI
2 USDC
3 DAI

On DyDx the fees that you have to pay for flashloan is **2 wei**

The way you request a flashloan on DyDx is by creating 3 actions:

- Withdraw
- Call callFunction()
- Deposit back

Once we created these 3 actions, we submit it over to the `solo` contract by calling `operate()` and passing in the 3 actions

## callFunction() Function
