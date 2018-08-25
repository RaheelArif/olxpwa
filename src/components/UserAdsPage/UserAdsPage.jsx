import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AllAdsDumb from '../AllAds/AllAds';
import * as adActions from '../../actions/AdActions';
import Breadcrumb from '../Common/Breadcrumb';

const breadcrumb = [
  {
    text: 'User Ads'
  }
];
class UserAdsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAds: [],
      userId: props.match.params.userId,
    }
    props.actions.filterAds({ uploader: this.state.userId });
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.allAds) {
      return { userAds: nextProps.allAds }
    }
    return null;
  }

  render() {
    return (
      <div className="container">
          <Breadcrumb
            breadcrumbs={breadcrumb}
          />
        <div className="page-container">
          <AllAdsDumb
            allAds={this.state.userAds}
            title={`User Ads`}
            userId={this.props.userId}
          />
        </div>
      </div>
    );
  }
}

UserAdsPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserAdsPage);