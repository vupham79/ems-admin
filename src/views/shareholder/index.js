import React from 'react';
import { connect } from 'react-redux';
import ShareholderView from './shareholder';
import {
  Redirect,
} from "react-router-dom";

class PreShareholderView extends React.Component {
  render() {
    const { isAuth } = this.props;
    if (isAuth) {
      return <ShareholderView />
    }
    return <Redirect to='/' />
  }
}

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, null)(PreShareholderView);