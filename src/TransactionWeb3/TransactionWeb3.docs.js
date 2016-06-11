import React, { Component } from 'react';

import TransactionWeb3 from './';

const transaction = {
  id: '001x0',
  from: '0xe6378318641F99c2B6624700B3f342D1c6E84852',
  to: '0xe6378318641F99c2B6624700B3f342D1c6E84852',
  gas: 10,
  gasPrice: 20,
  nonce: 2,
  value: 2000,
  confirmTransaction: args => console.log('Transaction confirmed:', args),
  rejectTransaction: id => console.log('Transaction rejected: ', id)
};

const containerStyle = { width: 700 }; // mimic sysui chrome extension width

export default class TransactionDocs extends Component {
  render () {
    return (
      <div style={ containerStyle }>
        <h1>Transaction</h1>
        <TransactionWeb3 { ...transaction } />
      </div>
    );
  }
}
