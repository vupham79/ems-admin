import React from "react";
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { connect } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import PageTitle from "../../components/pageTitle";
import {
  getShareholders,
  updateShareholder,
  addShareholder,
  getShareholderTypes,
  getUserAccounts
} from "../../action";
import { bindActionCreators } from "redux";
import SelectSearch from "react-select-search";
import Switch from "../../components/switch";
import "./style.css";

class ShareholdersView extends React.Component {
  state = {
    shareholder: {},
    newShareholder: {
      Username: "",
      ShareholderTypeId: "1",
      balance: 0,
      IsPublic: true
    },
    usersNotShareholder: [],
    isEdit: false,
    isAdd: false
  };

  componentDidMount() {
    const {
      getShareholders,
      shareholderTypes,
      getShareholderTypes,
      selectedCompany,
      getUserAccounts,
      userAccounts
    } = this.props;
    if (selectedCompany) {
      getShareholders({
        id: selectedCompany.Id
      });
      if (!shareholderTypes) {
        getShareholderTypes();
      }
      if (!userAccounts) {
        getUserAccounts();
      }
    }
  }

  onActiveToggle = type => {
    switch (type) {
      case "update":
        this.setState(prevState => ({
          shareholder: {
            ...prevState.shareholder,
            IsActive: !prevState.shareholder.IsActive
          }
        }));
        break;
      default:
        break;
    }
  };

  onPublicToggle = type => {
    switch (type) {
      case "add":
        this.setState(prevState => ({
          newShareholder: {
            ...prevState.newShareholder,
            IsPublic: !prevState.newShareholder.IsPublic
          }
        }));
        break;
      case "update":
        this.setState(prevState => ({
          shareholder: {
            ...prevState.shareholder,
            IsPublic: !prevState.shareholder.IsPublic
          }
        }));
        break;
      default:
        break;
    }
  };

  onEditToggle = shareholder => {
    this.setState(prevState => ({ isEdit: !prevState.isEdit }));
    if (shareholder) {
      this.setState({ shareholder });
    }
  };

  onAddToggle = () => {
    if (!this.state.isAdd) {
      const { userAccounts, shareholders } = this.props;
      const usersNotShareholder = [];
      for (let i = 0; i < userAccounts.length; i++) {
        const userAccount = userAccounts[i];
        for (let j = 0; j < shareholders.length; j++) {
          const shareholder = shareholders[j];
          if (
            !userAccount.Email ||
            userAccount.Username === shareholder.Username
          ) {
            break;
          }
          if (j === shareholders.length - 1) {
            const obj = {
              name: userAccount.Email,
              value: userAccount.Username
            };
            usersNotShareholder.push(obj);
          }
        }
      }
      this.setState({ usersNotShareholder: usersNotShareholder });
    }
    this.setState(prevState => ({ isAdd: !prevState.isAdd }));
  };

  onSave = async () => {
    const { updateShareholder, getShareholders, selectedCompany } = this.props;
    const { shareholder } = this.state;
    const update = await updateShareholder(shareholder, selectedCompany.Id);
    if (update) {
      getShareholders({
        id: selectedCompany.Id
      });
    }
    this.onEditToggle();
  };

  onAdd = async () => {
    const { addShareholder, getShareholders, selectedCompany } = this.props;
    const { newShareholder } = this.state;
    const add = await addShareholder(newShareholder, selectedCompany.Id);
    if (add) {
      getShareholders({
        id: selectedCompany.Id
      });
    }
    this.onAddToggle();
  };

  onChangeNewShareholder = event => {
    const { newShareholder } = this.state;
    const { target } = event;
    if (target.id) {
      this.setState(prevState => ({
        newShareholder: {
          ...prevState.newShareholder,
          ShareholderTypeId: target.value
        }
      }));
    } else {
      switch (target.name) {
        case "IsPublic":
          this.setState({
            newShareholder: {
              ...newShareholder,
              IsPublic: target.value
            }
          });
          break;
        case "Balance":
          this.setState({
            newShareholder: {
              ...newShareholder,
              balance: target.value
            }
          });
          break;
        default:
          break;
      }
    }
  };

  handleChangeSearch = e => {
    this.setState({ searchUsername: e.target.value });
  };

  onChangeUsername = res => {
    this.setState(prevState => ({
      newShareholder: {
        ...prevState.newShareholder,
        Username: res.value
      }
    }));
  };

  renderEditModal = () => {
    const { shareholder } = this.state;
    return (
      <Modal show={this.state.isEdit}>
        <Modal.Header>
          <Modal.Title>
            {shareholder.UserAccount && shareholder.UserAccount.Email}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalDiv">
            <p>Active</p>
            <Switch
              className="d-flex"
              enabled={shareholder.IsActive}
              onStateChanged={() => this.onActiveToggle("update")}
            />
          </div>
          <div className="modalDiv">
            <p>Public</p>
            <Switch
              className="d-flex"
              enabled={shareholder.IsPublic}
              onStateChanged={() => this.onPublicToggle("update")}
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

  renderAddModal = () => {
    const { newShareholder, usersNotShareholder } = this.state;
    const { shareholderTypes } = this.props;
    return (
      <Modal show={this.state.isAdd}>
        <Modal.Header>
          <Modal.Title>Add Shareholder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalDiv">
            <p>Username</p>
            <SelectSearch
              options={usersNotShareholder}
              onChange={this.onChangeUsername}
              value={newShareholder.Username}
            />
          </div>
          <div className="modalDiv">
            <p>Shareholder Type</p>
            <Form.Control
              className={"input50"}
              as="select"
              id="ShareholderTypeId"
              onChange={this.onChangeNewShareholder}
            >
              {shareholderTypes &&
                shareholderTypes.map(type => {
                  return (
                    <option key={type.Id} value={type.Id}>
                      {type.Name}
                    </option>
                  );
                })}
            </Form.Control>
          </div>
          <div className="modalDiv">
            <p>Balance</p>
            <input
              className={"input50"}
              name={"Balance"}
              type={"number"}
              onChange={this.onChangeNewShareholder}
              value={newShareholder.balance}
            />
          </div>
          <div className="modalDiv">
            <p>Public</p>
            <Switch
              className="d-flex"
              enabled={newShareholder.IsPublic}
              onStateChanged={() => this.onPublicToggle("add")}
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

  render() {
    const { shareholders, selectedCompany } = this.props;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Shareholders" className="text-sm-left" />
          <Button variant="info" size="sm" onClick={this.onAddToggle}>
            Add Shareholder
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
                        Public
                      </th>
                      <th scope="col" className="border-0">
                        Active
                      </th>
                      <th scope="col" className="border-0" />
                    </tr>
                  </thead>
                  <tbody>
                    {shareholders &&
                      shareholders.map((entry, index) => {
                        const { UserAccount, ShareholderType } = entry;
                        const fullname =
                          UserAccount.FirstName + " " + UserAccount.LastName;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                className={"logoCompany"}
                                src={
                                  fullname === "Option Pool"
                                    ? selectedCompany.ImageUrl
                                    : UserAccount.ImageUrl
                                }
                                alt={UserAccount.ImageUrl}
                              />
                            </td>
                            <td>{fullname}</td>
                            <td>{UserAccount.Email}</td>
                            <td>{UserAccount.Phone}</td>
                            <td>{ShareholderType.Name}</td>
                            <td>
                              {entry.IsPublic ? (
                                <span style={{ color: "#17c671" }}>True</span>
                              ) : (
                                <span style={{ color: "#c4183c" }}>False</span>
                              )}
                            </td>
                            <td>
                              {entry.IsActive ? (
                                <span style={{ color: "#17c671" }}>True</span>
                              ) : (
                                <span style={{ color: "#c4183c" }}>False</span>
                              )}
                            </td>
                            <td>
                              {fullname !== "Option Pool" && (
                                <React.Fragment>
                                  <Button
                                    onClick={() => this.onEditToggle(entry)}
                                    variant={"primary"}
                                  >
                                    Edit
                                  </Button>
                                </React.Fragment>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    {this.renderAddModal()}
                    {this.renderEditModal()}
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
    shareholderTypes: state.shareholderTypes.shareholderTypes,
    shareholders: state.company.Shareholders,
    selectedCompany: state.user.selectedCompany,
    userAccounts: state.userAccounts.userAccounts
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getShareholders,
      updateShareholder,
      addShareholder,
      getShareholderTypes,
      getUserAccounts
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareholdersView);
