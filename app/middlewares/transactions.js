import Ws from '../../util/ws';

export default class TransactionsMiddleware {

  constructor () {
    this.ws = new Ws();
  }

  toMiddleware () {
    return store => next => action => {
      let delegate;
      switch (action.type) {
        case 'confirm transaction': delegate = this.onConfirm; break;
        case 'reject transaction': delegate = this.onReject; break;
        default:
          next(action);
          return;
      }

      if (!delegate) {
        return;
      }

      delegate(store, next, action);
    };
  }

  onConfirm = (store, next, action) => {
    const { id, password, gasPrice } = action.payload;
    this.ws.send('personal_confirmTransaction', [ id, {}, password ], (res) => {
      log('res', res);
    });
    return next(action);
  }

  onReject = (store, next, action) => {
    const id = action.payload;
    this.ws.send('personal_rejectTransaction', [ id ], (res) => {
      log('res', res);
    } );
    return next(action);
  }

}
