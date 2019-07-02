import React from 'react';
import { connect } from 'react-redux';
import TransactionEntryView from './transactionEntry';
import {
  Redirect,
} from "react-router-dom";

class PreTransactionEntryView extends React.Component {
  render() {
    const { isAuth } = this.props;
    if (isAuth) {
      return <TransactionEntryView />
    }
    return <Redirect to='/' />
  }
}

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, null)(PreTransactionEntryView);