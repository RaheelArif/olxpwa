import React from 'react';
import {Link} from 'react-router-dom';
import listingImage1 from '../../assets/img/listing-image.jpg';
import listingImage2 from '../../assets/img/listing-image-2.jpg';
import listingImage3 from '../../assets/img/listing-image-3.jpg';
import listingImage4 from '../../assets/img/listing-image-4.jpg';
const listingImages = [
  listingImage1, listingImage2, listingImage3, listingImage4,
  listingImage1, listingImage2, listingImage3, listingImage4,
  listingImage1, listingImage2, listingImage3, listingImage4
];
const title = "5 Marla House near Butt karahi near Green Lagoon";
const price = "70,000,000";
const description = "Some nice description to display"
const FeaturedAds = (props) => { //eslint-disable-line no-unused-vars
  const listings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const list = listings.map((listing, index) => {
    return (
      <div key={index} className="col-12 col-md-6 col-lg-4">
        <div className="featured-listing-single">
          <div className="featured-listing-image">
            <img className="img-fluid" src={listingImages[index]} alt={`featured listing`} />
          </div>
          <div className="featured-listing-title">
            <h4><Link to="/item">{`${title.substring(0, 25)}...`}</Link></h4>
          </div>
          <div className="featured-listing-description">
            <span className="text-muted">{`${description.substring(0, 25)}...`}</span>
          </div>
          <div className="featured-listing-price">
            <span>{`Rs. ${price}`}</span>
          </div>
          <div className="featured-listing-watch-later">
            <a href="#"><i className="fa fa-clock-o"></i> Save to view later</a>
          </div>
        </div>
      </div>
    );
  })
  return (
      <div className="block featured-listings">
        <h3 className="mb-0">Featured Ads</h3>
        <Link to="/listings" className="">View All</Link>
        <div className="divider"></div>
        <div className="row">
          {list}
        </div>
      </div>
  );
};
export default FeaturedAds;
