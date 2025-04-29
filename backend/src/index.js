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
const contractABI = require('../../artifacts/contracts/TradeExecutor.sol/TradeExecutor.json').abi;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Get AI recommendation
app.get('/recommendation', async (req, res) => {
    const { profitTarget } = req.query;
    try {
      PythonShell.run('../ai-model/market_analysis.py', {
        args: [profitTarget],
        mode: 'text',
        pythonPath: '/Users/lokesh/projects/blockchain/wealthsync-ai/env/bin/python' // Verify this path
      }, (err, results) => {
        if (err) {
          console.error('PythonShell Error:', err);
          return res.status(500).json({ error: err.message });
        }
        try {
          const result = JSON.parse(results[0]);
          res.json(result);
        } catch (parseErr) {
          console.error('JSON Parse Error:', parseErr);
          res.status(500).json({ error: 'Failed to parse AI recommendation' });
        }
      });
    } catch (error) {
      console.error('Recommendation Error:', error);
      res.status(500).json({ error: error.message });
    }
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