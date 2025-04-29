// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TradeExecutor {
    address public owner;
    struct Trade {
        address user;
        string token;
        uint256 amount;
        bool isBuy;
        bool approved;
    }
    mapping(uint256 => Trade) public trades;
    uint256 public tradeCounter;

    event TradeRequested(uint256 tradeId, address user, string token, uint256 amount, bool isBuy);
    event TradeApproved(uint256 tradeId, address user);
    event TradeExecuted(uint256 tradeId, address user, string token, uint256 amount, bool isBuy);

    constructor() {
        owner = msg.sender;
    }

    function requestTrade(string memory token, uint256 amount, bool isBuy) external {
        trades[tradeCounter] = Trade(msg.sender, token, amount, isBuy, false);
        emit TradeRequested(tradeCounter, msg.sender, token, amount, isBuy);
        tradeCounter++;
    }

    function approveTrade(uint256 tradeId) external {
        require(msg.sender == owner, "Only owner can approve");
        require(tradeId < tradeCounter, "Invalid trade ID");
        trades[tradeId].approved = true;
        emit TradeApproved(tradeId, trades[tradeId].user);
    }

    function executeTrade(uint256 tradeId) external {
        require(tradeId < tradeCounter, "Invalid trade ID");
        Trade storage trade = trades[tradeId];
        require(trade.user == msg.sender, "Not your trade");
        require(trade.approved, "Trade not approved");
        // Simulate trade execution (in MVP, no DEX integration)
        emit TradeExecuted(tradeId, msg.sender, trade.token, trade.amount, trade.isBuy);
        delete trades[tradeId];
    }
}