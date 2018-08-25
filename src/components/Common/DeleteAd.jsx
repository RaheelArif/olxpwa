import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adActions from '../../actions/AdActions';
import DeleteIcon from "@material-ui/icons/Delete";
import toastr from 'toastr';

class DeleteAd extends Component {
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

  handleDelete = () => {
    let confirm = window.confirm("Are you sure you want to delete this Ad Listing?");
    if (confirm) {
      this.props.actions.deleteAd(this.state.adId);
    } else {
      toastr.success("Thanks for confirmation, Ad is not being deleted");
    }
  }

  render() {
    if (!this.state.authenticated) {
      return (<span>You do not have permission to delete the ad listing. please login first</span>);
    } else if (!this.state.adId) {
      return (
        <span>Invalid Ad Id Provided</span>
      );
    }
    return (
      <a href="javascript:void(0)" className={this.props.className} title="Delete this listing" onClick={this.handleDelete}><DeleteIcon /></a>
    );
  }
}

DeleteAd.propTypes = {
  className: '',
}

DeleteAd.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(DeleteAd);
