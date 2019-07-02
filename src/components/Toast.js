import React from 'react';
import { Toast } from 'react-bootstrap';
import { connect } from 'react-redux';

class ToastCustom extends React.Component {
  render() {
    return (
      <Toast
        style={{
          position: 'absolute',
          top: 60,
          right: 50,
        }}
        // onClose={handleClose}
        // show={show}
        delay={1000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Bootstrap</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>See? Just like this.</Toast.Body>
      </Toast>
    )
  }
};

const mapStateToProps = state => ({
  toast: state.toast
})

export default connect(mapStateToProps, null)(ToastCustom);
