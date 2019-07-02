import React from 'react';
import { connect } from 'react-redux';
import TransactionView from './transaction';
import {
  Redirect,
} from "react-router-dom";

class PreTransactionView extends React.Component {
  render() {
    const { isAuth } = this.props;
    if (isAuth) {
      return <TransactionView />
    }
    return <Redirect to='/' />
  }
}

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, null)(PreTransactionView);