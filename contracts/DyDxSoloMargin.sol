// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
pragma experimental ABIEncoderV2;

import "./interfaces/DydxFlashloanBase.sol";
import "./interfaces/ICallee.sol";
import "hardhat/console.sol";

contract TestDydxFlashloan is ICallee, DydxFlashloanBase {
    address private constant SOLO = 0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e;
    address public flashUser;

    event Log(string message, uint val);

    struct MyCustomData {
        address token;
        uint repayAmount;
    }

    function initiateFlashloan(address _token, uint _amount) external {
        ISoloMargin solo = ISoloMargin(SOLO);

        uint marketId = _getMarketIdFromTokenAddress(SOLO, _token);

        uint repayAmount = _getRepaymentAmountInternal(_amount);
        IERC20(_token).approve(SOLO, repayAmount);

        Actions.ActionArgs[] memory operations = new Actions.ActionArgs[](3);
        // 3 operations
        operations[0] = _getWithdrawAction(marketId, _amount);
        bytes memory data = abi.encode(
            MyCustomData({token: _token, repayAmount: repayAmount})
        );
        operations[1] = _getCallAction(data);
        operations[2] = _getDepositAction(marketId, repayAmount);

        Account.Info[] memory accountInfo = new Account.Info[](1);
        accountInfo[0] = _getAccountInfo();

        solo.operate(accountInfo, operations);
    }

    function callFunction(
        address sender,
        Account.Info memory account,
        bytes memory data
    ) public override {
        require(msg.sender == SOLO, "!solo");
        require(sender == address(this), "!this contract");

        MyCustomData memory mcd = abi.decode(data, (MyCustomData));
        uint repayAmount = mcd.repayAmount;

        uint bal = IERC20(mcd.token).balanceOf(address(this));
        require(bal >= repayAmount, "bal < repayAmount");

        // Custom code - Arbitrage
        flashUser = sender;
        emit Log("bal", bal);
        emit Log("repay", repayAmount);
        emit Log("profit", bal - repayAmount);
        console.log("bal", bal);
        console.log("repay", repayAmount);
        console.log("profit", bal - repayAmount);
    }
}
