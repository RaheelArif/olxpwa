import React, { Component } from 'react';
import PropTypes from "prop-types"; // eslint-disable-line
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'; // eslint-disable-line
import FeaturedAds from './FeaturedAds';
class FeaturedAdsContainer extends Component {
  state = {

  }

  render() {
    return(
      <FeaturedAds />
    );
  }
}

FeaturedAdsContainer.propTypes = {
  // myProp: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) { // eslint-disable-line
  return {
    // state: state
  }
}

function mapDispatchToProps(dispatch) { // eslint-disable-line
  return {
    // actions: bindActionCreators(actions, dipatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(FeaturedAdsContainer);
