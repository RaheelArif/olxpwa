import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adActions from '../../../actions/AdActions';
import PostAdForm from '../../PostAdPage/PostAdForm';
import uf from '../../../constants/UtilityFunctions';
// import cloneDeep from 'lodash/cloneDeep';
// import lodash from 'lodash';
// import objectAssign from 'object-assign';

class EditListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ad: {},
      myAds: [],
      adId: '',
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.myAds) {
      return { myAds: nextProps.myAds, adId: nextProps.match.params.id }
    }
    return null;
  }

  componentDidMount = () => {
    this.setAdToComponentState();
  };

  setAdToComponentState = () => {
    let adListing = uf.getAdById(this.state.myAds, this.state.adId);
    if (adListing && adListing.title) {
      // if found, then it will be a reference to the ad in the store, so need to clone it before performing anything on it.
      // otherwise a state mutation error will occur on modification.

      // to avoid state mutation, we need a copy of the listing but not the exact reference.
      // so listing without JSON.parse(JSON.stringify(listing)); will give us the reference but not
      // the new copy of the listing, that is why I made a copy by first converting it to string and then
      // converting back to the object.

      // let adCopyWithoutItsReferance = JSON.parse(JSON.stringify(this.state.ad));

      // alternatively, the same effect can be obtained by ObjectAssign
      // let newAd = objectAssign({}, adListing);
      // this does not work on this object as it involves deep objects, so it
      // does not merge them properly.

      // We can use lodash library to obtain the same functionality.
      // let adCopyWithoutItsReferance = lodash.cloneDeep(adListing);
      // console.log('cloned object to pass to <form> component </form>',adCopyWithoutItsReferance);
      let adCopyWithoutItsReferance = JSON.parse(JSON.stringify(adListing));
      this.setState({ ad: adCopyWithoutItsReferance });
    } else {
      uf.getMyAdByIdFromServer(this.props.match.params.id, this.props.user.id)
        .then(ad => {
          // it will be already an independent object so no need to create a copy of it. again.
          if (ad && ad.category) {
            this.setState({ ad: ad });
          } else {
            this.props.history.push('/my-account/ads');
          }
        });
    }
  };


  synchAdListingWithUi = (adListing) => {
    if (!adListing.title) {
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
  };

  render() {

    if (this.state.ad && !this.state.ad.category) {
      return (
        <div className="container">
          <i className="fa fa-spinner rotate"></i> Loading...
        </div>
      )
    } else {
      let ad = this.synchAdListingWithUi(this.state.ad);
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
    myAds: state.myAds,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(adActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditListingPage);