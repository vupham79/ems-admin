import React from 'react';
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { connect } from 'react-redux';
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
    const { getShareAccounts, selectedCompany } = this.props;
    if (selectedCompany) {
      getShareAccounts({
        id: selectedCompany.Id
      });
    }
  }

  render() {
    const { shareAccounts } = this.props;
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
                        </tr>
                      )
                    })}
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
    selectedCompany: state.user.selectedCompany,
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