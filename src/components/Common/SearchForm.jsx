import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import * as adActions from '../../actions/AdActions';
import { bindActionCreators } from 'redux';
import TextField from "@material-ui/core/TextField";

class SearchForm extends Component {
  state = {
    query: '',
  }

  search = () => {
    this.props.actions.searchAds(this.state.query);
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  }

  render() {
    return (
      <TextField
        label="Search for a specific product"
        name="query"
        type="text"
        // helperText={errors.adTitle}
        fullWidth={true}
        onChange={this.handleChange}
        value={this.state.query}
        onKeyDown={(e) => { if (e.keyCode === 13) { this.search(); } }}
        // error={errors.adTitle ? true : false}
        required={true}
        InputLabelProps={{ disableAnimation: false, focused: false, margin: 'dense' }}
      />
    );
  }
}

SearchForm.propTypes = {
  actions: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(adActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);