import React from 'react';
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import PageTitle from '../../components/pageTitle';
import { getCompanies, updateCompany, addCompany } from '../../action';
import { bindActionCreators } from 'redux';
import Switch from '../../components/switch';
import './style.css';

class CompanyView extends React.Component {
  state = {
    isEdit: false,
    isAdd: false,
    company: {},
    newCompany: {
      Name: "",
      Address: "",
      Phone: "",
      EstablishedYear: '',
      Email: "",
      Balance: 0,
      ImageUrl: "",
      Longtitude: 0,
      Latitude: 0,
    },
  }

  componentDidMount() {
    const { getCompanies, userProfile } = this.props;
    getCompanies({
      Username: userProfile.uid
    });
  }

  onActiveToggle = () => {
    const { company } = this.state;
    this.setState({
      company: {
        ...company,
        IsActive: !company.IsActive
      }
    })
  }

  onEditToggle = (company) => {
    this.setState(prevState => ({ isEdit: !prevState.isEdit }))
    if (company) {
      this.setState({ company });
    }
  }

  onAddToggle = () => {
    const { isAdd } = this.state;
    this.setState({ isAdd: !isAdd })
  }

  onSave = async () => {
    const { company } = this.state;
    const { updateCompany, getCompanies, userProfile } = this.props;
    const update = await updateCompany({
      ...company,
    });
    if (update) {
      await getCompanies({
        Username: userProfile.uid
      });
    }
    this.onEditToggle();
  }

  onAdd = async () => {
    const { newCompany } = this.state;
    const { addCompany, getCompanies, userProfile } = this.props;
    const add = await addCompany({
      ...newCompany,
      AdminUsername: userProfile.uid,
    });
    if (add) {
      await getCompanies({
        Username: userProfile.uid
      });
    }
    this.onAddToggle();
  }

  onChangeNewCompany = event => {
    const { newCompany } = this.state;
    const { name, value } = event.target;

    switch (name) {
      case 'Name':
        this.setState({
          newCompany: {
            ...newCompany,
            Name: value
          }
        })
        break;
      case 'Address':
        this.setState({
          newCompany: {
            ...newCompany,
            Address: value
          }
        })
        break;
      case 'Email':
        this.setState({
          newCompany: {
            ...newCompany,
            Email: value
          }
        })
        break;
      case 'Phone':
        this.setState({
          newCompany: {
            ...newCompany,
            Phone: value
          }
        })
        break;
      case 'Established Year':
        this.setState({
          newCompany: {
            ...newCompany,
            EstablishedYear: value
          }
        })
        break;
      case 'Longtitude':
        this.setState({
          newCompany: {
            ...newCompany,
            Longtitude: value
          }
        })
        break;
      case 'Latitude':
        this.setState({
          newCompany: {
            ...newCompany,
            Latitude: value
          }
        })
        break;
      case 'ImageUrl':
        this.setState({
          newCompany: {
            ...newCompany,
            ImageUrl: value
          }
        })
        break;
      case 'Balance':
        this.setState({
          newCompany: {
            ...newCompany,
            Balance: value
          }
        })
        break;
      default:
        break;
    }
  }

  onChange = event => {
    const { company } = this.state;
    const { name, value } = event.target;

    switch (name) {
      case 'Name':
        this.setState({
          company: {
            ...company,
            Name: value
          }
        })
        break;
      case 'Address':
        this.setState({
          company: {
            ...company,
            Address: value
          }
        })
        break;
      case 'Email':
        this.setState({
          company: {
            ...company,
            Email: value
          }
        })
        break;
      case 'Phone':
        this.setState({
          company: {
            ...company,
            Phone: value
          }
        })
        break;
      case 'Established Year':
        this.setState({
          company: {
            ...company,
            EstablishedYear: value
          }
        })
        break;
      case 'Longtitude':
        this.setState({
          company: {
            ...company,
            Longtitude: value
          }
        })
        break;
      case 'Latitude':
        this.setState({
          company: {
            ...company,
            Latitude: value
          }
        })
        break;
      case 'Balance':
        this.setState({
          company: {
            ...company,
            Balance: value
          }
        })
        break;
      case 'IsActive':
        this.setState({
          company: {
            ...company,
            IsActive: !this.state.isActive
          }
        })
        break;
      default:
        break;
    }
  }

  render() {
    const { userProfile: { companies } } = this.props;
    const { company, newCompany } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Company" className="text-sm-left" />
          <Button variant="primary" size="sm" onClick={this.onAddToggle}>Add Company</Button>
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
                      <th scope="col" className="border-0">

                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies && companies.map((entry, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{entry.ImageUrl}</td>
                          <td>{entry.Name}</td>
                          <td>{entry.Address}</td>
                          <td>{entry.Email}</td>
                          <td>{entry.Phone}</td>
                          <td>{entry.EstablishedYear}</td>
                          <td>{entry.IsActive ?
                            <span style={{ color: '#17c671' }}>Available</span>
                            : <span style={{ color: '#c4183c' }}>Unavailable</span>}</td>
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
                        <Modal.Title>{company.Name}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className='modalDiv'>
                          <p>Name</p>
                          <input name='Name' onChange={this.onChange} value={company.Name || ''} />
                        </div>
                        <div className='modalDiv'>
                          <p>Address</p>
                          <input name='Address' onChange={this.onChange} value={company.Address || ''} />
                        </div>
                        <div className='modalDiv'>
                          <p>Email</p>
                          <input name='Email' onChange={this.onChange} value={company.Email || ''} />
                        </div>
                        <div className='modalDiv'>
                          <p>Phone</p>
                          <input name='Phone' onChange={this.onChange} value={company.Phone || ''} />
                        </div>
                        <div className='modalDiv'>
                          <p>Established Year</p>
                          <input name='EstablishedYear' onChange={this.onChange} value={company.EstablishedYear || ''} />
                        </div>
                        <div className='modalDiv'>
                          <p>Latitude</p>
                          <input name='Latitude' onChange={this.onChange} value={company.Latitude || ''} />
                        </div>
                        <div className='modalDiv'>
                          <p>ImageUrl</p>
                          <input name='ImageUrl' onChange={this.onChange} value={company.ImageUrl || ''} />
                        </div>
                        <div className='modalDiv'>
                          <p>Balance</p>
                          <input name='Balance' onChange={this.onChange} value={company.Balance || ''} />
                        </div>
                        <div className='modalDiv'>
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
                    <Modal show={this.state.isAdd} onHide={this.onAddToggle}>
                      <Modal.Header closeButton onHide={this.onAddToggle}>
                        <Modal.Title>Add new Company</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className='modalDiv'>
                          <p>Name</p>
                          <input name='Name' onChange={this.onChangeNewCompany} value={newCompany.Name} />
                        </div>
                        <div className='modalDiv'>
                          <p>Address</p>
                          <input name='Address' onChange={this.onChangeNewCompany} value={newCompany.Address} />
                        </div>
                        <div className='modalDiv'>
                          <p>Email</p>
                          <input name='Email' onChange={this.onChangeNewCompany} value={newCompany.Email} />
                        </div>
                        <div className='modalDiv'>
                          <p>Phone</p>
                          <input name='Phone' onChange={this.onChangeNewCompany} value={newCompany.Phone} />
                        </div>
                        <div className='modalDiv'>
                          <p>Established Year</p>
                          <input name='EstablishedYear' onChange={this.onChangeNewCompany} value={newCompany.EstablishedYear} />
                        </div>
                        <div className='modalDiv'>
                          <p>Longtitude</p>
                          <input name='Longtitude' onChange={this.onChangeNewCompany} value={newCompany.Longtitude} />
                        </div>
                        <div className='modalDiv'>
                          <p>Latitude</p>
                          <input name='Latitude' onChange={this.onChangeNewCompany} value={newCompany.Latitude} />
                        </div>
                        <div className='modalDiv'>
                          <p>ImageUrl</p>
                          <input name='ImageUrl' onChange={this.onChangeNewCompany} value={newCompany.ImageUrl} />
                        </div>
                        <div className='modalDiv'>
                          <p>Balance</p>
                          <input name='Balance' onChange={this.onChangeNewCompany} value={newCompany.Balance} />
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
    userProfile: state.user,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCompanies, updateCompany, addCompany
  },
  dispatch,
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyView);