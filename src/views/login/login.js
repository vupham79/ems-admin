import React from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { login } from "../../action";
import BackImage from "../../asset/background.jpg";
import "./style.css";
import { Redirect } from "react-router-dom";

class LoginView extends React.Component {
  state = {
    user: null
  };

  onLogin = async () => {
    const { login } = this.props;
    const { uid, email, displayName, photoURL, h } = this.props.user;
    await login({
      uid: uid,
      email: email,
      displayName: displayName,
      photoURL: photoURL,
      token: h.b
    });
    return <Redirect to="/company" />;
  };

  render() {
    const { user, signInWithGoogle } = this.props;

    const { User } = this.props;
    if (User.isAuth) {
      return <Redirect to="/company" />;
    } else if (user && user.uid) {
      this.onLogin();
    }

    return (
      <div className="wrapper" style={{ backgroundImage: `url(${BackImage})` }}>
        <Form.Group controlId="formBasicEmail" className="formGroup">
          <p className="title">EMS Admin</p>
          <Form.Control
            type="submit"
            value="Login by Email"
            className="btnSubmit"
            onClick={signInWithGoogle}
          />
        </Form.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  User: state.user
});

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
