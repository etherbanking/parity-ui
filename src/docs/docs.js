import '../index.html';
import React from 'react';
import ReactDOM from 'react-dom';

import Web3Provider from '../Web3Provider';
import Web3 from 'web3';
const http = new Web3.providers.HttpProvider('/rpc/');
const web3 = new Web3(http);

import AccountWeb3Docs from '../AccountWeb3/AccountWeb3.docs';
import TransactionWeb3Docs from '../TransactionWeb3/TransactionWeb3.docs';
import AccountLinkDocs from '../AccountLink/AccountLink.docs';
import IdenticonDocs from '../Identicon/Identicon.docs';
import RpcAutoCompleteDocs from '../RpcAutoComplete/RpcAutoComplete.docs';
import MuiThemeProvider from '../MuiThemeProvider';

ReactDOM.render(
  <MuiThemeProvider>
    <Web3Provider web3={ web3 }>
      <div>
        <RpcAutoCompleteDocs />
        <hr />
        <AccountLinkDocs />
        <hr />
        <IdenticonDocs />
        <hr />
        <AccountWeb3Docs />
        <hr />
        <TransactionWeb3Docs />
        <hr />
      </div>
    </Web3Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
