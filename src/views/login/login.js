import React from "react";
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../../action';
import BackImage from '../../asset/background.jpg';
import './style.css';
import {
  Redirect,
} from "react-router-dom";

class LoginView extends React.Component {
  state = {
    Email: '',
    Password: '',
  }

  onLogin = () => {
    const { login } = this.props;
    login();
  }

  render() {
    const { User } = this.props;
    if (User.isAuth) {
      return <Redirect to='/company' />
    }
    return (
      <div className="wrapper" style={{ backgroundImage: `url(${BackImage})` }}>
        <Form.Group controlId="formBasicEmail" className="formGroup">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
          <Form.Control type="submit" value="Login" className="btnSubmit" onClick={this.onLogin} />
        </Form.Group>
      </div>
    )
  };
}

const mapStateToProps = state => ({
  User: state.user
})

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);