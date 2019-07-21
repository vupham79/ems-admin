import React from "react";
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import PageTitle from "../../components/pageTitle";
import SelectSearch from "react-select-search";
import {
  getShareAccounts,
  takeBackShare,
  transferShare,
  getUserAccounts
} from "../../action";
import { bindActionCreators } from "redux";
import "./style.css";

class ShareAccountView extends React.Component {
  state = {
    transfer: {},
    takeback: {},
    isTransfer: false,
    isTakeBack: false,
    accounts: []
  };

  componentDidMount() {
    const {
      getShareAccounts,
      selectedCompany,
      userAccounts,
      getUserAccounts
    } = this.props;
    if (selectedCompany) {
      getShareAccounts({
        id: selectedCompany.Id
      });
      if (!userAccounts) {
        getUserAccounts();
      }
    }
  }

  onTransferToggle = async (Id, fullname) => {
    if (Id && fullname) {
      await this.setState(prevState => ({
        isTransfer: !prevState.isTransfer,
        transfer: {
          resource: Id,
          resourceName: fullname
        }
      }));
      this.filterUsersAccount();
    } else {
      this.setState(prevState => ({
        isTransfer: !prevState.isTransfer
      }));
    }
  };

  onTakeBackToggle = (Id, fullname, balance) => {
    if (Id && fullname) {
      this.setState(prevState => ({
        isTakeBack: !prevState.isTakeBack,
        takeback: {
          resource: Id,
          resourceName: fullname,
          balance
        }
      }));
    } else {
      this.setState(prevState => ({
        isTakeBack: !prevState.isTakeBack
      }));
    }
  };

  onTakeBack = async () => {
    const { takeBackShare, getShareAccounts, selectedCompany } = this.props;
    const { takeback } = this.state;
    const takebackResult = await takeBackShare({
      resource: takeback.resource,
      amount: takeback.amount
    });
    if (takebackResult) {
      getShareAccounts({
        id: selectedCompany.Id
      });
    }
    this.onTakeBackToggle();
  };

  onChangeTransfer = e => {
    const { target } = e;
    if (target.name === "amount") {
      this.setState(prevState => ({
        transfer: {
          ...prevState.transfer,
          amount: target.value
        }
      }));
    }
  };

  onChangeUsername = res => {
    this.setState(prevState => ({
      transfer: {
        ...prevState.transfer,
        destination: res.value
      }
    }));
  };

  onTransfer = async () => {
    const { transferShare, getShareAccounts, selectedCompany } = this.props;
    const { transfer } = this.state;
    const transferResult = await transferShare({
      resource: transfer.resource,
      destination: transfer.destination,
      amount: transfer.amount
    });
    if (transferResult) {
      getShareAccounts({
        id: selectedCompany.Id
      });
    }
    this.onTransferToggle();
  };

  filterUsersAccount = () => {
    const { userAccounts } = this.props;
    const { transfer } = this.state;
    const filterAccounts = userAccounts.filter(
      userAccount => userAccount.Username !== transfer.resource
    );
    const accounts = [];
    filterAccounts.forEach(account => {
      if (account.Email) {
        const obj = {
          name: account.Email,
          value: account.Username
        };
        accounts.push(obj);
      }
    });
    this.setState({ accounts: accounts });
  };

  renderTransferModal = () => {
    const { transfer, accounts } = this.state;
    return (
      <Modal show={this.state.isTransfer}>
        <Modal.Header>
          <Modal.Title>Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalDiv">
            <p>Resource</p>
            <input
              className={"input50"}
              disabled
              value={transfer.resourceName}
            />
          </div>
          <div className="modalDiv">
            <p>Destination</p>
            <SelectSearch
              options={accounts}
              onChange={this.onChangeUsername}
              value={this.state.transfer.destination}
            />
          </div>
          <div className="modalDiv">
            <p>Amount</p>
            <input
              className={"input50"}
              type={"number"}
              name="amount"
              onChange={this.onChangeTransfer}
              value={transfer.amount}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.onTransferToggle}>
            Close
          </Button>
          <Button variant="primary" onClick={this.onTransfer}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  onChangeTakeBack = e => {
    const { target } = e;
    if (target.name === "amount") {
      this.setState(prevState => ({
        takeback: {
          ...prevState.takeback,
          amount: target.value
        }
      }));
    }
  };

  renderTakeBackModal = () => {
    const { takeback } = this.state;
    return (
      <Modal show={this.state.isTakeBack}>
        <Modal.Header>
          <Modal.Title>Take Back</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalDiv">
            <p>Resource</p>
            <input
              className={"input50"}
              name="destination"
              value={takeback.resourceName}
              disabled
            />
          </div>
          <div className="modalDiv">
            <p>Amount</p>
            <input
              className={"input50"}
              type={"number"}
              name="amount"
              onChange={this.onChangeTakeBack}
              value={takeback.amount}
              min={0}
              max={takeback.balance}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.onTakeBackToggle}>
            Close
          </Button>
          <Button variant="primary" onClick={this.onTakeBack}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    const { shareAccounts, selectedCompany } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Share Accounts" className="text-sm-left" />
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
                      <th scope="col" className="border-0" />
                    </tr>
                  </thead>
                  <tbody>
                    {shareAccounts &&
                      shareAccounts.map((entry, index) => {
                        const {
                          Id,
                          ShareType,
                          Shareholder: { UserAccount }
                        } = entry;
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
                            <td>{ShareType.Name}</td>
                            <td>{entry.Balance}</td>
                            <td>
                              {fullname !== "Option Pool" && (
                                <React.Fragment>
                                  <Button
                                    onClick={() =>
                                      this.onTransferToggle(Id, fullname)
                                    }
                                    variant={"outline-info"}
                                  >
                                    Transfer
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      this.onTakeBackToggle(
                                        Id,
                                        fullname,
                                        entry.Balance
                                      )
                                    }
                                    variant={"outline-success"}
                                  >
                                    Take Back
                                  </Button>
                                </React.Fragment>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {this.renderTransferModal()}
                {this.renderTakeBackModal()}
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
    shareAccounts: state.company.ShareAccounts,
    selectedCompany: state.user.selectedCompany,
    userAccounts: state.userAccounts.userAccounts
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getShareAccounts,
      takeBackShare,
      transferShare,
      getUserAccounts
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareAccountView);
