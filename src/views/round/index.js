import React from 'react';
import { connect } from 'react-redux';
import RoundView from './round';
import {
  Redirect,
} from "react-router-dom";

class PreRoundView extends React.Component {
  render() {
    const { isAuth } = this.props;
    if (isAuth) {
      return <RoundView />
    }
    return <Redirect path='/' />
  }
}

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, null)(PreRoundView);