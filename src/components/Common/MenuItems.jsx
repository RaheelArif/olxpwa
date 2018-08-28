import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/SettingsPower';
import AddIcon from '@material-ui/icons/AddBoxRounded';
import MessageIcon from '@material-ui/icons/Message';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';

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

class MenuItems extends Component {
  state = {
    authenticated: this.props.authenticated,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if ((nextProps.authenticated == false || nextProps.authenticated) && nextProps.authenticated != prevState.authenticated) {
      return { authenticated: nextProps.authenticated }
    }
    return null;
  }

  render() {
    const { classes, handleLogout, toggleDrawer } = this.props;
    return (
      <div className={classes.root}>
        <List
          component="nav"
          className="drawer-list"
        // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
        >
          <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <Link to="/" onClick={toggleDrawer(false)}>Home Page</Link>
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <Link to="/my-account" onClick={toggleDrawer(false)}>My Account</Link>
          </ListItem>

          <Divider />

          {
            this.state.authenticated &&
            <div>
              <ListItem>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <Link to="/post-your-ad" onClick={toggleDrawer(false)}>Post an Ad</Link>
              </ListItem>

              <Divider />

              <ListItem>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <Link to="/my-account/ads" onClick={toggleDrawer(false)}>My Ad Listings</Link>
              </ListItem>

              <Divider />

              <ListItem>
                <ListItemIcon>
                  <MessageIcon />
                </ListItemIcon>
                <Link to="/my-account/messages" onClick={toggleDrawer(false)}>Messages</Link>
              </ListItem>

              <Divider />

              <ListItem>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <Link to="/my-account/saved-ads" onClick={toggleDrawer(false)}>Saved Ads</Link>
              </ListItem>
              <Divider />
            </div>
          }

          {
            this.state.authenticated ?
              <ListItem>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <Link to="/#" onClick={() => { handleLogout(); toggleDrawer(false) }}>Logout</Link>
              </ListItem>
              :
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <Link to="/login" onClick={toggleDrawer(false)}>Login</Link>
              </ListItem>
          }

          <Divider />

        </List>
      </div>
    );
  }
}

MenuItems.propTypes = {
  classes: PropTypes.object,
  authenticated: PropTypes.bool,
  handleLogout: PropTypes.func,
  toggleDrawer: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    authenticated: state.session.authenticated,
  }
}

function mapDispatchToProps(dispatch) { //eslint-disable-line no-unused-vars
  return {
    // actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MenuItems));