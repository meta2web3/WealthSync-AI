import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TradeApproval from './TradeApproval';
import axios from 'axios';

function App() {
  const [profitTarget, setProfitTarget] = useState(1);
  const [recommendation, setRecommendation] = useState(null);
  const [account, setAccount] = useState(null);
  const [trades, setTrades] = useState([]);

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    setAccount(await signer.getAddress());
  };

  const fetchRecommendation = async () => {
    const response = await axios.get(`http://localhost:3001/recommendation?profitTarget=${profitTarget}`);
    setRecommendation(response.data);
  };

  const requestTrade = async () => {
    if (!recommendation || !account) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      ['function requestTrade(string token, uint256 amount, bool isBuy)'],
      signer
    );
    const tx = await contract.requestTrade(
      recommendation.token,
      ethers.utils.parseEther(recommendation.amount.toString()),
      recommendation.action === 'buy'
    );
    await tx.wait();
    setTrades([...trades, { id: trades.length, ...recommendation, user: account }]);
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>WealthSync AI</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <p>Connected: {account || 'Not connected'}</p>
      <div>
        <label>Daily Profit Target (%): </label>
        <input
          type="number"
          value={profitTarget}
          onChange={(e) => setProfitTarget(e.target.value)}
        />
        <button onClick={fetchRecommendation}>Get Recommendation</button>
      </div>
      {recommendation && (
        <div>
          <h3>Recommendation</h3>
          <p>Action: {recommendation.action}</p>
          <p>Token: {recommendation.token}</p>
          <p>Amount: {recommendation.amount} BTC</p>
          <p>Predicted Profit: {recommendation.predicted_profit.toFixed(2)}%</p>
          <button onClick={requestTrade}>Request Trade</button>
        </div>
      )}
      <h3>Pending Trades</h3>
      {trades.map((trade) => (
        <TradeApproval key={trade.id} trade={trade} />
      ))}
    </div>
  );
}

export default App;