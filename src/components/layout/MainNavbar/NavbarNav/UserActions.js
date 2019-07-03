import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../../../action';
import AvatarDefault from '../../../../asset/avatar.jpg';

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  onLogout = async () => {
    const { logout, signOut } = this.props;
    await signOut();
    await logout();
  }

  render() {
    const { userProfile } = this.props;
    if (!userProfile.isAuth) {
      return <Redirect to='/' />
    }

    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={userProfile.photoURL || AvatarDefault}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{userProfile.displayName}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="user-profile">
            {/* <i className="material-icons">&#xE7FD;</i> */}
            Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="edit-user-profile">
            {/* <i className="material-icons">&#xE8B8;</i> */}
            Edit Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="file-manager-list">
            {/* <i className="material-icons">&#xE2C7;</i>  */}
            Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            {/* <i className="material-icons">&#xE896;</i>  */}
            Transactions
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} className="text-danger" onClick={this.onLogout} to='/'>
            {/* <i className="material-icons text-danger">&#xE879;</i>  */}
            Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

const mapStateToProps = state => ({
  userProfile: state.user,
})

export default connect(mapStateToProps, { logout })(UserActions)