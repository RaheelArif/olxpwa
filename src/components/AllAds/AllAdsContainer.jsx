import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adActions from '../../actions/AdActions';
import AllAds from './AllAds';
import { adsPerPage } from '../../constants/constants';
class AllAdsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAds: props.allAds ? props.allAds : [],
      firstLoaded: false,
      offset: 0,
      pageCount: Math.ceil(props.totalAdsCount / adsPerPage),
      loading: false,
    }
    props.actions.loadAllAds();
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.allAds) {
      return { allAds: nextProps.allAds }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.allAds.length > 0 && prevState.allAds.length > 0 &&
      prevState.allAds[0].title !== this.state.allAds[0].title) {
      this.setState({loading: false});
    }
  }

  onPageChange = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * adsPerPage);
    this.setState({ offset: offset, loading: true }, () => {
      this.props.actions.loadAllAds(offset);
    });
  };

  render() {
    return (
      <div>
        {this.state.loading && <div className="loading-ads"><i className="fa fa-spinner rotate"></i> Loading...</div>}
        <AllAds
          allAds={this.state.allAds}
          filterCategory={this.props.filterCategory}
          title={this.props.title}
          userId={this.props.userId}
          totalAdsCount={this.props.totalAdsCount}
          onPageChange={this.onPageChange}
          pageCount={this.state.pageCount}
        />
      </div>
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
  totalAdsCount: PropTypes.number
}

function mapStateToProps(state) {
  return {
    allAds: state.allAds,
    userId: state.session.user.id,
    totalAdsCount: state.categoryCounts.totalAdsCount,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(adActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAdsContainer);