import React from 'react';
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import PageTitle from '../../components/pageTitle';
import { getShareTypes, updateShareType, addShareType, removeShareType } from '../../action';
import { bindActionCreators } from 'redux';
import './style.css';

class ShareholdersView extends React.Component {
  state = {
    sharetype: {},
    newSharetype: {},
    removeShareType: {},
    isEdit: false,
    isAdd: false,
    isRemove: false,
  }

  componentDidMount() {
    const { getShareTypes } = this.props;
    getShareTypes({
      id: 7
    });
  }

  onEditToggle = (sharetype) => {
    this.setState(prevState => ({ isEdit: !prevState.isEdit }))
    if (sharetype) {
      this.setState({ sharetype })
    }
  }

  onAddToggle = () => {
    this.setState(prevState => ({ isAdd: !prevState.isAdd }))
  }

  onAdd = async () => {
    const { getShareTypes, addShareType } = this.props;
    const { newSharetype } = this.state;
    const add = await addShareType({
      ...newSharetype,
      CompanyId: 7,
    });
    if (add) {
      await getShareTypes({
        id: 7,
      })
    }
    this.onAddToggle();
  }

  onRemoveToggle = (removeShareType) => {
    this.setState(prevState => ({
      isRemove: !prevState.isRemove,
    }))
    if (removeShareType) {
      this.setState({
        removeShareType
      })
    }
  }

  onRemove = async () => {
    const { removeShareType, getShareTypes } = this.props;
    const { removeShareType: sharetype } = this.state;
    const remove = await removeShareType({
      Id: sharetype.Id
    });
    if (remove) {
      await getShareTypes({
        id: 7,
      })
    }
    this.onRemoveToggle();
  }

  onChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'Name':
        this.setState(prevState => ({
          sharetype: {
            ...prevState.sharetype,
            Name: value,
          }
        }))
        break;
      default:
        break;
    }
  }

  onChangeNewSharetype = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'Name':
        this.setState(prevState => ({
          newSharetype: {
            ...prevState.newSharetype,
            Name: value,
          }
        }))
        break;
      default:
        break;
    }
  }

  onSave = async () => {
    const { getShareTypes, updateShareType } = this.props;
    const { sharetype } = this.state;
    const update = await updateShareType({
      ...sharetype,
      CompanyId: 7,
    })
    if (update) {
      await getShareTypes({
        id: 7,
      })
    }
    this.onEditToggle();
  }

  render() {
    const { sharetypes } = this.props;
    const { sharetype, newSharetype, removeShareType } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Share Types" className="text-sm-left" />
          <Button variant="primary" size="sm" onClick={this.onAddToggle}>Add Share Type</Button>
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
                        Id
                  </th>
                      <th scope="col" className="border-0">
                        Name
                  </th>
                      <th scope="col" className="border-0">

                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sharetypes && sharetypes.map((entry, index) => {
                      const { Id, Name } = entry;
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{Id}</td>
                          <td>{Name}</td>
                          <td className={'btnGroup'}>
                            <Button onClick={() => this.onEditToggle(entry)} variant={'primary'}>
                              Edit
                            </Button>
                            <Button onClick={() => this.onRemoveToggle(entry)} variant={'danger'}>
                              Remove
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                    <Modal show={this.state.isEdit} onHide={this.onEditToggle}>
                      <Modal.Header closeButton onHide={this.onEditToggle}>
                        <Modal.Title>Id: {sharetype.Id}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className='modalDiv'>
                          <p>Name</p>
                          <input name={'Name'} onChange={this.onChange} value={sharetype.Name} />
                        </div>
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
                        <Modal.Title>Add new</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className='modalDiv'>
                          <p>Name</p>
                          <input name={'Name'} onChange={this.onChangeNewSharetype} value={newSharetype.Name} />
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
                    <Modal show={this.state.isRemove} onHide={this.onRemoveToggle}>
                      <Modal.Header closeButton onHide={this.onRemoveToggle}>
                        <Modal.Title>Add new</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className='modalDiv'>
                          <p>You want to remove sharetype #{removeShareType.Id} - {removeShareType.Name}?</p>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.onRemoveToggle}>
                          Cancel
                                </Button>
                        <Button variant="primary" onClick={this.onRemove}>
                          Confirm
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
    sharetypes: state.company.ShareTypes,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getShareTypes, updateShareType, addShareType, removeShareType
  },
  dispatch,
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareholdersView);