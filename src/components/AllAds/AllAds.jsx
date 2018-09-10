import React from 'react';
import PropTypes from 'prop-types';
// import itemLogo from '../../assets/img/listing-image.jpg';
import { Link } from "react-router-dom";
import { API_URL } from '../../constants/constants';
// import DeleteIcon from '@material-ui/icons/Delete';
import SaveToViewLater from '../../components/Common/SaveToViewLater';
import RemoveSaved from '../../components/Common/RemoveSaved';
import EditIcon from '@material-ui/icons/Edit';
import DeleteAd from '../Common/DeleteAd';
import ReactPaginate from 'react-paginate';

const AllAds = (props) => {
  const {
    allAds, filterCategory, title, userId, removeSaved,
    totalAdsCount, onPageChange, pageCount
  } = props;
  const pageTitle = (title && title.length > 0) ? title : `Displaying ${filterCategory ? filterCategory : `All`} ads`;
  const adsListings = allAds.slice(0, 50).map((ad, index) => {
    let owner = false;
    if (userId && userId == ad.uploader._id) {
      owner = true;
    }
    return (
      <div key={index} className="all-listings-single-listing border">
        <div className="row mr-0 ml-0">
          <div className="col-12 col-sm-3 single-listing-img-container">
            <Link to={`/item/${ad._id}`}><img className="img-fluid" src={`${API_URL}image/${ad.images[0]}`} alt={ad.title} /></Link>
          </div>
          <div className="col-12 col-sm-9 single-listing-description-container">
            <div className="item-title">
              <h3><Link to={`/item/${ad._id}`}>{ad.title}</Link></h3>
              <p>
                Category: <Link to={`/category/${ad.category}`}>{ad.category}</Link>
              </p>
              <div className="row bottom">
                <div className="col-6">
                  <span className="price">Rs. {ad.price}</span>
                </div>
                <div className="col-6 text-right">
                  {/* <a href="javascript:void(0)" title="Save to view later"><WatchLaterIcon /></a> */}
                  {removeSaved && <RemoveSaved adId={ad._id} />}
                  <SaveToViewLater adId={ad._id} />
                  {owner && <Link title="Edit" to={`/my-account/ads/edit/${ad._id}`} ><EditIcon /></Link>}
                  {owner && <DeleteAd adId={ad._id} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  })

  return (
    <div className="block all-ads">
      <h2 className="mb-0">{pageTitle}</h2>
      <span className="text-muted">We found {totalAdsCount ? totalAdsCount : allAds.length} items</span>
      <div className="all-listings">
        {adsListings}

        { totalAdsCount &&
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="javascript:void(0)" className="page-link" >...</a>}
            breakClassName={"break-me"}
            // pageCount={pageCount}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={onPageChange}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            // subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
          />
        </div>
        }
      </div>
    </div>
  );
};

AllAds.defaultProps = {
  removeSaved: false,
  pageCount: 1,
  onPageChange: function () { },
}

AllAds.propTypes = {
  allAds: PropTypes.array.isRequired,
  title: PropTypes.string,
  filterCategory: PropTypes.string,
  userId: PropTypes.string,
  removeSaved: PropTypes.bool,
  totalAdsCount: PropTypes.number,
  onPageChange: PropTypes.func,
  pageCount: PropTypes.number
}
export default AllAds;