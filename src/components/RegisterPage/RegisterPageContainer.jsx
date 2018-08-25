import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import * as registerActions from '../../actions/RegisterActions';
import { bindActionCreators } from 'redux';
import RegisterForm from './RegisterForm';
import { isEmail, isEmpty } from "validator";

const resetUser = () => {
  return {
    email: '',
    password: '',
    repeatPassword: '',
    agree: false,
  }
};

class RegisterPageContainer extends Component {
  state = {
    user: resetUser(),
    errors: resetUser(),
    validateOnChange: false,
    disableSubmitButton: false,
  }

  handleSubmit = () => {
    if (this.validateForm()) {
      this.props.actions.registerUser(this.state.user);
    } else {
      this.setState({ validateOnChange: true, disableSubmitButton: true });
    }
  };

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

    if (user.password != user.repeatPassword) {
      errors.repeatPassword = "Passwords mismatch";
      valid = false;
    }

    if (!user.agree) {
      errors.agreeText = "You must be agree to terms of use";
      valid = false;
    }

    this.setState({ errors });
    if (valid) {
      this.setState({ disableSubmitButton: false });
    } else {
      this.setState({ disableSubmitButton: true });
    }
    return valid;
  };

  handleChange = (e) => {
    let user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user });

    if (this.state.validateOnChange) {
      this.validateForm();
    }
  };

  handleCheckbox = (event, checked) => {
    let user = this.state.user;
    user.agree = checked;
    this.setState({ user });

    if (this.state.validateOnChange) {
      this.validateForm();
    }
  };

  render() {
    return (
      <RegisterForm
        state={this.state}
        handleChange={this.handleChange}
        handleCheckbox={this.handleCheckbox}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

RegisterPageContainer.propTypes = {
  actions: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(registerActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterPageContainer);
