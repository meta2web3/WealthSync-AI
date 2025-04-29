# WealthSync-AI-MVP

![WealthSync AI Logo](assets/logo.png)

> Grow Your Crypto, Your Way – AI-Powered Wealth on XDC

## Project Overview

WealthSync-AI is an AI-powered wealth management platform built on the XDC Network for the ETH Dubai hackathon. It enables crypto holders to transform idle assets into active wealth by setting daily profit goals (e.g., 1%). An AI model analyzes market trends to recommend buy/sell trades, which users approve via a web interface. Approved trades are executed securely using XDC smart contracts.

## Key Features

- **AI-Driven Recommendations**: Suggests buy/sell trades based on user-defined profit goals
- **Human-in-the-Loop**: Users approve trades for full control
- **Smart Contract Execution**: Secure trade execution on the XDC Network
- **Wallet Integration**: Supports XDC-compatible wallets (e.g., MetaMask)
- **Testnet Ready**: Built for the XDC Apothem testnet

## Tech Stack

- **Blockchain**: XDC Network (Apothem testnet)
- **Smart Contracts**: Solidity
- **AI/ML**: Python (pandas, ccxt)
- **Frontend**: React.js
- **Backend**: Node.js/Express
- **Wallet Integration**: MetaMask (XDC-configured)
- **APIs**: REST APIs
- **License**: MIT License ([LICENSE](LICENSE))

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: v18.17.0 or v16.x (Install with nvm: `nvm install 18` or `nvm install 16`)
- **Python**: 3.8+ (`python3 --version`)
- **MetaMask**: Browser extension configured for XDC Apothem testnet
- **Git**: For cloning the repository (`git --version`)
- **Hardhat**: For smart contract deployment (`npm install -g hardhat`)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/WealthSync-AI-MVP.git
cd WealthSync-AI-MVP
```

Replace `your-username` with your GitHub username.

### 2. Configure MetaMask for XDC Apothem Testnet

Open MetaMask and add a custom network:

- Network Name: `Apothem Network`
- RPC URL: `https://rpc.apothem.network`
- Chain ID: `51`
- Currency Symbol: `XDC`

Fund your wallet with test XDC from the Apothem Faucet.

### 3. Install Project Dependencies

**Backend Dependencies:**
```bash
cd backend
npm install
```

**Frontend Dependencies:**
```bash
cd ../frontend
npm install
```

**Python Dependencies (for AI model):**
```bash
cd ../ai-model
python3 -m venv ../env  # Create virtual environment if not exists
source ../env/bin/activate
pip install pandas ccxt
```

**Smart Contract Dependencies:**
```bash
cd ..
npm install
```

### 4. Configure Environment Variables

**Backend:**
Create `backend/.env` with:
```plaintext
XDC_RPC_URL=https://rpc.apothem.network
PRIVATE_KEY=0xYourPrivateKeyHere  # Your MetaMask private key (with test XDC)
CONTRACT_ADDRESS=0xDeployedContractAddress  # Update after deployment
```

**Frontend:**
Create `frontend/.env` with:
```plaintext
REACT_APP_CONTRACT_ADDRESS=0xDeployedContractAddress  # Update after deployment
```

> ⚠️ Warning: Never commit `.env` files to Git. Use a test wallet for the hackathon.

### 5. Deploy Smart Contract

Compile and deploy the TradeExecutor smart contract to the XDC Apothem testnet:

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network apothem
```

1. Copy the deployed contract address from the terminal output
2. Update `backend/.env` and `frontend/.env` with `CONTRACT_ADDRESS=0xDeployedContractAddress`
3. Copy the contract ABI to the backend:
```bash
cp artifacts/contracts/TradeExecutor.sol/TradeExecutor.json backend/src/
```

### 6. Test the AI Model (Optional)

Verify the AI model works standalone:

```bash
cd ai-model
source ../env/bin/activate
python market_analysis.py 1
```

Expected Output:
```json
{
  "action": "buy",
  "token": "BTC",
  "amount": 0.01,
  "predicted_profit": 7.123456789
}
```

### 7. Start the Backend

```bash
cd backend
node src/index.js
```

Verify it's running at `http://localhost:3001`.

### 8. Start the Frontend

```bash
cd frontend
npm start
```

The app will open at `http://localhost:3000`.

## Usage

1. **Connect Wallet**
   - Open `http://localhost:3000`
   - Click Connect Wallet to link MetaMask (Apothem testnet)

2. **Set Profit Target**
   - Enter a daily profit target (e.g., 1%) in the input field

3. **Get Recommendation**
   - Click Get Recommendation to fetch an AI-driven trade suggestion (e.g., "Action: buy, Token: BTC")

4. **Request Trade**
   - Click Request Trade to submit the trade to the smart contract

5. **Approve Trade**
   - As the contract owner (using the wallet tied to PRIVATE_KEY), approve the trade via the UI

6. **Verify Transaction**
   - Check the transaction on the Apothem Explorer using the contract address or transaction hash

## Project Structure

```plaintext
WealthSync-AI-MVP/
├── ai-model/
│   └── market_analysis.py      # AI script for trade recommendations
├── backend/
│   └── src/
│       ├── index.js            # Backend API
│       └── TradeExecutor.json  # Contract ABI
├── contracts/
│   └── TradeExecutor.sol       # Smart contract
├── frontend/
│   ├── public/
│   │   └── index.html          # HTML entry point
│   ├── src/
│   │   ├── index.js            # React bootstrap
│   │   ├── App.js              # Main component
│   │   ├── TradeApproval.js    # Trade approval component
├── scripts/
│   └── deploy.js               # Contract deployment script
├── hardhat.config.js           # Hardhat configuration
├── README.md                   # This file
└── LICENSE                     # MIT License
```

## Troubleshooting

### Backend 500 Error

**Symptoms:** GET /recommendation returns 500 (Internal Server Error)

**Fix:**
1. Check backend terminal logs for PythonShell Error or JSON Parse Error
2. Ensure pandas and ccxt are installed:
```bash
cd ai-model
source ../env/bin/activate
pip install pandas ccxt
```
3. Verify pythonPath in backend/src/index.js matches your virtual environment's Python:
```bash
source env/bin/activate
which python
```

### Frontend Errors

**Symptoms:** UI fails to load or shows contract/wallet errors

**Fix:**
1. Ensure `REACT_APP_CONTRACT_ADDRESS` in `frontend/.env` matches the deployed contract address
2. Check browser console (F12) for Axios or contract errors
3. Verify MetaMask is connected to Apothem testnet

### Contract Deployment

**Symptoms:** Deployment fails with "insufficient funds" or "invalid address"

**Fix:**
1. Fund your wallet with test XDC: [Apothem Faucet](https://faucet.apothem.network)
2. Verify `PRIVATE_KEY` in `backend/.env` is correct

### Python Issues

**Symptoms:** market_analysis.py fails with ModuleNotFoundError

**Fix:**
1. Test standalone:
```bash
cd ai-model
python market_analysis.py 1
```
2. Reinstall dependencies:
```bash
pip install pandas ccxt
```
## Hackathon Notes

### Demo
Record a 3-minute video showing:
- Wallet connection
- Setting a profit target
- Fetching a recommendation
- Requesting and approving a trade
- Verifying on the Apothem Explorer

### Submission
Include:
- GitHub repository link
- UI screenshot
- Deployed contract address

### XDC Network
Emphasize XDC's low fees and fast transactions in your presentation.

---
Built for ETH Dubai Hackathon | Powered by XDC Network

        