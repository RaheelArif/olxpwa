import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SingleListingPage from './SingleListingPage';
import uf from '../../constants/UtilityFunctions';
import toastr from 'toastr';
import { isEmpty, isNumeric } from 'validator';
import * as messageActions from '../../actions/MessageActions';
import * as adActions from '../../actions/AdActions';

let combinedActions = {
  ...messageActions,
  ...adActions,
};

function resetContact() {
  return { name: '', contactNumber: '', message: '' };
}
class SingleListingPageContainer extends Component {
  constructor(props) {
    super(props);
    // props.match.params.adId

    this.state = {
      photoIndex: 0,
      isOpen: false,
      ad: uf.getAdById(props.allAds, props.match.params.adId),
      openMessageDialog: false,
      contactToSeller: resetContact(),
      contactToSellerErrors: resetContact(),
      validateOnChange: false,
    }
  }

  handleChange = (e) => {
    let contactToSeller = this.state.contactToSeller;
    contactToSeller[e.target.name] = e.target.value;
    this.setState({ contactToSeller });

    if (this.state.validateOnChange) {
      this.validateContactForm();
    }
  };

  handleSubmitContactForm = () => {
    if (!this.validateContactForm()) {
      return this.setState({ validateOnChange: true });
    }
    let contactMessage = this.state.contactToSeller;
    contactMessage.adId = this.state.ad._id;
    contactMessage.receiver = this.state.ad.uploader._id;
    this.props.actions.sendMessage(contactMessage);
    this.handleCloseMessageDialog();
  };

  validateContactForm = () => {
    let contact = this.state.contactToSeller;
    let errors = resetContact();
    let valid = true;

    if (isEmpty(contact.name)) {
      errors.name = "Please provide your name";
      valid = false;
    } else if (contact.name.length < 3 || contact.name.length > 30) {
      errors.name = "Please provide a valid name";
      valid = false;
    }

    if (isEmpty(contact.contactNumber)) {
      errors.contactNumber = "Please provide your contact number so that seller can contact you";
      valid = false;
    } else if (!isNumeric(contact.contactNumber)) {
      errors.contactNumber = "Only digits are allowed in contact number";
      valid = false;
    } else if (contact.contactNumber.length < 10 || contact.contactNumber.length > 15) {
      errors.contactNumber = "Please provide a valid phone number";
      valid = false;
    }

    if (isEmpty(contact.message)) {
      errors.message = "Please Enter your message";
      valid = false;
    } else if (contact.message.length < 25) {
      errors.message = "Message is too short, please describe your message breifly.";
      valid = false;
    } else if (!uf.isValidInput(contact.message)) {
      errors.message = "Please provide a valid description.";
      valid = false;
    }

    this.setState({ contactToSellerErrors: errors });
    return valid;
  };

  componentDidMount = () => {
    if (!this.state.ad) {
      uf.getAdByIdFromServer(this.props.match.params.adId)
        .then(ad => {
          this.setState({ ad: ad });
        }).catch(err => toastr.error(err));
    }
  }

  handleOpenMessageDialog = () => {
    this.setState({ openMessageDialog: true });
  };

  handleCloseMessageDialog = () => {
    this.setState({ openMessageDialog: false, contactToSeller: resetContact() });
  };

  toggleLightbox = (photoIndex) => {
    if (!isNaN(Number(photoIndex))) {
      this.setState({ photoIndex: photoIndex });
    }
    this.setState({ isOpen: !this.state.isOpen });
  };

  next = (images) => {
    let photoIndex = this.state.photoIndex;
    this.setState({
      photoIndex: (photoIndex + 1) % images.length,
    })
  };

  previous = (images) => {
    let photoIndex = this.state.photoIndex;
    this.setState({
      photoIndex: (photoIndex + images.length - 1) % images.length,
    });
  }


  adViewLater = (adId) => {
    this.props.actions.adViewLater(adId);
  };

  render() {
    return (
      <SingleListingPage
        state={this.state}
        toggleLightbox={this.toggleLightbox}
        next={this.next}
        previous={this.previous}
        handleCloseMessageDialog={this.handleCloseMessageDialog}
        handleOpenMessageDialog={this.handleOpenMessageDialog}
        handleSubmitContactForm={this.handleSubmitContactForm}
        handleChange={this.handleChange}
        adViewLater={this.adViewLater}
      />
    );
  }
}

SingleListingPageContainer.propTypes = {
  allAds: PropTypes.array,
  match: PropTypes.object,
  actions: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    allAds: state.allAds,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(combinedActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleListingPageContainer);
