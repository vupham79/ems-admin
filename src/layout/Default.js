import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import './style.css';

class DefaultLayout extends React.Component {
  render() {
    const {
      loadCompany,
      loadRound,
      loadShareAccount,
      loadUser,
      loadShareholder,
      loadShareType,
      loadTransaction,
      loadTransactionEntry } = this.props;
    const { signOut } = this.props;
    const { children, noNavbar, noFooter } = this.props;
    let loading = false;

    if (loadCompany || loadRound || loadShareAccount || loadUser || loadShareholder || loadShareType || loadTransaction || loadTransactionEntry) {
      loading = true;
    } else {
      loading = false;
    }

    return (
      <Container fluid>
        <Row>
          <MainSidebar />
          <Col
            className="main-content p-0"
            lg={{ size: 10, offset: 2 }}
            md={{ size: 9, offset: 3 }}
            sm="12"
            tag="main"
          >
            {!noNavbar && <MainNavbar signOut={signOut} />}
            <Spinner animation="border" role="status" className={'spinner'} style={{ display: !loading ? 'none' : 'inline-table' }}>
              <span className="sr-only">Loading...</span>
            </Spinner>
            {children}
            {!noFooter && <MainFooter />}
          </Col>
        </Row>
      </Container>
    )
  }
};

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

const mapStateToProps = state => ({
  loadCompany: state.company.isLoading,
  loadRound: state.round.isLoading,
  loadShareAccount: state.shareAccount.isLoading,
  loadUser: state.user.isLoading,
  loadShareholder: state.shareholder.isLoading,
  loadShareType: state.shareType.isLoading,
  loadTransaction: state.transaction.isLoading,
  loadTransactionEntry: state.transactionEntry.isLoading,
});

export default connect(
  mapStateToProps,
  null,
)(DefaultLayout);