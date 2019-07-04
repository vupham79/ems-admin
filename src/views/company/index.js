import React from 'react';
import { connect } from 'react-redux';
import CompanyView from './company';
import {
  Redirect,
} from "react-router-dom";

class PreCompanyView extends React.Component {
  render() {
    const { isAuth, storage } = this.props;
    if (isAuth) {
      return <CompanyView storage={storage} />
    }
    return <Redirect to='/' />
  }
}

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps)(PreCompanyView);