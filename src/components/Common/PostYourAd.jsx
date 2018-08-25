import React from 'react';
import {Link} from 'react-router-dom';
const PostYourAd = () => {
  return (
    <div className="text-center mt-5">
      <h3>Do you have something to sell?</h3>
      <p>Post your ad FOR FREE on OLX</p>
      <Link to="/post-your-ad" className="btn btn-custom-orange">Post an Ad</Link>
    </div>
  );
};

export default PostYourAd;
