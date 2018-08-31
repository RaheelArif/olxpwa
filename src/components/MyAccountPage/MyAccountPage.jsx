import React, { Component } from 'react';
// import PropTypes from "prop-types";
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Breadcrumb from "../Common/Breadcrumb";
import LeftMenu from './LeftMenu';

const breadcrumbs = [
  {
    text: 'My Account'
  }
]

class MyAccountContainerPage extends Component {
  state = {

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
              <h2>My Account Page</h2>
              <p>
                Welcome to your personalized page, please select your required page to view its content.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

MyAccountContainerPage.propTypes = {
  // myProp: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) { //eslint-disable-line no-unused-vars
  return {
    // actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MyAccountContainerPage);
