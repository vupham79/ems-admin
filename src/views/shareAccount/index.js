import React from "react";
import { connect } from "react-redux";
import ShareAccountView from "./shareAccount";
import NotSelectCompanyView from "../notSelectCompany";
import { Redirect } from "react-router-dom";

class PreShareAccountView extends React.Component {
  render() {
    const { isAuth, selectedCompany } = this.props;
    if (isAuth) {
      if (!selectedCompany) {
        return <NotSelectCompanyView />;
      }
      return <ShareAccountView />;
    }
    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
  selectedCompany: state.user.selectedCompany
});

export default connect(
  mapStateToProps,
  null
)(PreShareAccountView);
