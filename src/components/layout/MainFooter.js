import React from "react";
import PropTypes from "prop-types";

const MainFooter = ({ copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top" style={{ justifyContent: 'center', alignItems: 'center' }}>
    <span className="copyright">{copyright}</span>
  </footer>
);

MainFooter.propTypes = {
  /**
   * Whether the content is contained, or not.
   */
  contained: PropTypes.bool,
  /**
   * The menu items array.
   */
  menuItems: PropTypes.array,
  /**
   * The copyright info.
   */
  copyright: PropTypes.string
};

MainFooter.defaultProps = {
  contained: false,
  copyright: "Copyright © 2019 EMS",
};

export default MainFooter;