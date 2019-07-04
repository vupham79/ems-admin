import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from "shards-react";
import NotFoundImg from '../../asset/notfound.gif';

class NotFoundView extends React.Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <img
          alt='Not found'
          src={NotFoundImg}
          style={{ width: 400, height: 400, display: 'block', margin: 'auto', position: 'relative' }}
        />
        <center><Link to="/">Return to Home Page</Link></center>
      </Container>
    )
  }
}

export default NotFoundView;