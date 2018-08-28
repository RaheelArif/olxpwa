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
    text: 'Saved Ads'
  }
];

class SavedListingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedAds: [],
      loading: true,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.savedAds) {
      return { savedAds: nextProps.savedAds };
    }
    return null;
  }

  componentDidMount = () => {
    this.props.actions.loadSavedAds();
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
                allAds={this.state.savedAds}
                // filterCategory={this.props.filterCategory}
                title="Saved Ads"
                userId={this.props.userId}
                removeSaved={true}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

SavedListingsPage.propTypes = {
  actions: PropTypes.object,
  userId: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    savedAds: state.savedAds,
    userId: state.session.user.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(adActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SavedListingsPage);