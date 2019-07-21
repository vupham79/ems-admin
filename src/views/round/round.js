/* eslint-disable array-callback-return */
import React from "react";
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { connect } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import PageTitle from "../../components/pageTitle";
import { getRoundTypes, getRounds, addRound, updateRound } from "../../action";
import { bindActionCreators } from "redux";
import "./style.css";

class RoundView extends React.Component {
  state = {
    filterRounds: [],
    round: {},
    newRound: {
      RoundTypeId: 1
    },
    isEdit: false,
    isAdd: false
  };

  componentDidMount() {
    const { getRoundTypes, getRounds, selectedCompany } = this.props;
    if (selectedCompany) {
      getRoundTypes();
      getRounds({ id: selectedCompany.Id });
    }
  }

  onEditToggle = round => {
    this.setState(prevState => ({ isEdit: !prevState.isEdit }));
    if (round) {
      this.setState(prevState => ({ round: round }));
    }
  };

  onAddToggle = () => {
    this.setState(prevState => ({
      isAdd: !prevState.isAdd
    }));
  };

  filterRounds = () => {
    const { filterRounds } = this.state;
    const { roundTypes, rounds } = this.props;
    if (rounds && roundTypes) {
      roundTypes.forEach(roundType => {
        rounds.forEach(rounds => {
          if (roundType.Id === rounds.RoundTypeId) {
            filterRounds.push({
              ...rounds,
              Name: roundType.Name
            });
          }
        });
      });
    }
  };

  onChangeRound = event => {
    const { target } = event;
    if (target.id) {
      this.setState(prevState => ({
        round: {
          ...prevState.round,
          RoundTypeId: target.value
        }
      }));
    } else {
      switch (target.name) {
        case "PreMoney":
          this.setState(prevState => ({
            round: {
              ...prevState.round,
              PreMoney: target.value
            }
          }));
          break;
        case "OptionPool":
          this.setState(prevState => ({
            round: {
              ...prevState.round,
              OptionPool: target.value
            }
          }));
          break;
        case "PricePerShare":
          this.setState(prevState => ({
            round: {
              ...prevState.round,
              PricePerShare: target.value
            }
          }));
          break;
        default:
          break;
      }
    }
  };

  onChangeNewRound = event => {
    const { target } = event;
    // if (target.id) {
    //   this.setState(prevState => ({
    //     newRound: {
    //       ...prevState.newRound,
    //       RoundTypeId: target.value
    //     }
    //   }));
    // } else {
    switch (target.name) {
      case "PreMoney":
        this.setState(prevState => ({
          newRound: {
            ...prevState.newRound,
            PreMoney: target.value
          }
        }));
        break;
      case "OptionPool":
        this.setState(prevState => ({
          newRound: {
            ...prevState.newRound,
            OptionPool: target.value
          }
        }));
        break;
      // case "PricePerShare":
      //   this.setState(prevState => ({
      //     newRound: {
      //       ...prevState.newRound,
      //       PricePerShare: target.value
      //     }
      //   }));
      //   break;
      default:
        break;
    }
    // }
  };

  onSave = async () => {
    const { updateRound, getRounds, selectedCompany } = this.props;
    const { round } = this.state;
    const update = await updateRound({
      ...round
    });
    if (update) {
      await getRounds({ id: selectedCompany.Id });
      this.setState({ filterRounds: [] });
    }
    this.onEditToggle();
  };

  onAdd = async () => {
    const { addRound, getRounds, selectedCompany } = this.props;
    const { newRound } = this.state;
    const add = await addRound({
      ...newRound,
      CompanyId: selectedCompany.Id
    });
    if (add) {
      await getRounds({ id: selectedCompany.Id });
      this.setState({ filterRounds: [] });
    }
    this.onAddToggle();
  };

  renderAddModal = () => {
    const { newRound, isAdd, filterRounds } = this.state;

    return (
      <Modal show={isAdd}>
        <Modal.Header>
          <Modal.Title>Add Round</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filterRounds.length > 0 ? (
            <React.Fragment>
              <div className="modalDiv">
                <p>Pre-money</p>
                <input
                  className={"input50"}
                  name={"PreMoney"}
                  onChange={this.onChangeNewRound}
                  value={newRound.PreMoney}
                />
              </div>
              <div className="modalDiv">
                <p>Option Pool</p>
                <input
                  className={"input50"}
                  name={"OptionPool"}
                  onChange={this.onChangeNewRound}
                  value={newRound.OptionPool}
                />
              </div>
            </React.Fragment>
          ) : (
            <div className="modalDiv">
              <p>Do you want to create Funding round?</p>
            </div>
          )}
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

  renderEditModal = () => {
    const { round } = this.state;
    const { roundTypes } = this.props;
    return (
      <Modal show={this.state.isEdit}>
        <Modal.Header>
          <Modal.Title>Id: {round.Id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalDiv">
            <p>Round Type</p>
            <Form.Control
              className={"input50"}
              as="select"
              id="RoundTypeId"
              onChange={this.onChangeRound}
              value={round.RoundTypeId}
            >
              {roundTypes &&
                roundTypes.map(type => {
                  return (
                    <option key={type.Id} value={type.Id}>
                      {type.Name}
                    </option>
                  );
                })}
            </Form.Control>
          </div>
          <div className="modalDiv">
            <p>Pre-money</p>
            <input
              className={"input50"}
              name={"PreMoney"}
              onChange={this.onChangeRound}
              value={round.PreMoney}
            />
          </div>
          <div className="modalDiv">
            <p>Option Pool</p>
            <input
              className={"input50"}
              name={"OptionPool"}
              onChange={this.onChangeRound}
              value={round.OptionPool}
            />
          </div>
          <div className="modalDiv">
            <p>Price per Share</p>
            <input
              className={"input50"}
              name={"PricePerShare"}
              onChange={this.onChangeRound}
              value={round.PricePerShare}
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

  render() {
    const { filterRounds } = this.state;
    if (filterRounds.length <= 0) {
      this.filterRounds();
    }
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Rounds" className="text-sm-left" />
          <Button variant="info" size="sm" onClick={this.onAddToggle}>
            Add Round
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
                        Round ID
                      </th>
                      <th scope="col" className="border-0">
                        Name
                      </th>
                      <th scope="col" className="border-0">
                        Pre-money
                      </th>
                      <th scope="col" className="border-0">
                        Option Pool
                      </th>
                      <th scope="col" className="border-0">
                        Price per share
                      </th>
                      {/* <th scope="col" className="border-0" /> */}
                    </tr>
                  </thead>
                  <tbody>
                    {filterRounds &&
                      filterRounds.map((round, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{round.Id}</td>
                            <td>{round.Name}</td>
                            <td>{round.PreMoney ? round.PreMoney : "-"}</td>
                            <td>{round.OptionPool ? round.OptionPool : "-"}</td>
                            <td>
                              {round.PricePerShare ? round.PricePerShare : "-"}
                            </td>
                            {/* <td>
                              <Button
                                onClick={() => this.onEditToggle(round)}
                                variant={"primary"}
                              >
                                Edit
                              </Button>
                            </td> */}
                          </tr>
                        );
                      })}
                    {this.renderAddModal()}
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
    rounds: state.company.Rounds,
    roundTypes: state.roundType.roundTypes,
    selectedCompany: state.user.selectedCompany
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getRoundTypes,
      getRounds,
      addRound,
      updateRound
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundView);
