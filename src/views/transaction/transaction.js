import React from "react";
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import PageTitle from "../../components/pageTitle";
import { getTransactions, approveTransaction } from "../../action";
import { bindActionCreators } from "redux";
import "./style.css";

class TransactionView extends React.Component {
  state = {};

  componentDidMount() {
    const { getTransactions, selectedCompany } = this.props;
    if (selectedCompany) {
      getTransactions({
        id: selectedCompany.Id
      });
    }
  }

  onApprove = async id => {
    const { getTransactions, selectedCompany } = this.props;
    if (id) {
      const { approveTransaction } = this.props;
      const approve = await approveTransaction({
        transactionId: id,
        status: true
      });
      if (approve) {
        getTransactions({
          id: selectedCompany.Id
        });
      }
    }
  };

  onReject = async id => {
    const { getTransactions, selectedCompany } = this.props;
    if (id) {
      const { approveTransaction } = this.props;
      const approve = await approveTransaction({
        transactionId: id,
        status: false
      });
      if (approve) {
        getTransactions({
          id: selectedCompany.Id
        });
      }
    }
  };

  renderStatus = status => {
    switch (status) {
      case null || undefined:
        return (
          <span className={"status"} style={{ backgroundColor: "#00b8d8" }}>
            Pending
          </span>
        );
      case true:
        return (
          <span className={"status"} style={{ backgroundColor: "#17c671" }}>
            Approved
          </span>
        );
      case false:
        return (
          <span className={"status"} style={{ backgroundColor: "#5a6169" }}>
            Rejected
          </span>
        );
      default:
        break;
    }
  };

  renderTransactionAction = (status, id) => {
    switch (status) {
      case null || undefined:
        return (
          <React.Fragment>
            <Button
              onClick={() => this.onApprove(id)}
              variant={"outline-success"}
            >
              Approve
            </Button>
            <Button
              onClick={() => this.onReject(id)}
              variant={"outline-danger"}
            >
              Reject
            </Button>
          </React.Fragment>
        );
      default:
        break;
    }
  };

  render() {
    const { transactions } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Transactions" className="text-sm-left" />
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Resource
                      </th>
                      <th scope="col" className="border-0">
                        Target
                      </th>
                      <th scope="col" className="border-0">
                        Round
                      </th>
                      <th scope="col" className="border-0">
                        Type
                      </th>
                      <th scope="col" className="border-0">
                        Amount
                      </th>
                      <th scope="col" className="border-0">
                        Status
                      </th>
                      <th scope="col" className="border-0" />
                    </tr>
                  </thead>
                  <tbody>
                    {transactions &&
                      transactions.map((entry, index) => {
                        const {
                          Amount,
                          TransactionType,
                          UserAccount,
                          UserAccount1,
                          Status,
                          Id
                        } = entry;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {UserAccount
                                ? UserAccount.FirstName +
                                  " " +
                                  UserAccount.LastName
                                : "-"}
                            </td>
                            <td>
                              {UserAccount1
                                ? UserAccount1.FirstName +
                                  " " +
                                  UserAccount1.LastName
                                : "-"}
                            </td>
                            <td>{entry.RoundId}</td>
                            <td>{TransactionType.Name}</td>
                            <td>{Amount}</td>
                            <td>{this.renderStatus(Status)}</td>
                            <td>{this.renderTransactionAction(Status, Id)}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.company.Transactions,
    selectedCompany: state.user.selectedCompany
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTransactions,
      approveTransaction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionView);
