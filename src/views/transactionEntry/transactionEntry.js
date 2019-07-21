import React from "react";
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import PageTitle from "../../components/pageTitle";
import { getTransactions } from "../../action";
import { bindActionCreators } from "redux";
import "./style.css";

class TransactionEntryView extends React.Component {
  state = {};

  componentDidMount() {
    // const { getTransactions } = this.props;
    // getTransactions({
    //   id: 7
    // });
  }

  render() {
    const { transactions } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Transactions" className="text-sm-left" />
          <Button variant="info" size="sm" onClick={this.onAddToggle}>
            Add Transaction Entry
          </Button>
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
                      <th scope="col" className="border-0" />
                    </tr>
                  </thead>
                  <tbody>
                    {/* {transactions && transactions.map((entry, index) => {
                      const { Amount, TransactionType, UserAccount, UserAccount1 } = entry;
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{UserAccount.FirstName + ' ' + UserAccount.LastName}</td>
                          <td>{UserAccount1 ? (UserAccount1.FirstName + ' ' + UserAccount1.LastName) : '-'}</td>
                          <td>{entry.RoundId}</td>
                          <td>{TransactionType.Name}</td>
                          <td>{Amount}</td>
                          <td className={'btnGroup'}>
                            <Button onClick={() => this.onEditToggle(entry)} variant={'primary'}>
                              Edit
                            </Button>
                          </td>
                        </tr>
                      )
                    })} */}
                    <Modal show={this.state.isEdit}>
                      <Modal.Header>
                        {/* <Modal.Title>Modal heading</Modal.Title> */}
                      </Modal.Header>
                      <Modal.Body>
                        {/* <div className='modalDiv'>
                          <p>Name</p>
                          <input name={'Name'} onChange={this.onChange} value={company.Name} />
                        </div>
                        <div className='modalDiv'>
                          <p>Address</p>
                          <input name={'Address'} onChange={this.onChange} value={company.Address} />
                        </div>
                        <div className='modalDiv'>
                          <p>Email</p>
                          <input name={'Email'} onChange={this.onChange} value={company.Email} />
                        </div>
                        <div className='modalDiv'>
                          <p>Phone</p>
                          <input name={'Phone'} onChange={this.onChange} value={company.Phone} />
                        </div>
                        <div className='modalDiv'>
                          <p>Established Year</p>
                          <input name={'EstablishedYear'} onChange={this.onChange} value={company.EstablishedYear} />
                        </div> */}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.onEditToggle}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={this.onSave}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
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
    // transactions: state.company.Transactions,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // getTransactions
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionEntryView);
