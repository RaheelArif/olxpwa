import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adActions from '../../actions/AdActions';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

class SaveToViewLater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adId: props.adId,
      authenticated: props.authenticated,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if ((nextProps.authenticated == false || nextProps.authenticated) && nextProps.authenticated != prevState.authenticated) {
      return { authenticated: nextProps.authenticated }
    }
    return null;
  }

  handleClick = () => {
    this.props.actions.adViewLater(this.state.adId);
  }

  render() {
    if (!this.state.authenticated) {
      return (<span></span>);
    } else if (!this.state.adId) {
      return (
        <span>Invalid Ad Id Provided</span>
      );
    }
    return (
      <a href="javascript:void(0)" className={this.props.className} title="Save to View Later" onClick={this.handleClick}><WatchLaterIcon /></a>
    );
  }
}

SaveToViewLater.propTypes = {
  className: '',
}

SaveToViewLater.propTypes = {
  actions: PropTypes.object,
  adId: PropTypes.string,
  authenticated: PropTypes.bool,
  className: PropTypes.any
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


export default connect(mapStateToProps, mapDispatchToProps)(SaveToViewLater);
