import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as adActions from '../../actions/AdActions';
import AllAds from './AllAds';
class AllAdsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAds: props.allAds ? props.allAds : [],
    }
    props.actions.loadAllAds();
  }

  static getDerivedStateFromProps(nextProps) {
    if( nextProps.allAds ) {
      return { allAds: nextProps.allAds }
    }
    return null;
  }

  render() {
    return(
      <AllAds
        allAds={this.state.allAds}
        filterCategory={this.props.filterCategory}
        title={this.props.title}
        userId={this.props.userId}
      />
    );
  }
}
AllAdsContainer.defaultProps = {
  filterCategory: 'All',
  title: '',
}

AllAdsContainer.propTypes = {
  filterCategory: PropTypes.string,
  title: PropTypes.string,
  userId: PropTypes.string,
  actions: PropTypes.object,
  allAds: PropTypes.array,
}

function mapStateToProps(state) {
  return {
    allAds: state.allAds,
    userId: state.session.user.id,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(adActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AllAdsContainer);
