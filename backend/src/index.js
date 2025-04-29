const express = require('express');
const { PythonShell } = require('python-shell');
const { ethers } = require('ethers');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider(process.env.XDC_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require('./TradeExecutor.json').abi;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Get AI recommendation
app.get('/recommendation', async (req, res) => {
  const { profitTarget } = req.query;
  PythonShell.run('market_analysis.py', { args: [profitTarget] }, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(JSON.parse(results[0]));
  });
});

// Approve trade (owner only)
app.post('/approve/:tradeId', async (req, res) => {
  try {
    const tx = await contract.approveTrade(req.params.tradeId);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));