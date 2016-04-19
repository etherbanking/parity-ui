import './index.html';
import 'dapp-styles/dapp-styles.less';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import { logger, WebInteractions } from './middleware';
import Status from './containers/Status';
import Accounts from './containers/Accounts';
import AppList from './containers/AppList';
import configure from './store';
import {Web3Provider} from './provider/web3-provider';
import Web3 from 'web3';
import EthcoreWeb3 from './provider/web3-ethcore-provider';

const web3 = new Web3(new Web3.providers.HttpProvider('/rpc/'));
const ethcoreWeb3 = new EthcoreWeb3(web3);
const web3Interactions = new WebInteractions(web3, ethcoreWeb3);

const storeMiddlewares = [logger, web3Interactions.toMiddleware(), web3Interactions.toResetExtraDataMiddleware()];

const store = configure(storeMiddlewares);
const history = syncHistoryWithStore(browserHistory, store);

const prefix = '/status';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={`${status}/`} component={Status} />
      <Route path={`${status}/accounts`} component={Accounts} />
      <Route path={`${status}/apps`} component={AppList} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

new Web3Provider(web3, ethcoreWeb3, store).start();
