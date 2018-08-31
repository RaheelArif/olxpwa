import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adActions from '../../actions/AdActions';
import * as resetActions from '../../actions/ResetActions';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Breadcrumb from '../Common/Breadcrumb';
import uf from '../../constants/UtilityFunctions';
import { isEmpty, isNumeric } from 'validator';
import { API_URL, MAX_PRODUCT_PRICE } from '../../constants/constants';

const combinedActions = {
  ...adActions,
  ...resetActions
}

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    // marginBottom: theme.spacing.unit,
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
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  size: {
    width: 60,
    height: 60,
  },
  sizeIcon: {
    fontSize: 20,
  },
  uploadButton: {
    margin: theme.spacing.unit,
  },
  uploadInput: {
    display: 'none',
  },
});

const resetAd = () => {
  return {
    adTitle: '',
    category: '',
    model: '',
    condition: '',
    price: '',
    adDescription: '',
    images: {},
    sellerName: '',
    sellerPhoneNumber: '',
    itemCity: ''
  }
};

const resetErrors = () => {
  return {
    adTitle: '',
    category: '',
    model: '',
    condition: '',
    price: '',
    adDescription: '',
    images: '',
    sellerName: '',
    sellerPhoneNumber: '',
    itemCity: ''
  }
};

// const PostAdForm = (props) => {
class PostAdForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ad: props.ad,
      errors: resetErrors(),
      validateOnChange: false,
      disableSubmitButton: false,
      resetForm: false,
    };
    this.ad;
    this.props.actions.startingForm();
  }

  componentDidUpdate() {
    if(this.state.resetForm) {
      this.props.actions.startingForm();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if(nextProps.resetForm && nextProps.resetForm === true) {
      return {ad: resetAd(), resetForm: true}
    }
    return null;
  }

  handleChange = (e) => {
    let ad = this.state.ad;
    ad[e.target.name] = e.target.value;
    this.setState({ ad });

    if (this.state.validateOnChange) {
      this.validateForm();
    }
  };
/*
  handleCheckbox = (event, checked) => {
    let user = this.state.user;
    user.agree = checked;
    this.setState({ user });
  };
*/
  handleSelect = (e) => {
    let ad = this.state.ad;
    ad[e.target.name] = e.target.value;
    this.setState({ ad });

    if (this.state.validateOnChange) {
      this.validateForm();
    }
  };

  handleSubmit = () => {
    this.setState({ disableSubmitButton: true });
    if (!this.validateForm()) {
      this.setState({ validateOnChange: true });
      return;
    }

    // getting form data into a variable
    let ad = this.state.ad;
    let fd = new FormData(this.form);

    if(ad.oldImages) {
      // fd.append('oldImages', ad.oldImages);
      ad.oldImages.map((image, index) => {
        if(image) {
          fd.append(`old_image_${index}`, image);
        } else {
          fd.append(`old_image_${index}`, null);
        }
      });
    }
    /*
      if this is an update of the lisitng then it will have the listing._id in it.
      send this id to the server so that we can properly identify the listing for
      updating.
    */
    if (ad._id) {
      fd.append('_id', ad._id);
    }
    this.props.serverAction(fd);
  }

  validateForm = () => {
    // return true;
    let { ad } = this.state;
    let errors = resetErrors();
    let valid = true;

    if (isEmpty(ad.adTitle)) {
      errors.adTitle = "Please provide an ad title";
      valid = false;
    } else if (ad.adTitle.length < 3) {
      errors.adTitle = "Please provide a valid ad title";
      valid = false;
    } else if (ad.adTitle.length > 50) {
      errors.adTitle = "Title is too long";
      valid = false;
    }

    if (isEmpty(ad.category)) {
      errors.category = "Please select a category";
      valid = false;
    }

    if (isEmpty(ad.model)) {
      errors.model = "Please provide a model";
      valid = false;
    } else if (ad.model.length > 50) {
      errors.model = "Model is too long, max characters allowed is 50";
      valid = false;
    }

    if (isEmpty(ad.condition)) {
      errors.condition = "Please select a condition of your item";
      valid = false;
    }

    if (isEmpty(ad.price)) {
      errors.price = "Please enter price of the item";
      valid = false;
    } else if (!isNumeric(ad.price)) {
      errors.price = "price should be in numbers";
      valid = false;
    } else if (ad.price > MAX_PRODUCT_PRICE) {
      errors.price = `We don't deal with products haveing prices higher than ${MAX_PRODUCT_PRICE}`;
      valid = false;
    }

    let maxDescriptionChars = 1200;
    if (isEmpty(ad.adDescription)) {
      errors.adDescription = "Please provide ad description";
      valid = false;
    } else if (ad.adDescription.length < 50) {
      errors.adDescription = "Ad description is not enough, please provide detailed description";
      valid = false;
    } else if (ad.adDescription.length > maxDescriptionChars) {
      errors.adDescription = `Ad description is too long, please provide breif description within the ${maxDescriptionChars} characters`;
      valid = false;
    } else if(!uf.isValidInput(ad.adDescription)){
      errors.adDescription = `Invalid description, please provide valid description`;
      valid = false;
    }

    // debugger;
    if (Object.keys(ad.images).length < 1) {
      errors.images = "Please upload atleast one image of your item";
      valid = false;
    }

    if (isEmpty(ad.sellerName)) {
      errors.sellerName = "Please provide seller's name is required";
      valid = false;
    } else if (ad.sellerName.length < 3 || ad.sellerName.length > 50) {
      errors.sellerName = "Please provide a valid seller name";
      valid = false;
    }

    if (isEmpty(ad.itemCity)) {
      errors.itemCity = "Please provide the city in which item to be sold";
      valid = false;
    } else if (ad.itemCity.length < 3) {
      errors.sellerName = "Please provide a valid city name in which item to be sold";
      valid = false;
    }

    if (isEmpty(ad.sellerPhoneNumber)) {
      errors.sellerPhoneNumber = "Please provide seller's phone number";
      valid = false;
    } else if (!isNumeric(ad.sellerPhoneNumber)) {
      errors.sellerPhoneNumber = "Please provide valid phone number";
      valid = false;
    } else if (ad.sellerPhoneNumber.length < 10 || ad.sellerPhoneNumber.length > 15) {
      errors.sellerPhoneNumber = "Please provide valid phone number";
      valid = false;
    }

    this.setState({ errors });
    if (valid) {
      this.setState({ disableSubmitButton: false })
    } else {
      this.setState({ disableSubmitButton: true })
    }
    return valid;
  };

  handleFiles = (e) => {
    let ad = this.state.ad;
    if (e.target.files[0]) {
      ad.images[e.target.name] = e.target.files[0];
    } else {
      delete (ad.images[e.target.name]);
    }
    this.setState({ ad });

    if (this.state.validateOnChange) {
      this.validateForm();
    }
  }

  deleteFile = (fileIndex) => {
    let ad = this.state.ad;
    delete (ad.images[`image-${fileIndex}`]);
    // this.deleteOldFile(fileIndex-1);
    if(ad.oldImages) {
      delete ad.oldImages[`${fileIndex-1}`];
    }
    this.setState({ ad });
    if (this.state.validateOnChange) {
      this.validateForm();
    }
  }

  // const { handleChange, state, classes, handleSelect, handleSubmit } = props;
  // const { ad, errors, isError } = state;
  categoriesList = uf.getCategoriesDropdownList();

  render() {
    // const { handleChange, handleSelect, handleSubmit } = this;
    const { classes } = this.props;
    const { ad, errors } = this.state;
    const breadcrumbs = [
      {
        link: '/my-account',
        text: 'My Account'
      },
      {
        text: ad._id ? 'Edit Ad' : 'Post Your Ad'
      }
    ];
    const arr = [1, 2, 3, 4];
    const uploadImageButtons = arr.map((element, index) => {
      return (
        <div key={index} className="form-group">
          <input
            accept="image/*"
            className={classes.uploadInput}
            id={`item-image-${element}`}
            multiple={false}
            type="file"
            name={`image-${element}`}
            onChange={this.handleFiles}
          />
          <label htmlFor={`item-image-${element}`}>
            <Button variant="contained" component="span" className={classes.button}>
              Image {element}
            </Button>
          </label>
          {(this.state.ad && this.state.ad.images[`image-${element}`]) ? this.state.ad.images[`image-${element}`].name : ""}
          {(this.state.ad && this.state.ad.images[`image-${element}`]) ? <span onClick={() => this.deleteFile(element)} className="close">x</span> : ""}
        </div>
      )
    });

    return (
      <div className="container">
        <Breadcrumb
          breadcrumbs={breadcrumbs}
        />
        {/* <section className="registration-form"> */}
        <section className="page-container">
          <h2>{this.props.pageTitle}</h2>
          <form ref={(form) => this.form = form}>
            <div className="form-group"></div>
            <div className="form-group">
              <TextField
                label="Ad Title"
                name="adTitle"
                type="text"
                helperText={errors.adTitle}
                fullWidth={true}
                onChange={this.handleChange}
                value={ad.adTitle}
                error={errors.adTitle ? true : false}
                required={true}
                InputLabelProps={{ disableAnimation: false, focused: false, margin: 'dense' }}
              />
            </div>

            <div className="form-group">
              <FormControl className={classes.formControl} error={errors.category ? true : false} fullWidth={true} required={true}>
                <InputLabel htmlFor="ad-category">Category</InputLabel>
                <Select
                  value={ad.category}
                  onChange={this.handleSelect}
                  // autoWidth={true}
                  name="category"
                  renderValue={value => value}
                  input={<Input id="ad-category" />}
                >
                  {this.categoriesList}
                </Select>
                {<FormHelperText>{errors.category}</FormHelperText>}
              </FormControl>
            </div>

            <div className="form-group">
              <TextField
                label="Model"
                name="model"
                type="text"
                helperText={errors.model}
                fullWidth={true}
                onChange={this.handleChange}
                value={ad.model}
                error={errors.model ? true : false}
                required={true}
              />
            </div>

            <div className="form-group">
              <FormControl className={classes.formControl} error={errors.condition ? true : false} fullWidth={true} required={true}>
                <InputLabel htmlFor="ad-item-condition">Condition</InputLabel>
                <Select
                  value={ad.condition}
                  onChange={this.handleSelect}
                  // autoWidth={true}
                  name="condition"
                  renderValue={value => value}
                  input={<Input id="ad-item-condition" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="new">new</MenuItem>
                  <MenuItem value="used">used</MenuItem>
                </Select>
                {<FormHelperText>{errors.condition}</FormHelperText>}
              </FormControl>
            </div>

            <div className="form-group">
              <TextField
                label="Price"
                name="price"
                type="text"
                helperText={errors.price}
                fullWidth={true}
                onChange={this.handleChange}
                value={ad.price}
                error={errors.price ? true : false}
                required={true}
              />
            </div>

            <div className="form-group">
              <TextField
                label="Description"
                name="adDescription"
                multiline={true}
                rows={7}
                helperText={errors.adDescription}
                fullWidth={true}
                onChange={this.handleChange}
                value={ad.adDescription}
                error={errors.adDescription ? true : false}
                required={true}
              />
            </div>

            {
              this.state.ad.oldImages &&
              <div className="form-group">
                <div className="ad-images">
                  {this.state.ad.oldImages.map((image, index) => {
                    return (
                      <div className="ad-image" key={index}>
                        <span className="close" onClick={() => this.deleteFile(index+1)}><i className="fa fa-times"></i></span>
                        <img className="img-fluid" src={`${API_URL}image/${image}`} />
                      </div>
                    )
                  })}
                </div>
              </div>
            }
            {uploadImageButtons}
            <span className="text-danger">{errors.images}</span>

            <div className="divider"></div>

            <div className="form-group">
              <h4>Seller Information</h4>
            </div>

            <div className="form-group">
              <TextField
                label="Seller Name"
                name="sellerName"
                type="text"
                helperText={errors.sellerName}
                fullWidth={true}
                onChange={this.handleChange}
                value={ad.sellerName}
                error={errors.sellerName ? true : false}
                required={true}
              />
            </div>

            <div className="form-group">
              <TextField
                label="Item to be sold in which city?"
                name="itemCity"
                type="text"
                helperText={errors.itemCity}
                fullWidth={true}
                onChange={this.handleChange}
                value={ad.itemCity}
                error={errors.itemCity ? true : false}
                required={true}
              />
            </div>

            <div className="form-group">
              <TextField
                label="Seller phone number"
                name="sellerPhoneNumber"
                type="text"
                helperText={errors.sellerPhoneNumber}
                fullWidth={true}
                onChange={this.handleChange}
                value={ad.sellerPhoneNumber}
                error={errors.sellerPhoneNumber ? true : false}
                required={true}
              />
            </div>

            <div className="form-group">
              <span className="text-muted">
                <small>
                  By clicking {'Submit'} you confirm that you have carefully read and understood all the facts, statements and conditions stated in the <Link to="/terms-of-use">Terms of Use</Link> &amp; Posting Rules of our website to which you unconditionally agree and accept as true and correct and constituting a binding agreement between us.
                </small>
              </span>
            </div>

            <div className="form-group">
              <Button
                variant="contained" color="primary" className={classes.button}
                onClick={this.handleSubmit}
                disabled={this.state.disableSubmitButton}
              >
                {this.props.buttonLabel}
                {/* <Icon className={classes.rightIcon}>send</Icon> */}
              </Button>
            </div>
          </form>

        </section>
      </div>
    );
  }
}

PostAdForm.defaultProps = {
  ad: resetAd(),
  pageTitle: 'Post Your Ad',
  buttonLabel: 'Submit Your Ad'
};

PostAdForm.propTypes = {
  ad: PropTypes.object,
  serverAction: PropTypes.func.isRequired,
  pageTitle: PropTypes.string,
  buttonLabel: PropTypes.string,
  classes: PropTypes.object,
  actions: PropTypes.object
};

function mapStateToProps(state) { //eslint-disable-line no-unused-vars
  return {
    // state: state
    resetForm: state.resetForm
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(combinedActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostAdForm));