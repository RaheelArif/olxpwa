import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
  state = {
    authenticated: false,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if ( (nextProps.authenticated === false || nextProps.authenticated) && nextProps.authenticated != prevState.authenticated) {
      return { authenticated: nextProps.authenticated }
    }
    return null;
  }

  render() {
    const Component = this.props.component;
    const props = { ...this.props };
    delete props["component"];
    return (
      <Route {...props} render={(props) => {
        return (
          this.state.authenticated ?
            <Component {...props} />
            : <Redirect to={{
              pathname: "/login",
              state: { from: props.location }
            }} />
        )
      }} />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.any
}

function mapStateToProps(state) {
  return {
    authenticated: state.session.authenticated
  }
}

export default connect(mapStateToProps)(PrivateRoute);
