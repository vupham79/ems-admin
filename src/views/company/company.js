import React from "react";
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import PageTitle from "../../components/pageTitle";
import {
  getCompanies,
  updateCompany,
  addCompany,
  selectCompany
} from "../../action";
import { bindActionCreators } from "redux";
import Switch from "../../components/switch";
import "./style.css";

class CompanyView extends React.Component {
  state = {
    isEdit: false,
    isAdd: false,
    company: {},
    newCompany: {
      Name: "",
      Address: "",
      Phone: "",
      EstablishedYear: "",
      Email: "",
      ImageUrl:
        "https://storage.googleapis.com/emsandroid-db602.appspot.com/companies/logo_notfound.png",
      Longitude: 0,
      Latitude: 0
    }
  };

  componentDidMount() {
    const { getCompanies, uid } = this.props;
    getCompanies({
      Username: uid
    });
  }

  onSelect = company => {
    const { selectCompany } = this.props;
    selectCompany(company);
  };

  onEditAvatar = e => {
    const file = e.target.files[0];
    const readerLoad = new FileReader();
    readerLoad.onload = evt => {
      this.setState(prevState => ({
        company: {
          ...prevState.company,
          ImageUrl: evt.target.result
        }
      }));
    };
    const readerBlob = new FileReader();
    readerBlob.onloadend = evt => {
      var blob = new Blob([evt.target.result], { type: "image/jpeg" });
      this.setState(prevState => ({
        company: {
          ...prevState.company,
          blob: blob
        }
      }));
      // uploadCompanyLogo(id, blob, storage);
    };
    readerLoad.readAsDataURL(file);
    readerBlob.readAsArrayBuffer(file);
  };

  onAddAvatar = e => {
    const file = e.target.files[0];
    const readerLoad = new FileReader();
    readerLoad.onload = evt => {
      this.setState(prevState => ({
        newCompany: {
          ...prevState.newCompany,
          ImageUrl: evt.target.result
        }
      }));
    };
    const readerBlob = new FileReader();
    readerBlob.onloadend = evt => {
      var blob = new Blob([evt.target.result], { type: "image/jpeg" });
      this.setState(prevState => ({
        newCompany: {
          ...prevState.newCompany,
          blob: blob
        }
      }));
      // uploadCompanyLogo(id, blob, storage);
    };
    readerLoad.readAsDataURL(file);
    readerBlob.readAsArrayBuffer(file);
  };

  onActiveToggle = () => {
    const { company } = this.state;
    this.setState({
      company: {
        ...company,
        IsActive: !company.IsActive
      }
    });
  };

  onEditToggle = company => {
    this.setState(prevState => ({ isEdit: !prevState.isEdit }));
    if (company) {
      this.setState({ company });
    }
  };

  onAddToggle = () => {
    const { isAdd } = this.state;
    this.setState({ isAdd: !isAdd });
  };

  onSave = async () => {
    const { company } = this.state;
    const { updateCompany, getCompanies, uid, storage } = this.props;
    if (company.Name === "" || company.Email === "" || company.Phone === "") {
    } else {
      const update = await updateCompany(
        {
          ...company
        },
        storage
      );
      if (update) {
        await getCompanies({
          Username: uid
        });
      }
      this.onEditToggle();
    }
  };

  onAdd = async () => {
    const { newCompany } = this.state;
    const { addCompany, getCompanies, uid, storage } = this.props;
    if (
      newCompany.Name === "" ||
      newCompany.Email === "" ||
      newCompany.Phone === ""
    ) {
    } else {
      const add = await addCompany(
        {
          ...newCompany,
          AdminUsername: uid
        },
        storage
      );
      if (add) {
        await getCompanies({
          Username: uid
        });
      }
      this.onAddToggle();
    }
  };

  onChangeNewCompany = event => {
    const { newCompany } = this.state;
    const { name, value } = event.target;

    switch (name) {
      case "Name":
        this.setState({
          newCompany: {
            ...newCompany,
            Name: value
          }
        });
        break;
      case "Address":
        this.setState({
          newCompany: {
            ...newCompany,
            Address: value
          }
        });
        break;
      case "Email":
        this.setState({
          newCompany: {
            ...newCompany,
            Email: value
          }
        });
        break;
      case "Phone":
        this.setState({
          newCompany: {
            ...newCompany,
            Phone: value
          }
        });
        break;
      case "EstablishedYear":
        this.setState({
          newCompany: {
            ...newCompany,
            EstablishedYear: value
          }
        });
        break;
      case "Longitude":
        this.setState({
          newCompany: {
            ...newCompany,
            Longitude: value
          }
        });
        break;
      case "Latitude":
        this.setState({
          newCompany: {
            ...newCompany,
            Latitude: value
          }
        });
        break;
      case "ImageUrl":
        this.setState({
          newCompany: {
            ...newCompany,
            ImageUrl: value
          }
        });
        break;
      default:
        break;
    }
  };

  onChange = event => {
    const { company } = this.state;
    const { name, value } = event.target;

    switch (name) {
      case "Name":
        this.setState({
          company: {
            ...company,
            Name: value
          }
        });
        break;
      case "Address":
        this.setState({
          company: {
            ...company,
            Address: value
          }
        });
        break;
      case "Email":
        this.setState({
          company: {
            ...company,
            Email: value
          }
        });
        break;
      case "Phone":
        this.setState({
          company: {
            ...company,
            Phone: value
          }
        });
        break;
      case "Established Year":
        this.setState({
          company: {
            ...company,
            EstablishedYear: value
          }
        });
        break;
      case "Longitude":
        this.setState({
          company: {
            ...company,
            Longitude: value
          }
        });
        break;
      case "Latitude":
        this.setState({
          company: {
            ...company,
            Latitude: value
          }
        });
        break;
      case "ImageUrl":
        this.setState({
          company: {
            ...company,
            ImageUrl: value
          }
        });
        break;
      case "IsActive":
        this.setState({
          company: {
            ...company,
            IsActive: !this.state.isActive
          }
        });
        break;
      default:
        break;
    }
  };

  renderAddCompany = () => {
    return (
      <React.Fragment>
        <Button className={"btnAdd"} onClick={this.onAddToggle} variant="info">
          Add new company
        </Button>
        {this.renderAddModal()}
      </React.Fragment>
    );
  };

  renderAddModal = () => {
    const { newCompany } = this.state;
    return (
      <Modal show={this.state.isAdd}>
        <Modal.Header>
          <Modal.Title>Add new Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="logoContainer">
            <img className="editLogo" src={newCompany.ImageUrl} />
            <input
              type={"file"}
              className={"input50"}
              name="Logo"
              onChange={this.onAddAvatar}
            />
          </div>
          <div className="modalDiv">
            <p>Name</p>
            <input
              className={"input50"}
              name="Name"
              onChange={this.onChangeNewCompany}
              value={newCompany.Name}
              required
            />
          </div>
          <div className="modalDiv">
            <p>Address</p>
            <input
              className={"input50"}
              name="Address"
              onChange={this.onChangeNewCompany}
              value={newCompany.Address}
              required
            />
          </div>
          <div className="modalDiv">
            <p>Email</p>
            <input
              className={"input50"}
              name="Email"
              onChange={this.onChangeNewCompany}
              value={newCompany.Email}
              required
            />
          </div>
          <div className="modalDiv">
            <p>Phone</p>
            <input
              className={"input50"}
              name="Phone"
              onChange={this.onChangeNewCompany}
              value={newCompany.Phone}
              required
            />
          </div>
          <div className="modalDiv">
            <p>Established Year</p>
            <input
              type={"number"}
              className={"input50"}
              name="EstablishedYear"
              onChange={this.onChangeNewCompany}
              value={newCompany.EstablishedYear}
              required
            />
          </div>
          <div className="modalDiv">
            <p>Longitude</p>
            <input
              type={"number"}
              className={"input50"}
              name="Longitude"
              onChange={this.onChangeNewCompany}
              value={newCompany.Longitude}
            />
          </div>
          <div className="modalDiv">
            <p>Latitude</p>
            <input
              type={"number"}
              className={"input50"}
              name="Latitude"
              onChange={this.onChangeNewCompany}
              value={newCompany.Latitude}
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

  renderEditModal = () => {
    const { company } = this.state;
    return (
      <Modal show={this.state.isEdit}>
        <Modal.Header>
          <Modal.Title>{company.Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="logoContainer">
            <img
              className="editLogo"
              src={
                company.ImageUrl
                  ? company.ImageUrl
                  : "https://storage.googleapis.com/emsandroid-db602.appspot.com/companies/logo_notfound.png"
              }
            />
            <input
              type={"file"}
              className={"input50"}
              onChange={this.onEditAvatar}
              accept="image/jpeg, image/png"
              // value={newCompany.Name}
            />
          </div>
          <div className="modalDiv">
            <p>Name</p>
            <input
              className={"input50"}
              name="Name"
              onChange={this.onChange}
              value={company.Name || ""}
              required
            />
          </div>
          <div className="modalDiv">
            <p>Address</p>
            <input
              className={"input50"}
              name="Address"
              onChange={this.onChange}
              value={company.Address || ""}
              required
            />
          </div>
          <div className="modalDiv">
            <p>Email</p>
            <input
              className={"input50"}
              name="Email"
              onChange={this.onChange}
              value={company.Email || ""}
              required
            />
          </div>
          <div className="modalDiv">
            <p>Phone</p>
            <input
              className={"input50"}
              name="Phone"
              onChange={this.onChange}
              value={company.Phone || ""}
              required
            />
          </div>
          <div className="modalDiv">
            <p>Established Year</p>
            <input
              type={"number"}
              className={"input50"}
              name="EstablishedYear"
              onChange={this.onChange}
              value={company.EstablishedYear || ""}
              required
            />
          </div>
          <div className="modalDiv">
            <p>Latitude</p>
            <input
              type={"number"}
              className={"input50"}
              name="Latitude"
              onChange={this.onChange}
              value={company.Latitude || ""}
            />
          </div>
          <div className="modalDiv">
            <p>Longitude</p>
            <input
              type={"number"}
              className={"input50"}
              name="Longitude"
              onChange={this.onChange}
              value={company.Longtitude || ""}
            />
          </div>
          <div className="modalDiv">
            <p>Active</p>
            <Switch
              className="d-flex"
              enabled={company.IsActive}
              onStateChanged={this.onActiveToggle}
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

  renderCompanies = () => {
    const { selectedCompany, companies } = this.props;
    return companies.map((entry, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <img
            className="logoCompany"
            src={
              entry.ImageUrl
                ? entry.ImageUrl
                : "https://storage.googleapis.com/emsandroid-db602.appspot.com/companies/logo_notfound.png"
            }
          />
        </td>
        <td>{entry.Name}</td>
        <td>{entry.Address}</td>
        <td>{entry.Email}</td>
        <td>{entry.Phone}</td>
        <td>{entry.EstablishedYear}</td>
        <td>
          {entry.IsActive ? (
            <span style={{ color: "#17c671" }}>Available</span>
          ) : (
            <span style={{ color: "#c4183c" }}>Unavailable</span>
          )}
        </td>
        <td>
          {selectedCompany ? (
            entry.Id !== selectedCompany.Id && (
              <Button
                onClick={() => this.onSelect(entry)}
                variant={"outline-info"}
              >
                Select
              </Button>
            )
          ) : (
            <Button
              onClick={() => this.onSelect(entry)}
              variant={"outline-info"}
            >
              Select
            </Button>
          )}
          <Button onClick={() => this.onEditToggle(entry)} variant={"primary"}>
            Edit
          </Button>
        </td>
      </tr>
    ));
  };

  renderTable = () => {
    return (
      <React.Fragment>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Company" className="text-sm-left" />
          <Button variant="info" size="sm" onClick={this.onAddToggle}>
            Add Company
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
                        Logo
                      </th>
                      <th scope="col" className="border-0">
                        Name
                      </th>
                      <th scope="col" className="border-0">
                        Address
                      </th>
                      <th scope="col" className="border-0">
                        Email
                      </th>
                      <th scope="col" className="border-0">
                        Phone
                      </th>
                      <th scope="col" className="border-0">
                        Established Year
                      </th>
                      <th scope="col" className="border-0">
                        Active
                      </th>
                      <th scope="col" className="border-0" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderCompanies()}
                    {this.renderEditModal()}
                    {this.renderAddModal()}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  render() {
    const { companies, isLoading } = this.props;
    return (
      <Container
        fluid
        className={`main-content-container px-4 ${!companies && "wrapper"}`}
      >
        {!isLoading
          ? !companies
            ? this.renderAddCompany()
            : this.renderTable()
          : ""}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    uid: state.user.uid,
    isLoading: state.user.isLoading,
    companies: state.user.companies,
    selectedCompany: state.user.selectedCompany
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCompanies,
      updateCompany,
      addCompany,
      selectCompany
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyView);
