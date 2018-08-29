import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import FeaturedAds from '../FeaturedAds/FeaturedAdsContainer';
import AllAds from '../AllAds/AllAdsContainer';
import PostYourAd from '../Common/PostYourAd';
import SearchForm from '../Common/SearchForm';
import uf from '../../constants/UtilityFunctions';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
const categoriesList = uf.getCategoriesDropdownList();

const Homepage = ({ state, handleCategoryChange, categoryCounts }) => {
  const categories = uf.getCategories();
  const {category:filterCategory} = state;
  const categoryList = categories.map((category, index) => {
    return (
      <li key={index}><Link to={`/category/${category}`}>{category}</Link> <span className="text-muted">({categoryCounts[category] ? categoryCounts[category] : 0})</span></li>
    );
  });
  return (
    <div className="container">
      <div className="block ads-search-fields">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="ad-category">Browse Categories</InputLabel>
                <Select
                  value={state.category}
                  onChange={handleCategoryChange}
                  name="category"
                  renderValue={value => value}
                  input={<Input id="ad-category" />}
                >
                  {categoriesList}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>

      <div className="block ads-categories-block">
        <ul className="categories-list">
          {categoryList}
        </ul>
      </div>

      <div className="block">
        <div className="bread-crumb">
          <a href="#"><i className="fa fa-home"></i> Home</a> »
        {` Pakistan's Classifieds`}
        </div>
      </div>

      {/* <FeaturedAds /> */}
      <AllAds filterCategory={filterCategory} />
      <PostYourAd />
    </div>
  );
};
Homepage.defaultProps = {
  // someProp: 'Some Value',
}

Homepage.propTypes = {
  categoryCounts: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
}

export default Homepage;