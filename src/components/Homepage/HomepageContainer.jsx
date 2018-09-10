import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Homepage from './Homepage';
import * as adActions from '../../actions/AdActions';
// import $ from 'jquery';
class HomepageContainer extends Component {
  constructor(props) {
    super(props);
    props.actions.loadCategoriesCounts();
    props.actions.getAllAdsCount();
    this.state = {
      category: '',
    }
  }

  handleCategoryChange = (e) => {
    this.setState(
      { category: e.target.value },
      () => { this.props.actions.filterAds({ category: e.target.value }) }
    );
  };

  render() {
    return (
      <Homepage
        state={this.state} handleCategoryChange={this.handleCategoryChange}
        categoryCounts={this.props.categoryCounts}
      />
    );
  }
}

HomepageContainer.propTypes = {
  actions: PropTypes.object,
  categoryCounts: PropTypes.object,
  allAds: PropTypes.array
}

function mapStateToProps(state) {
  return {
    allAds: state.allAds,
    categoryCounts: state.categoryCounts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(adActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomepageContainer);