import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adActions from '../../../actions/AdActions';
import AllAdsDumb from '../../AllAds/AllAds';
import Breadcrumb from '../../Common/Breadcrumb';
import LeftMenu from '../LeftMenu';

const breadcrumbs = [
  {
    link: '/my-account',
    text: 'My Account'
  },
  {
    text: 'My Ads'
  }
]

class MyListings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myAds: [],
      loading: true,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.myAds) {
      return { myAds: nextProps.myAds };
    }
    return null;
  }

  componentDidMount = () => {
    this.props.actions.loadMyAds();
  }

  render() {
    return (
      <div className="container">
        <Breadcrumb
          breadcrumbs={breadcrumbs}
        />
        <section className="my-account-page page-container">
          <div className="row">
            <aside className="col-12 d-none d-lg-block col-lg-4">
              <LeftMenu />
            </aside>
            <div className="col-12 col-lg-8">
              <AllAdsDumb
                allAds={this.state.myAds}
                // filterCategory={this.props.filterCategory}
                title="My Ads"
                userId={this.props.userId}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

MyListings.propTypes = {
  actions: PropTypes.object,
  userId: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    myAds: state.myAds,
    userId: state.session.user.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(adActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MyListings);