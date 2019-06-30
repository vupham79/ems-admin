import React from 'react';
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import PageTitle from '../../components/pageTitle';
import { getShareholders } from '../../action';
import { bindActionCreators } from 'redux';
import './style.css';

class ShareholdersView extends React.Component {
  state = {

  }

  componentDidMount() {
    const { getShareholders } = this.props;
    getShareholders({
      id: 7
    });
  }

  render() {
    const { shareholders } = this.props;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Shareholders" className="text-sm-left" />
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
                        Type
                  </th>
                      <th scope="col" className="border-0">

                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shareholders && shareholders.map((entry, index) => {
                      const { UserAccount, ShareholderType } = entry;
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{UserAccount.ImageUrl}</td>
                          <td>{UserAccount.FirstName + ' ' + UserAccount.LastName}</td>
                          <td>{UserAccount.Email}</td>
                          <td>{UserAccount.Phone}</td>
                          <td>{ShareholderType.Name}</td>
                          <td className={'btnGroup'}>
                            <Button onClick={() => this.onEditToggle(entry)} variant={'primary'}>
                              Edit
                            </Button>
                            <Button variant={'danger'}>
                              Remove
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                    <Modal show={this.state.isEdit} onHide={this.onEditToggle}>
                      <Modal.Header closeButton onHide={this.onEditToggle}>
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
    )
  }
}

const mapStateToProps = state => {
  return {
    shareholders: state.company.Shareholders,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getShareholders
  },
  dispatch,
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareholdersView);