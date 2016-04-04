
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import * as TodoActions from '../../actions/todos';
import style from './style.css';

class App extends Component {
  render () {
    const { children } = this.props;
    return (
      <div className={style.normal}>
        <Header />
        {children}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
