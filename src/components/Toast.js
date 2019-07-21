import React from "react";
import { Toast } from "react-bootstrap";
import { connect } from "react-redux";
import { closeToast } from "../action";
import FailLogo from "../asset/warning.png";
import SuccessLogo from "../asset/success.jpg";

class ToastCustom extends React.Component {
  render() {
    const { toast, closeToast } = this.props;
    return (
      <Toast
        style={{
          position: "absolute",
          width: 250,
          top: 60,
          right: 50,
          zIndex: 1500,
          backgroundColor: toast.type === "success" ? "green" : "#e02828",
          color: "white",
          display: toast.show ? "inherit" : "none"
        }}
        onClose={closeToast}
        show={toast.show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img
            src={toast.type === "success" ? SuccessLogo : FailLogo}
            className="rounded mr-2"
            style={{ width: "20px", height: "20px" }}
            alt=""
          />
          <strong className="mr-auto" style={{ fontWeight: "bold" }}>
            {toast.header}
          </strong>
          {/* <small>just now</small> */}
        </Toast.Header>
        <Toast.Body>{toast.body}</Toast.Body>
      </Toast>
    );
  }
}

const mapStateToProps = state => ({
  toast: state.toast
});

export default connect(
  mapStateToProps,
  { closeToast }
)(ToastCustom);
