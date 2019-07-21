import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand } from "shards-react";
import { connect } from "react-redux";
import FshopLogo from "../../../asset/fshop.png";
class SidebarMainNavbar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { hideLogoText, selectedCompany } = this.props;
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="#"
            style={{ lineHeight: "25px" }}
          >
            <div
              className="m-auto"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: "40px" }}
                src={selectedCompany ? selectedCompany.ImageUrl : FshopLogo}
                alt={""}
              />
              {!hideLogoText && (
                <span
                  className="d-none d-md-inline ml-1"
                  style={{ verticalAlign: "middle" }}
                >
                  {selectedCompany && selectedCompany.Name}
                </span>
              )}
            </div>
          </NavbarBrand>
          {/* eslint-disable-next-line */}
          <a
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={this.handleToggleSidebar}
          >
            <i className="material-icons">&#xE5C4;</i>
          </a>
        </Navbar>
      </div>
    );
  }
}

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

SidebarMainNavbar.defaultProps = {
  hideLogoText: false
};

const mapStateToProps = state => ({
  selectedCompany: state.user.selectedCompany
});

export default connect(
  mapStateToProps,
  null
)(SidebarMainNavbar);
