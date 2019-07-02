import React from 'react';
import { connect } from 'react-redux';
import ShareAccountView from './shareAccount';
import {
  Redirect,
} from "react-router-dom";

class PreShareAccountView extends React.Component {
  render() {
    const { isAuth } = this.props;
    if (isAuth) {
      return <ShareAccountView />
    }
    return <Redirect to='/' />
  }
}

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, null)(PreShareAccountView);