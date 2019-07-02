import React from 'react';
import { connect } from 'react-redux';
import ShareTypeView from './shareType';
import {
  Redirect,
} from "react-router-dom";

class PreShareTypeView extends React.Component {
  render() {
    const { isAuth } = this.props;
    if (isAuth) {
      return <ShareTypeView />
    }
    return <Redirect to='/' />
  }
}

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, null)(PreShareTypeView);