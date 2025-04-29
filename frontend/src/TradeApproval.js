import React, { useState } from 'react';
import axios from 'axios';

function TradeApproval({ trade }) {
  const [loading, setLoading] = useState(false);

  const approveTrade = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:3001/approve/${trade.id}`);
      alert('Trade approved!');
    } catch (error) {
      alert('Error approving trade: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <p>Trade ID: {trade.id}</p>
      <p>Token: {trade.token}</p>
      <p>Amount: {trade.amount}</p>
      <p>Type: {trade.action}</p>
      <button onClick={approveTrade} disabled={loading}>
        {loading ? 'Approving...' : 'Approve Trade'}
      </button>
    </div>
  );
}

export default TradeApproval;