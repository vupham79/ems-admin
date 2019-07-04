import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Container } from "shards-react";
import './style.css';

class NotSelectCompanyView extends React.Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4 wrapper">
        <Link to="/company">
          <Button variant={"info"} className={'btnContinue'}>
            Please select one company to continue
            </Button>
        </Link>
      </Container>
    )
  }
}

export default NotSelectCompanyView;