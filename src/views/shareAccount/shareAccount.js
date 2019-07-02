import React from 'react';
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import PageTitle from '../../components/pageTitle';
import { getShareAccounts } from '../../action';
import { bindActionCreators } from 'redux';
import './style.css';

class ShareAccountView extends React.Component {
  state = {
    shareAccount: {},
    newShareAccount: {
      Username: '',
      ShareholderTypeId: 0,
      IsPublic: true,
    },
    isEdit: false,
    isAdd: false,
  }

  componentDidMount() {
    const { getShareAccounts } = this.props;
    getShareAccounts({
      id: 7
    });
  }

  render() {
    const { shareAccounts } = this.props;
    const { shareAccount, newShareAccount } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Share Accounts" className="text-sm-left" />
          <Button variant="primary" size="sm" onClick={this.onAddToggle}>Add Share Account</Button>
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
                        Avatar
                  </th>
                      <th scope="col" className="border-0">
                        Name
                  </th>
                      <th scope="col" className="border-0">
                        Email
                  </th>
                      <th scope="col" className="border-0">
                        Phone
                  </th>
                      <th scope="col" className="border-0">
                        Share Type
                  </th>
                      <th scope="col" className="border-0">
                        Balance
                  </th>
                      <th scope="col" className="border-0">

                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shareAccounts && shareAccounts.map((entry, index) => {
                      const { ShareType, Shareholder: { UserAccount } } = entry;
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{UserAccount.ImageUrl}</td>
                          <td>{UserAccount.FirstName + ' ' + UserAccount.LastName}</td>
                          <td>{UserAccount.Email}</td>
                          <td>{UserAccount.Phone}</td>
                          <td>{ShareType.Name}</td>
                          <td>{entry.Balance}</td>
                          <td className={'btnGroup'}>
                            <Button onClick={() => this.onEditToggle(entry)} variant={'primary'}>
                              Edit
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                    <Modal show={this.state.isEdit} onHide={this.onEditToggle}>
                      <Modal.Header closeButton onHide={this.onEditToggle}>
                        <Modal.Title>{shareAccount.UserAccount && shareAccount.UserAccount.Email}</Modal.Title>
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
                    <Modal show={this.state.isAdd} onHide={this.onAddToggle}>
                      <Modal.Header closeButton onHide={this.onAddToggle}>
                        <Modal.Title>Add Shareholder</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className='modalDiv'>
                          <p>Shareholder</p>
                          {/* <input name='ShareholderId' onChange={this.onChangeNewShareAccount} value={newShareAccount.Username} /> */}
                        </div>
                        <div className='modalDiv'>
                          <p>Share Type</p>
                          {/* <Form.Control as="select" id='ShareholderTypeId' onChange={this.onChangeNewShareholder}>
                            {shareholderTypes.map(type => {
                              return (
                                <option key={type.Id} value={type.Id}>{type.Name}</option>
                              )
                            })}
                          </Form.Control> */}
                        </div>
                        <div className='modalDiv'>
                          <p>Balance</p>
                          {/* <input name='ShareholderId' onChange={this.onChangeNewShareAccount} value={newShareAccount.Username} /> */}
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.onAddToggle}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={this.onAdd}>
                          Add
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
    )
  }
}

const mapStateToProps = state => {
  return {
    shareAccounts: state.company.ShareAccounts,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getShareAccounts
  },
  dispatch,
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareAccountView);