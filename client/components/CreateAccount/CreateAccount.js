import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import every from 'lodash.every';

import validationsData from './validations.data';
import FormValidationDisplay from '../FormValidationDisplay';
import Identicon from '../Identicon';
import styles from './CreateAccount.css';
import Web3Component from '../Web3Component/Web3Component';

export default class AccountDetails extends Web3Component {

  state = {
    validations: [],
    isValid: false
  };

  render () {
    const { open } = this.props;

    return (
      <Dialog
        title='Create Account'
        actions={this.renderDialogActions()}
        open={open}
        autoScrollBodyContent
        onRequestClose={this.onClose}
        >
        {this.renderNoAccountsMsg()}
        {this.renderForm()}
        {this.renderCreatedAccount()}
      </Dialog>
    );
  }

  renderForm () {
    const { password, isValid } = this.state;
    const errorText = isValid ? null : 'fix errors below';
    return (
      <div>
        <TextField
          errorText={errorText}
          fullWidth
          type='password'
          name={'new-account-password'}
          floatingLabelText='Type password'
          value={password}
          onChange={this.modifyPassword}
        />
        {this.renderValidations()}
        <RaisedButton
          label='Submit'
          className={styles.submit}
          primary
          disabled={!isValid}
          onTouchTap={this.submit}
        />
      </div>
    );
  }

  renderValidations () {
    const { password } = this.state;
    if (!password) {
      return;
    }

    return (
      <div>
        {validationsData.map(
          (v, idx) => {
            return (
              <FormValidationDisplay
                text={v.text}
                key={idx}
                isValid={this.state.validations[idx]}
              />
            );
          }
        )}
      </div>
    );
  }

  renderCreatedAccount () {
    const { createdAccount } = this.state;
    if (!createdAccount) {
      return;
    }

    return (
      <p className={styles.newAccount}>
        Your new account is <Identicon seed={createdAccount} /><strong>{createdAccount}</strong>. <br />
        You can now choose it in the top right corner and expose it to dapps.
      </p>
    );
  }

  renderNoAccountsMsg () {
    if (this.props.accounts.length) {
      return;
    }
    return (
      <p className={styles.noAccount}>
        You have no accounts associated with your running parity node.<br />
        Enter a passphrase below and click submit to create one.
      </p>
    );
  }

  submit = () => {
    const createdAccount = this.context.web3.personal.newAccount(this.state.password);
    this.setState({ createdAccount });
  }

  modifyPassword = (evt) => {
    const password = evt.target.value;
    const validations = validationsData.map(v => v.predicate(password));
    const isValid = every(validations);
    this.setState({
      password, isValid, validations
    });
  }

  renderDialogActions () {
    return [
      <FlatButton
        label='Ok'
        secondary
        onTouchTap={this.onClose}
      />
    ];
  }

  onClose = () => {
    this.props.onClose();
  }

  static propTypes = {
    open: React.PropTypes.bool.isRequired,
    accounts: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onClose: React.PropTypes.func.isRequired
  };

}
