import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AllAdsDumb from '../AllAds/AllAds';
import * as adActions from '../../actions/AdActions';
import Breadcrumb from '../Common/Breadcrumb';

class CategoryAdsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryAds: [],
      category: props.match.params.category,
    }
    props.actions.filterAds({ category: this.state.category });
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.allAds) {
      return { categoryAds: nextProps.allAds }
    }
    return null;
  }

  render() {
    const breadcrumb = [
      {
        text: `${this.state.category} Ads`
      }
    ];
    return (
      <div className="container">
          <Breadcrumb
            breadcrumbs={breadcrumb}
          />
        <div className="page-container">
          <AllAdsDumb
            allAds={this.state.categoryAds}
            filterCategory={this.state.category}
            userId={this.props.userId}
          />
        </div>
      </div>
    );
  }
}

CategoryAdsPage.propTypes = {
  allAds: PropTypes.array,
  match: PropTypes.object,
  actions: PropTypes.object,
  userId: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdsPage);