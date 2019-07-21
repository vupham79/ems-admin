import React from "react";
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import PageTitle from "../../components/pageTitle";
import {
  getShareTypes,
  updateShareType,
  addShareType,
  removeShareType
} from "../../action";
import { bindActionCreators } from "redux";
import "./style.css";

class ShareholdersView extends React.Component {
  state = {
    sharetype: {},
    newSharetype: {},
    removeShareType: {},
    isEdit: false,
    isAdd: false,
    isRemove: false
  };

  componentDidMount() {
    const { getShareTypes, selectedCompany } = this.props;
    if (selectedCompany) {
      getShareTypes({
        id: selectedCompany.Id
      });
    }
  }

  onEditToggle = sharetype => {
    this.setState(prevState => ({ isEdit: !prevState.isEdit }));
    if (sharetype) {
      this.setState({ sharetype });
    }
  };

  onAddToggle = () => {
    this.setState(prevState => ({ isAdd: !prevState.isAdd }));
  };

  onAdd = async () => {
    const { getShareTypes, addShareType, selectedCompany } = this.props;
    const { newSharetype } = this.state;
    const add = await addShareType({
      ...newSharetype,
      CompanyId: selectedCompany.Id
    });
    if (add) {
      await getShareTypes({
        id: selectedCompany.Id
      });
    }
    this.onAddToggle();
  };

  onRemoveToggle = removeShareType => {
    this.setState(prevState => ({
      isRemove: !prevState.isRemove
    }));
    if (removeShareType) {
      this.setState({
        removeShareType
      });
    }
  };

  onRemove = async () => {
    const { removeShareType, getShareTypes, selectedCompany } = this.props;
    const { removeShareType: sharetype } = this.state;
    const remove = await removeShareType({
      Id: sharetype.Id
    });
    if (remove) {
      await getShareTypes({
        id: selectedCompany.Id
      });
    }
    this.onRemoveToggle();
  };

  onChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case "Name":
        this.setState(prevState => ({
          sharetype: {
            ...prevState.sharetype,
            Name: value
          }
        }));
        break;
      default:
        break;
    }
  };

  onChangeNewSharetype = event => {
    const { name, value } = event.target;
    switch (name) {
      case "Name":
        this.setState(prevState => ({
          newSharetype: {
            ...prevState.newSharetype,
            Name: value
          }
        }));
        break;
      default:
        break;
    }
  };

  onSave = async () => {
    const { getShareTypes, updateShareType, selectedCompany } = this.props;
    const { sharetype } = this.state;
    const update = await updateShareType({
      ...sharetype,
      CompanyId: selectedCompany.Id
    });
    if (update) {
      await getShareTypes({
        id: selectedCompany.Id
      });
    }
    this.onEditToggle();
  };

  renderModalEdit = () => {
    const { sharetype } = this.state;
    return (
      <Modal show={this.state.isEdit}>
        <Modal.Header>
          <Modal.Title>Id: {sharetype.Id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalDiv">
            <p>Name</p>
            <input
              className={"input50"}
              name={"Name"}
              onChange={this.onChange}
              value={sharetype.Name}
            />
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
    );
  };

  renderModalAdd = () => {
    const { newSharetype } = this.state;
    return (
      <Modal show={this.state.isAdd}>
        <Modal.Header>
          <Modal.Title>Add new</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalDiv">
            <p>Name</p>
            <input
              className={"input50"}
              name={"Name"}
              onChange={this.onChangeNewSharetype}
              value={newSharetype.Name}
            />
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
    );
  };

  renderModalDelete = () => {
    const { removeShareType } = this.state;
    return (
      <Modal show={this.state.isRemove}>
        <Modal.Header>
          <Modal.Title>Add new</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalDiv">
            <p>
              You want to remove sharetype #{removeShareType.Id} -{" "}
              {removeShareType.Name}?
            </p>
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
    );
  };

  render() {
    const { sharetypes } = this.props;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Share Types" className="text-sm-left" />
          {/* <Button variant="info" size="sm" onClick={this.onAddToggle}>
            Add Share Type
          </Button> */}
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
                    </tr>
                  </thead>
                  <tbody>
                    {sharetypes &&
                      sharetypes.map((entry, index) => {
                        const { Id, Name } = entry;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{Id}</td>
                            <td>{Name}</td>
                            {/* <td>
                              <Button
                                onClick={() => this.onEditToggle(entry)}
                                variant={"primary"}
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => this.onRemoveToggle(entry)}
                                variant={"danger"}
                              >
                                Remove
                              </Button>
                            </td> */}
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
    sharetypes: state.company.ShareTypes,
    selectedCompany: state.user.selectedCompany
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getShareTypes,
      updateShareType,
      addShareType,
      removeShareType
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareholdersView);
