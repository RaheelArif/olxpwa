import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MessageIcon from '@material-ui/icons/Message';
import ListIcon from '@material-ui/icons/List';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/AddBoxRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

const LeftMenu = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List
        component="nav"
      >
        <ListItem>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="/my-account">My Account</Link>
          </ListItemText>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="/post-your-ad">Post Your Ad</Link>
          </ListItemText>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="/my-account/ads">Ad Listings</Link>
          </ListItemText>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="/my-account/messages">Messages</Link>
          </ListItemText>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to="/my-account/saved-ads">Saved Ads</Link>
          </ListItemText>
        </ListItem>
      </List>
    </div>
    // <ul className="left-menu">
    //   <li><Link to="/my-account/ads">My Ads Listings</Link></li>
    //   <li><Link to="/my-account/messages">Messages</Link></li>
    // </ul>
  );
};

LeftMenu.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LeftMenu);
