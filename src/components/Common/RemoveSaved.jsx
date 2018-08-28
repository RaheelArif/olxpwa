import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adActions from '../../actions/AdActions';
import RemoveIcon from '@material-ui/icons/RemoveCircle';

class RemoveSaved extends Component {
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
    this.props.actions.removeSaved(this.state.adId);
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
      <a href="javascript:void(0)" className={this.props.className} title="Remove from saved ads" onClick={this.handleClick}><RemoveIcon /></a>
    );
  }
}

RemoveSaved.propTypes = {
  className: '',
}

RemoveSaved.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(RemoveSaved);
