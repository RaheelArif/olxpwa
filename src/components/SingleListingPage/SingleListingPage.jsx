import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Lightbox from 'react-image-lightbox';
import userIcon from '../../assets/img/user.png';
import PostYourAd from '../Common/PostYourAd';
import { API_URL } from "../../constants/constants";
import uf from '../../constants/UtilityFunctions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Breadcrumb from '../Common/Breadcrumb';
import WithMobileDialog from "@material-ui/core/withMobileDialog";

const SingleListingPage = (props) => {
  const {
    state, toggleLightbox, next, previous,
    handleOpenMessageDialog, handleCloseMessageDialog,
    handleSubmitContactForm, handleChange, adViewLater, fullScreen
  } = props;
  const {
    photoIndex, isOpen, ad, openMessageDialog,
    contactToSeller,
    contactToSellerErrors,
  } = state;
  if (!ad) {
    return (
      <div className="container">
        <div className="mt-5"><i className="fa fa-spinner rotate"></i> Loading...</div>
      </div>
    );
  } else {
    let date = new Date(ad.createdAt);
    window.date = date; window.ad = ad;
    let adDate = uf.getDateTime(date);
    let memberDate = new Date(ad.uploader.createdAt);
    const memberSince = uf.getDate(memberDate);

    // const images = ad.images;
    const images = ad.images.map((image) => `${API_URL}image/${image}`);
    const listingImagesThumbnails = images.map((image, index) => {
      return (
        <div key={index} className="single-listing-thumbnail">
          <img
            className="img-fluid"
            // src={`${API_URL}image/${image}`}
            src={image}
            alt={ad.title}
            onClick={() => toggleLightbox(index)}
          />
        </div>
      );
    });
    const breadcrumbs = [
      {
        link: `/category/${ad.category}`,
        text: ad.category
      },
      {
        text: ad.title
      }
    ]
    return (
      <div className="container">
        <Breadcrumb
          breadcrumbs={breadcrumbs}
        />
        {/* <div className="single-listing-breadcrumb">
          <Link to="/"><i className="fa fa-home"></i> Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="category">{ad.category}</Link>
          <span className="breadcrumb-separator">/</span>
          {ad.title}
        </div> */}

        <div className="single-listing-container">
          <div className="row">
            <div className="col-12 col-lg-9">
              <div className="single-listing-container-left">
                <div className="single-listing-title">
                  <h2>{ad.title}</h2>
                  <div className="single-listing-metadata">
                    <ul className="list-inline">
                      <li className="list-inline-item"><i className="fa fa-map-pin"></i> {ad.itemCity}</li>
                      <li className="list-inline-item"><span className="text-muted">|</span></li>
                      <li className="list-inline-item"><i className="fa fa-clock-o"></i> added on {adDate}</li>
                      <li className="list-inline-item">Ad ID: {ad._id.substring(ad._id.length - 8)}</li>
                    </ul>
                  </div>

                  <div className="divider"></div>

                  <div className="single-listing-item-image-container">
                    <img className="img-fluid" onClick={toggleLightbox} src={`${API_URL}image/${ad.images[0]}`} alt={ad.title} />
                  </div>

                  <div className="divider"></div>

                  <div className="single-listing-thumbnails">
                    {listingImagesThumbnails}
                  </div>

                  {/* Lightbox implementation for larger view of the images */}
                  {isOpen && (
                    <Lightbox
                      mainSrc={images[photoIndex]}
                      nextSrc={images[(photoIndex + 1) % images.length]}
                      prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                      onCloseRequest={() => toggleLightbox(0)}
                      onMovePrevRequest={() => { previous(images) }}
                      onMoveNextRequest={() => { next(images) }}
                    />
                  )}

                  <div className="divider"></div>

                  <div className="single-listing-details">
                    <div className="single-listing-metadata">
                      {/* <div className="single-listing-item-brand">
                      <span className="item-brand">Brand: Motorola</span>
                    </div> */}
                      <ul className="list-inline">
                        <li className="list-inline-item">Model: {ad.model}</li>
                        <li className="list-inline-item">Condition: {ad.condition}</li>
                      </ul>
                    </div>

                    <div className="single-listing-description">
                      {ad.description}
                    </div>

                  </div>

                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3">
              {/* this divider to be displayed only if the screen size is small and can't display in 2 columns */}
              <div className="divider d-lg-none"></div>
              <div className="single-listing-container-right">
                <div className="single-item-price-container">
                  <div className="left-triangle"></div>
                  <div className="single-listing-item-price">
                    <span className="item-price">Rs. {ad.price}</span>
                  </div>
                </div>

                <div className="blue-box">
                  <div className="row">
                    <div className="col-3">
                      <img className="img-fluid" src={userIcon} alt={ad.sellerName} />
                    </div>
                    <div className="col-9">
                      <h3>Selling</h3>
                      <p className="text-muted">
                        (Member since {memberSince})
                    </p>
                      <Link to={`/user-ads/${ad.uploader._id}`}>User Ads</Link>
                    </div>
                  </div>
                </div>

                <div className="blue-box">
                  <div className="row">
                    <div className="col-12">
                      <h3>Seller Information</h3>
                      <span className="text-muted">
                        Name: {ad.sellerName} <br/>
                        Phone: {ad.sellerPhoneNumber}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="blue-box">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="text-center">Safety Tips for Buyers</h3>
                      <ol className="safety-tips">
                        <li>Meet seller at a safe location</li>
                        <li>Check the item before you buy</li>
                        <li>Pay only after collecting item</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="custom-listing-btn">
                  <span><a href="javascript:void(0)" onClick={() => adViewLater(ad._id)}><i className="fa fa-clock-o"></i> Save to view later</a></span>
                </div>

                <div>
                  <div className="custom-listing-btn">
                    <a href="javascript:void(0)" onClick={handleOpenMessageDialog}><i className="fa fa fa-send-o"></i> Send message to seller</a>
                  </div>
                  <Dialog
                    fullScreen={fullScreen}
                    open={openMessageDialog}
                    onClose={handleCloseMessageDialog}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">Message to seller</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Please provide your name and contact number so that seller can contact you back on your message.
                      </DialogContentText>
                      <div className="form-group"></div>
                      <div className="form-group">
                        <TextField
                          label="Your Name"
                          name="name"
                          type="text"
                          helperText={contactToSellerErrors.name}
                          fullWidth={true}
                          onChange={handleChange}
                          value={contactToSeller.name}
                          error={contactToSellerErrors.name ? true : false}
                          required={true}
                          InputLabelProps={{ disableAnimation: false, focused: false, margin: 'dense' }}
                        />
                      </div>

                      <div className="form-group">
                        <TextField
                          label="Contact Number"
                          name="contactNumber"
                          type="text"
                          helperText={contactToSellerErrors.contactNumber}
                          fullWidth={true}
                          onChange={handleChange}
                          value={contactToSeller.contactNumber}
                          error={contactToSellerErrors.contactNumber ? true : false}
                          required={true}
                          InputLabelProps={{ disableAnimation: false, focused: false, margin: 'dense' }}
                        />
                      </div>

                      <div className="form-group">
                        <TextField
                          label="Message"
                          name="message"
                          type="text"
                          multiline={true}
                          rows={6}
                          helperText={contactToSellerErrors.message}
                          fullWidth={true}
                          onChange={handleChange}
                          value={contactToSeller.message}
                          error={contactToSellerErrors.message ? true : false}
                          required={true}
                          InputLabelProps={{ disableAnimation: false, focused: false, margin: 'dense' }}
                        />
                      </div>
                    </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseMessageDialog} color="primary">
                      Cancel
                      </Button>
                    <Button onClick={handleSubmitContactForm} color="primary">
                      Send Message
                    </Button>
                  </DialogActions>
                  </Dialog>
              </div>

              <div className="divider"></div>

            </div>
          </div>

        </div>
      </div>

      <PostYourAd />

      </div >
    );
  }
};

SingleListingPage.propTypes = {
  state: PropTypes.object,
  toggleLightbox: PropTypes.func,
  next: PropTypes.func,
  previous: PropTypes.func,
  handleOpenMessageDialog: PropTypes.func,
  handleCloseMessageDialog: PropTypes.func,
  handleSubmitContactForm: PropTypes.func,
  handleChange: PropTypes.func,
  adViewLater: PropTypes.func,
  fullScreen: PropTypes.bool.isRequired,
};

export default WithMobileDialog()(SingleListingPage);