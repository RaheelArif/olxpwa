import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Checkbox from '@material-ui/core/Checkbox';

// import classNames from 'classnames';

// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';

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
    color: red[600],
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
});

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   formControl: {
//     margin: theme.spacing.unit,
//   },
// });

const TermsOfUseLabel = (
  <span>By registering on OLX, you accept our OLX.com.pk <Link to="/terms-of-use">Terms of Use</Link>.</span>
);

const RegisterForm = (props) => {
  const { handleChange, state, classes, handleCheckbox, handleSubmit } = props;
  const { user, errors, disableSubmitButton } = state;
  return (
    <div className="container">
      <section className="registration-form">
        <h2>Register Page</h2>
        <div className="form-group"></div>
        <div className="form-group">
          <TextField
            label="Your Email"
            name="email"
            type="email"
            helperText={errors.email}
            fullWidth={true}
            onChange={handleChange}
            value={user.email}
            error={errors.email ? true : false}
            required={true}
            InputLabelProps={{ disableAnimation: false, focused: false, margin: 'dense' }}
          />
        </div>

        <div className="form-group">
          <TextField
            label="Password"
            name="password"
            type="password"
            helperText={errors.password}
            fullWidth={true}
            onChange={handleChange}
            value={user.password}
            error={errors.password ? true: false}
            required={true}
          />
        </div>

        <div className="form-group">
          <TextField
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            helperText={errors.repeatPassword}
            fullWidth={true}
            onChange={handleChange}
            value={user.repeatPassword}
            error={errors.repeatPassword ? true: false}
            required={true}
          />
        </div>

        <div className="form-group">
          <FormControlLabel
            control={
              <Checkbox
                checked={user.agree}
                onChange={handleCheckbox}
                value="agree"
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label={TermsOfUseLabel}
          />
          {!user.agree ? <div className="text-danger">{errors.agreeText}</div> : <div>&nbsp;</div>}
        </div>

        <div className="form-group">
          <Button
            variant="contained" color="primary"
            className={classes.button}
            onClick={handleSubmit}
            disabled={disableSubmitButton}
          >
            Register
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </div>

        <div className="form-group">
          <p className="mb-0 text-success">Already Registeed? <Link to="login">Login Here</Link></p>
        </div>
      </section>
    </div>
  );
};
RegisterForm.propTypes = {
  handleChange: PropTypes.func,
  state: PropTypes.object,
  classes: PropTypes.object,
  handleCheckbox: PropTypes.func,
  handleSubmit: PropTypes.func,
}

export default withStyles(styles)(RegisterForm);
