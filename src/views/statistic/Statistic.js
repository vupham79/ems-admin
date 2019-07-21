import React from "react";
import { Container } from "shards-react";
import { connect } from "react-redux";
import PageTitle from "../../components/pageTitle";
import {} from "../../action";
import { bindActionCreators } from "redux";

class StatisticView extends React.Component {
  state = {};

  componentDidMount() {}

  renderDataStudio = iframe => {
    return {
      __html: iframe
    };
  };

  render() {
    const iframe =
      '<iframe width="1000" height="800" src="https://datastudio.google.com/embed/reporting/10vLoX-FHZX-0bAcJJ3ugGblVh8HDz6BM/page/wgMu" frameborder="0" style="border:0" allowfullscreen></iframe>';

    return (
      <Container fluid className={`main-content-container px-4 wrapper`}>
        <div dangerouslySetInnerHTML={this.renderDataStudio(iframe)} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticView);
