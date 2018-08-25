import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import * as messageActions from '../../../actions/MessageActions';
import Breadcrumb from '../../Common/Breadcrumb';
import LeftMenu from '../LeftMenu';
import uf from '../../../constants/UtilityFunctions';

// import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const breadcrumbs = [
  {
    link: '/my-account',
    text: 'My Account'
  },
  {
    text: 'My Messages'
  }
]

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginLeft: 0,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class MyMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myMessages: props.myMessages,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.myMessages) {
      return { myMessages: nextProps.myMessages };
    }
    return null;
  }

  componentDidMount = () => {
    this.props.actions.loadMyMessages(this.props.userId);
  }

  handleDelete = (msgId) => {
    const confirmDelete = confirm("Are you sure you want to delete this message, it can't be undone?");
    if (confirmDelete) {
      this.props.actions.deleteMessage(msgId);
    }
  }

  render() {
    let myMessages = this.state.myMessages;
    let classes = this.props.classes;
    if (myMessages.length < 1) {
      return (
        <div className="container">
          <i className="fa fa-spinner rotate"></i> Loading...
        </div>
      )
    }
    const messagesList = myMessages.map((message, index) => {
      return (
        <div key={index} className="single-message-container">
          <div className="ad-title">
            <h4>
              {
                message.messageAd ?
                <Link to={`/item/${message.messageAd._id}`}>{message.messageAd.title}</Link>
                :
                <span className="text-danger">This Ad has been removed</span>
              }
            </h4>
          </div>
          <div className="sender-description">
            <ul className="list-inline">
              <li className="list-inline-item">Sender Name: {message.senderName},</li>
              <li className="list-inline-item">Sender Contact Number: {message.senderContactNumber},</li>
              <li className="list-inline-item sent-date">{uf.getDate(new Date(message.createdAt))}.</li>
            </ul>
          </div>
          <div className="message-body">
            {message.message}
          </div>

          <Button
            variant="fab" mini color="secondary" aria-label="Add"
            className={classes.button}
            onClick={() => { this.handleDelete(message._id) }}
          >
            <DeleteIcon />
          </Button>
        </div>
      );
    });
    return (
      <div className="container">
        <Breadcrumb
          breadcrumbs={breadcrumbs}
        />
        <section className="my-account-page page-container">
          <div className="row">
            <aside className="col-12 d-none d-lg-block col-lg-4">
              <LeftMenu />
            </aside>
            <div className="col-12 col-lg-8">
              <div>
                <h2>My Messages</h2>
                <div className="messages-container">
                  {messagesList}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

MyMessages.propTypes = {
  actions: PropTypes.object,
  userId: PropTypes.string,
  classes: PropTypes.object.isRequired,
  myMessages: PropTypes.array,
}

function mapStateToProps(state) {
  return {
    myMessages: state.myMessages,
    userId: state.session.user.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(messageActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyMessages));
