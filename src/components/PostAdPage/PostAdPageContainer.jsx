import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as adActions from '../../actions/AdActions';
import PostAdForm from './PostAdForm';

class PostAdPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAds: props.allAds
    };
  }

  render() {
    return(
      <PostAdForm
        serverAction={this.props.actions.submitAd}
      />
    );
  }
}

PostAdPageContainer.propTypes = {
  allAds: PropTypes.array,
  actions: PropTypes.object
}

function mapStateToProps(state) {
  return {
    authenticated: state.session.authenticated,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(adActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAdPageContainer);