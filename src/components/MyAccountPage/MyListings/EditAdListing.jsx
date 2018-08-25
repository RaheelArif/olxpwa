import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adActions from '../../../actions/AdActions';
import PostAdForm from '../../PostAdPage/PostAdForm';
import uf from '../../../constants/UtilityFunctions';

// import objectAssign from 'object-assign';

class EditListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // myListings: props.myListings
    };
  }

  synchAdListingWithUi = (adListing) => {
    if(!adListing.title) {
      return adListing;
    }
    // convert back the listing according to the ui.
    adListing.adTitle = adListing.title;
    adListing.adDescription = adListing.description;
    adListing.oldImages = adListing.images;
    let imagesArr = adListing.images;
    let imagesObj = {};
    imagesArr.map((image, index) => {
      imagesObj[`image-${index + 1}`] = {};
      imagesObj[`image-${index + 1}`].name = image;
    });
    adListing.images = imagesObj;
    // adListing.images = {};
    delete (adListing.title)
    delete (adListing.description);
    delete (adListing.featured);
    delete (adListing.approved);

    return adListing;
  }

  render() {
    let adListing = uf.getAdById(this.props.myAds, this.props.match.params.id);
    // to avoid state mutation, we need a copy of the listing but not the exact reference.
    // so listing without JSON.parse(JSON.stringify(listing)); will give us the reference but not
    // the new copy of the listing, that is why I made a copy by first converting it to string and then
    // converting back to the object.
    let adCopyWithoutItsRefance = JSON.parse(JSON.stringify(adListing));

    // alternatively, the same effect can be obtained by ObjectAssign
    // this does not work on this object as it involves deep objects, so it
    // does not merge them properly.
    // let newAd = objectAssign({}, adListing);
    let ad = this.synchAdListingWithUi(adCopyWithoutItsRefance);
    if (!ad) {
      ad = {};
    }
    return (
      <PostAdForm serverAction={this.props.actions.updateAd}
        ad={ad} pageTitle="Edit Ad" buttonLabel="Update Ad"
      />
    );
  }
}

EditListingPage.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.object,
  listings: PropTypes.array,
  myListings: PropTypes.array,
  myAds: PropTypes.array,
  match: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    user: state.session.user,
    authenticated: state.session.authenticated,
    myAds: state.myAds
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(adActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditListingPage);