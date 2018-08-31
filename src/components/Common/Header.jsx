import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import MenuItems from './MenuItems';
import MenuIcon from '@material-ui/icons/Menu';
import * as loginActions from '../../actions/LoginActions';
import olxLogo from '../../assets/img/olx-logo.png';
// import $ from 'jquery';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Header extends Component {
  state = {
    registerDialogOpen: false,
    loginDialogOpen: false,
    authenticated: this.props.authenticated,
    drawerOpen: false,
    nestedListOpen: true,
  };
/*
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.authenticated != this.state.authenticated) {
  //     this.setState({ authenticated: nextProps.authenticated });
  //     this.handleLoginClose();
  //     this.props.history.push('/');
  //   }
  // }
*/
  static getDerivedStateFromProps(nextProps, prevState) {
    if ((nextProps.authenticated == false || nextProps.authenticated) && nextProps.authenticated != prevState.authenticated) {
      return { authenticated: nextProps.authenticated }
    }
    return null;
  }

  nestedListToggle = () => {
    this.setState(state => ({ nestedListOpen: !state.nestedListOpen }));
  };

  handleLogout = () => {
    this.props.actions.logout();
  }

  toggleDrawer = (open) => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <MenuItems
          handleLogout={this.handleLogout}
          toggleDrawer={this.toggleDrawer}
        />
      </div>
    );
/*
    // const loginActions = [
    //   <FlatButton
    //     label="Cancel"
    //     primary={true}
    //     onClick={this.handleLoginClose}
    //     key={1}
    //   />
    // ];
*/
    return (
      <header>
        {/* <Drawer anchor="right" open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}> */}
        <SwipeableDrawer
          anchor="right" open={this.state.drawerOpen}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div
            tabIndex={0}
            role="button"
            // onClick={this.toggleDrawer(false)}
            // onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
        <div className="container">
          <div className="row pt-2 pb-2">
            <div className="col-9 col-sm-9 col-lg-6 d-flex">
              <div className="site-logo">
                <Link to="/"><img className="m-auto img-fluid" src={olxLogo} alt={`OLX Pakistan`} /></Link>
              </div>
              <div className="site-slogan">
                <span className="m-auto bold">{`Pakistan's Largest Marketplace`}</span>
              </div>
            </div>

            <div className="col-3 col-lg-6 m-auto text-right d-none d-lg-block">
              <Link to="/my-account" className="btn btn-custom-hollow"><i className="fa fa-user"></i> My Account</Link>
              <Link to="/post-your-ad" className="btn btn-custom-orange mr-0" href="#">Post an Ad</Link>
              {this.state.authenticated && <span onClick={this.handleLogout} className="btn btn-link"><i className="fa fa-logout"></i> Logout</span>}
            </div>

            <div className="col-3 col-sm-3 text-right menu-icon-container d-lg-none">
              <Button
                variant="fab"
                mini
                color="primary"
                className="menu-icon"
                onClick={this.toggleDrawer(true)}
              >
                <MenuIcon />
              </Button>
            </div>
          </div>
        </div>

        {
          /*
          <Dialog
            // title="Login Form"
            actions={loginActions}
            modal={false}
            open={this.state.loginDialogOpen}
            onRequestClose={this.handleLoginClose}
            autoScrollBodyContent={true}
            bodyClassName="login-form"
          >
            <LoginPage />
          </Dialog>
          */
        }
      </header>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.session.authenticated,
    user: state.session.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header)));