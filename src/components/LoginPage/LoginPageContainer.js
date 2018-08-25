import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from './LoginForm';
import { isEmail, isEmpty } from 'validator';
import * as loginActions from '../../actions/LoginActions';

const resetUser = () => {
  return {
    email: '',
    password: '',
    repeatPassword: '',
    agree: false,
  }
};

class LoginPageContainer extends Component {
  state = {
    user: resetUser(),
    errors: resetUser(),
    validateOnChange: false,
    authenticated: false,
  }

  handleChange = (e) => {
    let user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user });

    if (this.state.validateOnChange) {
      this.validateForm();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.authenticated != prevState.authenticated) {
      return {
        authenticated: nextProps.authenticated
      }
    }
    return null;
  }

  validateForm = () => {
    let { user } = this.state;
    let errors = resetUser();
    let valid = true;

    if (isEmpty(user.email) || !isEmail(user.email)) {
      errors.email = "Please provide a valid email address";
      valid = false;
    }

    if (isEmpty(user.password) || user.password.length < 8) {
      errors.password = "Passowrd should be at least 8 characters long";
      valid = false;
    }

    this.setState({ errors });
    return valid;
  };

  handleSubmit = () => {
    if (this.validateForm()) {
      this.props.actions.loginUser(this.state.user);
    } else {
      this.setState({ validateOnChange: true });
    }
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (this.state.authenticated) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <LoginForm
        state={this.state}
        handleChange={this.handleChange}
        handleCheckbox={this.handleCheckbox}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

LoginPageContainer.propTypes = {
  location: PropTypes.object,
  actions: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    authenticated: state.session.authenticated,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);